import Avatar from './Avatar'
import Markdown from './Markdown'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import UserLevel from './UserLevel'
import { useNavigate } from 'react-router'

// interface PostCardProps {}

function PostCard() {
  const navigate = useNavigate()

  return (
    <article
      onClick={() => navigate('/post-detail')}
      className="bg-background border-background-border border-b p-4 hover:bg-background-surface/30 transition-colors cursor-pointer relative"
    >
      <div className="flex space-x-3">
        <Avatar userName="테스트" size="md" />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-bold text-text-primary">고우리</span>
            <UserLevel level="mid" />
            <span className="text-text-secondary">·</span>
            <span className="text-text-secondary text-sm">3시간 전</span>
          </div>

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
          <div className="flex items-center space-x-6 max-w-md mt-3">
            <LikeButton
              likeCount={30}
              isLiked={false}
              onLike={() => console.log('좋아요')}
            />
            <CommentButton commentCount={30} postId={''} />
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard
