import { formatTimeAgo } from '../../utils/timeUtils'
import Avatar from './Avatar'
import UserLevel from './UserLevel'
import LikeButton from './LikeButton'

interface CommentItemProps {
  userImage?: string
  userName: string
  level: 'junior' | 'mid' | 'senior' | 'lead'
  content: string
  createdAt: number | string
  isLiked?: boolean
  likeCount?: number
  onLikeToggle: () => void
}

/**
 * 댓글을 표시하는 컴포넌트
 * 사용자 프로필(Avatar), 댓글 내용, 유저 레벨, 작성 시간, 좋아요 기능
 *
 * @example
 * ```tsx
 * <CommentItem
 *   userName="김개발자"
 *   level="senior"
 *   content="정말 유용한 정보네요!"
 *   createdAt={Date.now() - 180000} // 감귤마켓 API 참고
 *   isLiked={false}
 *   likeCount={5}
 *   onLikeToggle={() => console.log('좋아요')}
 * />
 * ```
 */
function CommentItem({
  userImage,
  userName,
  level,
  content,
  createdAt,
  isLiked,
  likeCount,
  onLikeToggle,
}: CommentItemProps) {
  return (
    <div className="flex p-4 space-x-3 border-b border-background-border">
      <Avatar userImage={userImage} userName={userName} size="sm" />
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-bold text-text-primary">{userName}</span>
          <UserLevel level={level} />
          <span className="text-text-secondary text-sm">
            {/* api에서 받은 응답값(문자열)을 변환해서 사용되게 변경 */}
            {formatTimeAgo(
              typeof createdAt === 'string'
                ? new Date(createdAt).getTime()
                : createdAt
            )}
          </span>
        </div>
        <p className="text-text-primary text-sm leading-normal mb-2">
          {content}
        </p>
        <LikeButton
          likeCount={likeCount}
          isLiked={isLiked ?? false} // boolean 타입 선언시 오류가 발생, undefined일때 false를 기본값으로 설정
          onLike={onLikeToggle}
        />
      </div>
    </div>
  )
}

export default CommentItem
