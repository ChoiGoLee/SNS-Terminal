import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'

function Markdown(): React.JSX.Element {
  return (
    <>
      <ReactMarkdown>
        <SyntaxHighlighter>
          ```js console.log('Hello, world!'); ```
        </SyntaxHighlighter>
      </ReactMarkdown>
    </>
  )
}
export default Markdown
