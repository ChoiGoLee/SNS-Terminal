import { Client } from '@notionhq/client'
import process from 'process'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID

// GitHub 이벤트 데이터 파싱
function getGitHubEventData() {
  const eventName = process.env.GITHUB_EVENT_NAME

  console.log('Event Name:', eventName)

  // GitHub Actions 컨텍스트에서 이벤트 데이터 가져오기
  let eventData = {}

  if (process.env.GITHUB_EVENT_NAME === 'issues') {
    eventData = {
      type: 'Issue',
      number: process.env.GITHUB_EVENT_ISSUE_NUMBER || 'N/A',
      title: process.env.GITHUB_EVENT_ISSUE_TITLE || 'No Title',
      body: process.env.GITHUB_EVENT_ISSUE_BODY || '',
      state: process.env.GITHUB_EVENT_ISSUE_STATE || 'open',
      author: process.env.GITHUB_EVENT_ISSUE_USER_LOGIN || 'Unknown',
      url: process.env.GITHUB_EVENT_ISSUE_HTML_URL || '',
      labels: process.env.GITHUB_EVENT_ISSUE_LABELS || '',
      created_at:
        process.env.GITHUB_EVENT_ISSUE_CREATED_AT || new Date().toISOString(),
    }
  } else if (process.env.GITHUB_EVENT_NAME === 'pull_request') {
    eventData = {
      type: 'Pull Request',
      number: process.env.GITHUB_EVENT_PR_NUMBER || 'N/A',
      title: process.env.GITHUB_EVENT_PR_TITLE || 'No Title',
      body: process.env.GITHUB_EVENT_PR_BODY || '',
      state: process.env.GITHUB_EVENT_PR_MERGED
        ? 'merged'
        : process.env.GITHUB_EVENT_PR_STATE || 'open',
      author: process.env.GITHUB_EVENT_PR_USER_LOGIN || 'Unknown',
      url: process.env.GITHUB_EVENT_PR_HTML_URL || '',
      labels: process.env.GITHUB_EVENT_PR_LABELS || '',
      created_at:
        process.env.GITHUB_EVENT_PR_CREATED_AT || new Date().toISOString(),
    }
  } else {
    // 수동 실행이나 기타 경우
    eventData = {
      type: 'Test',
      number: 0,
      title: 'Manual Test Sync',
      body: 'This is a test sync from GitHub Actions',
      state: 'open',
      author: 'GitHub Actions',
      url: `https://github.com/${process.env.GITHUB_REPOSITORY}`,
      labels: '',
      created_at: new Date().toISOString(),
    }
  }

  return eventData
}

// 중복 확인 함수
async function findExistingPage(type, number) {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Type',
            select: {
              equals: type,
            },
          },
          {
            property: 'Number',
            number: {
              equals: parseInt(number),
            },
          },
        ],
      },
    })

    return response.results.length > 0 ? response.results[0] : null
  } catch (error) {
    console.log('중복 확인 중 에러 (무시):', error.message)
    return null
  }
}

// Labels 문자열을 배열로 파싱하는 함수
function parseLabels(labelsString) {
  if (!labelsString || labelsString.trim() === '') {
    return []
  }
  // 쉼표로 구분된 문자열을 배열로 변환하고 공백 제거
  return labelsString
    .split(',')
    .map((label) => label.trim())
    .filter((label) => label.length > 0)
}

// Status 값을 적절히 매핑하는 함수
function mapStatus(state) {
  const statusMap = {
    open: 'Open',
    closed: 'Closed',
    merged: 'Merged',
    draft: 'Draft',
  }
  return statusMap[state.toLowerCase()] || 'Open'
}

