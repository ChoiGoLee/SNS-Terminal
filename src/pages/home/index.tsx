import React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import PostCard from '../../components/common/PostCard'

function Home(): React.JSX.Element {
  const markdownContent = `
# 제목

 일반 텍스트입니다.

 \`\`\`javascript
console.log('Hello, world!');
 const greeting = 'React Markdown';
console.log(greeting);
\`\`\`

\`\`\`python
def hello():
  print("Hello from Python!")

hello()
 \`\`\`
  `

  return (
    <div className="flex min-h-screen">
      <div className="h-full">
        <SideBar isAuthenticated={true} activeItem="/" />
      </div>
      <div className="mx-auto border-x border-background-border border-r border-l">
        <Header title="홈" />
        <PostCard comment={markdownContent} onClick={() => {}} />
      </div>
    </div>
  )
}
export default Home
