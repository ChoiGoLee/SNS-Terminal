import Avatar from './Avatar'
import Markdown from './Markdown'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import UserLevel from './UserLevel'
import { useNavigate } from 'react-router'
import { useState, useRef, useEffect } from 'react'

interface PostCardProps {
  isDetail?: boolean
  content: string
  lineClamp?: number
}

function PostCard({ isDetail = false, content, lineClamp }: PostCardProps) {
  const navigate = useNavigate()

  const pRef = useRef<HTMLParagraphElement>(null)
  const [lineHeight, setLineHeight] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  const originalRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!pRef.current) {
        return
      }
      setLineHeight(parseFloat(getComputedStyle(pRef.current).lineHeight))
    })

    if (pRef.current) {
      observer.observe(pRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const maxHeight =
    lineHeight && lineClamp !== undefined ? lineHeight * lineClamp : undefined

  const isOverFlown = originalRef.current?scrollHeight && maxHeight && originalRef.current?.scrollHeight > maxHeight;


  const handleClick = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <article
      onClick={() => navigate('/post-detail')}
      className={`bg-background border-background-border border-b p-4 hover:bg-background-surface/30 transition-colors relative w-full ${
        !isDetail && 'cursor-pointer'
      }`}
    >
      <section className="flex space-x-3">
        <Avatar
          userImage="https://picsum.photos/200/300?random=1"
          userName="테스트"
          size="md"
        />
        <section className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-bold text-text-primary">고우리</span>
            <UserLevel level="mid" />
            <span className="text-text-secondary">·</span>
            <span className="text-text-secondary text-sm">3시간 전</span>
          </div>

          <div className="mb-3">
            <span className={`${isDetail ? 'flex' : 'hidden'}`}>
              기술스택(임시)
            </span>
            <div>
              <p className='h-0 overflow-hidden' ref={originalRef}>{content}</p>
              <p
                ref={pRef}
                className="overflow-hidden"
                style={{ maxHeight: !expanded ? maxHeight : undefined }}
              >
                {content}
              </p>
              {!isOverFlown ? null : !expanded ? (
                <button onClick={handleClick}>더보기</button>
              ) : (
                <button onClick={handleClick}>접기</button>
              )}
            </div>
            <Markdown
              content={`
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
    `}
            />
          </div>

          {isDetail && (
            <section>
              <p className="text-text-secondary text-sm mb-4 border-b py-4 border-background-border">
                2024년 1월 15일 오후 06:15
              </p>
            </section>
          )}

          <div
            className={`flex space-x-6 mt-3 ${isDetail && 'justify-around'}`}
          >
            <LikeButton
              likeCount={0}
              isLiked={false}
              onLike={() => console.log('좋아요')}
            />
            <CommentButton commentCount={30} postId={''} />
          </div>
        </section>
      </section>
    </article>
  )
}

export default PostCard