// Notion 페이지 생성/업데이트
async function createOrUpdateNotionPage(eventData, dbProperties) {
  try {
    // 중복 확인
    const existingPage = await findExistingPage(
      eventData.type,
      eventData.number
    )

    // Labels 처리
    const labelsArray = parseLabels(eventData.labels)

    // 기본 속성들 - 데이터베이스 스키마에 따라 동적으로 구성
    const pageProperties = {}

    // Name/Title 속성 (필수)
    if (dbProperties['Name']) {
      pageProperties['Name'] = {
        title: [
          {
            text: {
              content: `[${eventData.type} #${eventData.number}] ${eventData.title}`,
            },
          },
        ],
      }
    } else if (dbProperties['Title']) {
      pageProperties['Title'] = {
        title: [
          {
            text: {
              content: `[${eventData.type} #${eventData.number}] ${eventData.title}`,
            },
          },
        ],
      }
    }

    // Type 속성
    if (dbProperties['Type'] && dbProperties['Type'].type === 'select') {
      pageProperties['Type'] = {
        select: {
          name: eventData.type,
        },
      }
    }

    // Status 속성 - status 타입인지 select 타입인지 확인
    if (dbProperties['Status']) {
      const statusValue = mapStatus(eventData.state)
      if (dbProperties['Status'].type === 'status') {
        pageProperties['Status'] = {
          status: {
            name: statusValue,
          },
        }
      } else if (dbProperties['Status'].type === 'select') {
        pageProperties['Status'] = {
          select: {
            name: statusValue,
          },
        }
      }
    }

    // Number 속성
    if (dbProperties['Number'] && dbProperties['Number'].type === 'number') {
      pageProperties['Number'] = {
        number: parseInt(eventData.number) || 0,
      }
    }

    // Author 속성
    if (dbProperties['Author'] && dbProperties['Author'].type === 'rich_text') {
      pageProperties['Author'] = {
        rich_text: [
          {
            text: {
              content: eventData.author,
            },
          },
        ],
      }
    }

    // Created 속성
    if (dbProperties['Created'] && dbProperties['Created'].type === 'date') {
      pageProperties['Created'] = {
        date: {
          start: eventData.created_at.split('T')[0],
        },
      }
    }

    // URL 속성 - rich_text 타입으로 처리
    if (dbProperties['URL'] && dbProperties['URL'].type === 'rich_text') {
      pageProperties['URL'] = {
        rich_text: [
          {
            text: {
              content: eventData.url,
              link: {
                url: eventData.url,
              },
            },
          },
        ],
      }
    } else if (dbProperties['URL'] && dbProperties['URL'].type === 'url') {
      pageProperties['URL'] = {
        url: eventData.url,
      }
    }

    // Body 속성 (있는 경우에만)
    if (
      dbProperties['Body'] &&
      dbProperties['Body'].type === 'rich_text' &&
      eventData.body
    ) {
      // Body 내용이 너무 길면 잘라내기 (Notion API 제한)
      const bodyContent =
        eventData.body.length > 2000
          ? eventData.body.substring(0, 2000) + '...'
          : eventData.body

      pageProperties['Body'] = {
        rich_text: [
          {
            text: {
              content: bodyContent,
            },
          },
        ],
      }
    }

    // Labels 속성 (multi_select 타입인 경우)
    if (
      dbProperties['Labels'] &&
      dbProperties['Labels'].type === 'multi_select' &&
      labelsArray.length > 0
    ) {
      pageProperties['Labels'] = {
        multi_select: labelsArray.map((label) => ({ name: label })),
      }
    }

    console.log('전송할 속성들:', Object.keys(pageProperties))
    console.log('속성 상세:', JSON.stringify(pageProperties, null, 2))

    if (existingPage) {
      // 기존 페이지 업데이트
      console.log(`기존 ${eventData.type} #${eventData.number} 업데이트 중...`)
      const response = await notion.pages.update({
        page_id: existingPage.id,
        properties: pageProperties,
      })
      console.log('업데이트 완료:', response.id)
      return response
    } else {
      // 새 페이지 생성
      console.log(`새 ${eventData.type} #${eventData.number} 생성 중...`)
      const response = await notion.pages.create({
        parent: {
          database_id: DATABASE_ID,
        },
        properties: pageProperties,
      })
      console.log('생성 완료:', response.id)
      return response
    }
  } catch (error) {
    console.error('Notion 페이지 생성/업데이트 실패:', error)
    console.error('상세 에러:', error.message)
    if (error.code) {
      console.error('에러 코드:', error.code)
    }
    // API 응답 본문이 있으면 출력
    if (error.body) {
      console.error('에러 응답:', JSON.stringify(error.body, null, 2))
    }
    throw error
  }
}

// 데이터베이스 스키마 확인 함수
async function debugDatabaseSchema() {
  try {
    const response = await notion.databases.retrieve({
      database_id: DATABASE_ID,
    })

    console.log('=== 실제 데이터베이스 속성들 ===')
    for (const [key, value] of Object.entries(response.properties)) {
      console.log(`"${key}" -> ${value.type}`)
      // 선택 옵션이 있는 경우 출력
      if (value.type === 'select' && value.select?.options) {
        console.log(
          `  옵션: ${value.select.options.map((opt) => opt.name).join(', ')}`
        )
      }
      if (value.type === 'multi_select' && value.multi_select?.options) {
        console.log(
          `  옵션: ${value.multi_select.options
            .map((opt) => opt.name)
            .join(', ')}`
        )
      }
      if (value.type === 'status' && value.status?.options) {
        console.log(
          `  옵션: ${value.status.options.map((opt) => opt.name).join(', ')}`
        )
      }
    }
    return response.properties
  } catch (error) {
    console.error('스키마 확인 실패:', error)
    return null
  }
}

// 메인 함수
async function main() {
  try {
    console.log('=== GitHub to Notion 동기화 시작 ===')

    // 환경변수 확인
    console.log('Repository:', process.env.GITHUB_REPOSITORY)
    console.log('Event Name:', process.env.GITHUB_EVENT_NAME)
    console.log('Database ID:', DATABASE_ID ? 'SET' : 'NOT SET')
    console.log('API Key:', process.env.NOTION_API_KEY ? 'SET' : 'NOT SET')

    // 데이터베이스 스키마 확인
    const dbProperties = await debugDatabaseSchema()
    if (!dbProperties) {
      throw new Error('데이터베이스 스키마를 가져올 수 없습니다.')
    }

    // GitHub 이벤트 데이터 가져오기
    const eventData = getGitHubEventData()
    console.log('처리할 데이터:', {
      type: eventData.type,
      number: eventData.number,
      title: eventData.title,
      author: eventData.author,
      state: eventData.state,
      labels: eventData.labels,
    })

    // Notion에 동기화 (스키마 정보 전달)
    const result = await createOrUpdateNotionPage(eventData, dbProperties)

    console.log('=== 동기화 완료 ===')
    console.log('Notion 페이지 ID:', result.id)
  } catch (error) {
    console.error('동기화 실패:', error.message)
    if (error.code) {
      console.error('에러 코드:', error.code)
    }
    process.exit(1)
  }
}

main()
