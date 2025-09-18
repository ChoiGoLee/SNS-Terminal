import Avatar from './Avatar'
import Markdown from './Markdown'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import UserLevel from './UserLevel'
import { useNavigate } from 'react-router'
import { useState } from 'react'

interface PostCardProps {
  isDetail?: boolean
  comment: string
  onClick: () => void
}

function PostCard({ isDetail = false, comment, onClick }: PostCardProps) {
  const navigate = useNavigate()

  const [showMore, setShowMore] = useState(false)
  const isLong = comment.length > 100

  const displayText = showMore
    ? comment
    : comment.slice(0, 100) + (isLong ? '...' : '')

  //이벤트 버블링 방지
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <article
      onClick={() => navigate('/post-detail')}
      className={`bg-background border-background-border border-b p-4 hover:bg-background-surface/30 transition-colors relative ${
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
              <p>{displayText}</p>
              {isLong && (
                <button
                  onClick={(e) => {
                    setShowMore(!showMore)
                    handleClick(e)
                  }}
                >
                  {showMore ? '접기' : '더보기'}
                </button>
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
