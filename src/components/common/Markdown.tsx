import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from '../../assets/css/markdown.module.css'
// import 'github-markdown-css/github-markdown.css'

interface MarkdownProps {
  content: string
}

interface CodeComponentProps {
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

function Markdown({ content }: MarkdownProps): React.JSX.Element {
  //   const markdownContent = `
  // # 제목

  // 일반 텍스트입니다.

  // \`\`\`javascript
  // console.log('Hello, world!');
  // const greeting = 'React Markdown';
  // console.log(greeting);
  // \`\`\`

  // \`\`\`python
  // def hello():
  //   print("Hello from Python!")

  // hello()
  // \`\`\`
  //   `

  return (
    <div className={styles['markdown-body']}>
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }: CodeComponentProps) {
            const match = /language-(\w+)/.exec(className || '')

            return !inline && match ? (
              <div className="code-wrapper">
                <div className={styles['language-wrapper']}>
                  <p
                    className={`${styles['language-label']} ${
                      styles[`lang-${match[1]}`] || styles['lang-default']
                    }`}
                  >
                    {match[1]}
                  </p>
                </div>
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown
