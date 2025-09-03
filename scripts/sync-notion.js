import { Client } from '@notionhq/client'
import process from 'process'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

async function main() {
  try {
    console.log('Notion 연결 테스트...')

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: '테스트 페이지 from GitHub Actions',
              },
            },
          ],
        },
      },
    })

    console.log('성공적으로 Notion에 페이지 생성:', response.id)
  } catch (error) {
    console.error('Notion 동기화 실패:', error)
    process.exit(1)
  }
}

main()
