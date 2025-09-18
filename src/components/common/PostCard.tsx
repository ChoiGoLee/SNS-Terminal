import Avatar from './Avatar'
import Markdown from './Markdown'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import UserLevel from './UserLevel'
import { useNavigate } from 'react-router'

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
function PostCard({ isDetail = false }: PostCardProps) {
  const navigate = useNavigate()

  return (
    <article
      onClick={() => navigate('/post-detail')}
      className={`bg-background border-background-border p-4 hover:bg-background-surface/30 transition-colors relative ${
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

          <div className="mb-3">
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
