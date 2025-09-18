import Avatar from './Avatar'
import Markdown from './Markdown'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import UserLevel from './UserLevel'
import { useNavigate } from 'react-router'
import { useEffect, useRef, useState } from 'react'

interface PostCardProps {
  /**홈/피드페이지 or 상세페이지 여부**/
  isDetail?: boolean
  /**게시글 텍스트 **/
  comment: string
  // 게시글 더보기 클릭 이벤트 핸들러 함수
  onClick: () => void
}

/**
 *
 * @param {boolean} isDetail - 홈/피드페이지 or 상세페이지 여부
 * @param {string} comment - 게시글 텍스트
 * @param {function} onClick - 게시글 더보기 클릭 이벤트 핸들러 함수
 * @returns
 */
function PostCard({ isDetail = false, onClick }: PostCardProps) {
  const maxHeight = 100

  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMoreBtn, setShowMoreBtn] = useState(false)
  const [showGradient, SetShowGradient] = useState(false)
  const commentRef = useRef<HTMLDivElement>(null)

  // 이벤트 버블링 방지
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick()
  }

  useEffect(() => {
    if (commentRef.current && commentRef.current.offsetHeight > maxHeight) {
      setShowMoreBtn(true)
      SetShowGradient(true)
    } else if (
      commentRef.current &&
      commentRef.current.scrollHeight < maxHeight
    ) {
      setShowMoreBtn(false)
      SetShowGradient(false)
    }
  }, [maxHeight])

  return (
    <article
      onClick={() => navigate('/post-detail')}
      className={`bg-background border-background-border w-full p-4 transition-colors relative ${
        isDetail ? 'border' : 'cursor-pointer border-b'
      }`}
    >
      <section className="flex space-x-3">
        <Avatar
          userImage="https://picsum.photos/200/300?random=1"
          userName="테스트"
          size="md"
        />
        <section className="flex-1">
          <ul className="flex items-center gap-1 mb-2">
            <li className="font-bold text-text-primary">고우리</li>
            <li>
              <UserLevel level="mid" />
            </li>
            <li className="text-text-secondary">·</li>
            <li className="text-text-secondary text-sm">3시간 전</li>
          </ul>
          <ul
            className={`${isDetail ? 'flex flex-wrap gap-1 mb-3' : 'hidden'}`}
          >
            <li className="px-2 py-1 bg-background-surface text-text-secondary text-xs rounded border border-background-border">
              기술스택
            </li>
          </ul>

          <div
            className={`${
              !isDetail &&
              (isExpanded ? 'max-h-full' : 'relative max-h-96 overflow-hidden')
            }`}
            ref={commentRef}
          >
            {!isDetail && !isExpanded && showGradient && (
              <div className="absolute bottom-0 left-0 w-full h-36 gradation bg-gradient-to-t from-background z-10"></div>
            )}
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
          <div className="flex justify-center">
            {showMoreBtn && !isDetail && (
              <button
                className="py-2 px-5 transition bg-background-border hover:bg-background-surface text-sm text-text-primary rounded-full"
                onClick={(e) => {
                  setIsExpanded((prevState) => !prevState)
                  handleClick(e)
                }}
              >{`${isExpanded ? '접기' : '더보기'}`}</button>
            )}
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
