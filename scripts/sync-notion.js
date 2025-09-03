// Notion 페이지 생성/업데이트 함수 수정
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
      // Status -> status (소문자)로 변경
      status: {
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

    // URL을 rich_text 타입으로 변경
    if (eventData.url) {
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
    }

    // Body 속성 제거 (존재하지 않으므로)

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

// 중복 확인 함수도 수정 (status 소문자로)
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
