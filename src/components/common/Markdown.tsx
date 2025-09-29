// Markdown.tsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownProps {
  content: string
}

// 언어별 색상 매핑
const LANGUAGE_COLORS: Record<string, string> = {
  javascript: 'bg-yellow-500/20 text-yellow-400',
  typescript: 'bg-blue-500/20 text-blue-400',
  python: 'bg-green-500/20 text-green-400',
  java: 'bg-red-500/20 text-red-400',
  css: 'bg-pink-500/20 text-pink-400',
  html: 'bg-orange-500/20 text-orange-400',
  jsx: 'bg-cyan-500/20 text-cyan-400',
  tsx: 'bg-indigo-500/20 text-indigo-400',
}

function Markdown({ content }: MarkdownProps): React.JSX.Element {
  return (
    <div>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold my-4 border-b-2 border-background-border pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold my-3 border-b border-background-border pb-1">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold my-2">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="my-2 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside my-2 space-y-1">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 my-2 italic text-text-secondary">
              {children}
            </blockquote>
          ),
          code: (props) => {
            const { children, className } = props
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            const isCodeBlock = Boolean(match && !className?.includes('inline'))

            if (isCodeBlock && language) {
              return (
                <div className="my-4 rounded-lg overflow-hidden border border-background-border">
                  {/* 언어 라벨 */}
                  <div className="border-b border-background-border bg-background-surface">
                    <span
                      className={`inline-block px-3 py-1.5 text-xs font-medium uppercase m-2 rounded ${
                        LANGUAGE_COLORS[language] ||
                        'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {language}
                    </span>
                  </div>

                  {/* 코드 블록 */}
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      background: 'rgb(30, 30, 30)',
                    }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              )
            }

            // 인라인 코드
            return (
              <code className="bg-background-surface px-1.5 py-0.5 rounded text-sm font-mono border border-background-border">
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
