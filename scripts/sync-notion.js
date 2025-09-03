import { Client } from '@notionhq/client'
import process from 'process'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID

// GitHub 이벤트 데이터 파싱
function getGitHubEventData() {
  const eventName = process.env.GITHUB_EVENT_NAME
  const eventPath = process.env.GITHUB_EVENT_PATH

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

// Notion 페이지 생성/업데이트
async function createOrUpdateNotionPage(eventData) {
  try {
    // 중복 확인
    const existingPage = await findExistingPage(
      eventData.type,
      eventData.number
    )

    const pageProperties = {
      Name: {
        title: [
          {
            text: {
              content: `[${eventData.type} #${eventData.number}] ${eventData.title}`,
            },
          },
        ],
      },
      Type: {
        select: {
          name: eventData.type,
        },
      },
      Status: {
        select: {
          name:
            eventData.state.charAt(0).toUpperCase() + eventData.state.slice(1),
        },
      },
      Number: {
        number: parseInt(eventData.number) || 0,
      },
      Author: {
        rich_text: [
          {
            text: {
              content: eventData.author,
            },
          },
        ],
      },
      Created: {
        date: {
          start: eventData.created_at.split('T')[0],
        },
      },
    }

    // URL 속성 추가 (값이 있을 때만)
    if (eventData.url) {
      pageProperties['URL'] = {
        url: eventData.url,
      }
    }

    // Body 속성 추가 (값이 있을 때만)
    if (eventData.body && eventData.body.length > 0) {
      pageProperties['Body'] = {
        rich_text: [
          {
            text: {
              content: eventData.body.substring(0, 2000), // Notion 제한으로 2000자까지
            },
          },
        ],
      }
    }

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
    throw error
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

    // GitHub 이벤트 데이터 가져오기
    const eventData = getGitHubEventData()
    console.log('처리할 데이터:', {
      type: eventData.type,
      number: eventData.number,
      title: eventData.title,
      author: eventData.author,
      state: eventData.state,
    })

    // Notion에 동기화
    const result = await createOrUpdateNotionPage(eventData)

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
