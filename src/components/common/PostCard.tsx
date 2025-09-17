import Avatar from './Avatar'
import Markdown from './Markdown'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import UserLevel from './UserLevel'
import { useNavigate } from 'react-router'
import { useRef, useState, useEffect } from 'react'

interface PostCardProps {
  isDetail?: boolean
}

function PostCard({ isDetail = false }: PostCardProps) {
  const navigate = useNavigate()

  const [isEllipsed, setIEllipsed] = useState(false)
  const commentRef = useRef<HTMLParagraphElement>(null)
  const originalCommentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!originalCommentRef.current || !commentRef.current) return
    const { clientHeight: originalHeight } = originalCommentRef.current
    const { clientHeight: commentHeight } = commentRef.current
    setIEllipsed(originalHeight !== commentHeight)
  }, [])

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
            <div className="line-clamp-1">
              {isEllipsed && <button className="float-right">더보기</button>}
              <p ref={commentRef}>
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
              </p>
            </div>
            <div className="overflow-hidden h-0">
              <p ref={originalCommentRef}>test</p>
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
              <p className="text-text-secondary text-sm mb-4">
                2024년 1월 15일 오후 06:15
              </p>
              <div className="flex gap-6 py-3 border-y border-background-border">
                <div className="flex gap-2">
                  <span className="font-bold text-text-primary">6</span>
                  <span className="text-text-secondary">댓글</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-text-primary">28</span>
                  <span className="text-text-secondary">마음에 들어요</span>
                </div>
              </div>
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
