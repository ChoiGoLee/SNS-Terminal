import TrashIcon from '../../assets/icons/trash.svg?react'
import LogoutIcon from '../../assets/icons/logout.svg?react'
import PostIcon from '../../assets/icons/post.svg?react'
import HeartIcon from '../../assets/icons/heart-line.svg?react'
import CommentIcon from '../../assets/icons/comment.svg?react'
import SearchIcon from '../../assets/icons/search-g.svg?react'

interface ExplainProps {
  iconType: 'resign' | 'logout' | 'post' | 'like' | 'comment' | 'search'
  title: string
  description: string
  buttons?: Array<{
    text: string
    onClick: () => void
    variant: 'primary' | 'secondary' | 'danger'
  }>
  showCard?: boolean
}

//매핑 객체
const ICON_TYPES = {
  resign: { icon: TrashIcon, bgColor: 'bg-red-600/10' },
  logout: { icon: LogoutIcon, bgColor: 'bg-background-border' },
  post: { icon: PostIcon, bgColor: 'bg-background-border' },
  like: { icon: HeartIcon, bgColor: 'bg-background-border' },
  comment: { icon: CommentIcon, bgColor: 'bg-background-border' },
  search: { icon: SearchIcon, bgColor: 'bg-background-border' },
}

function Description({
  iconType,
  title,
  description,
  buttons,
  showCard,
}: ExplainProps) {
  const IconComponent = ICON_TYPES[iconType].icon
  const BgComponent = ICON_TYPES[iconType].bgColor

  return (
    <div className="text-center py-12 lg:py-16">
      <div
        className={`w-16 lg:w-20 h-16 lg:h-20 bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-6 ${BgComponent}`}
      >
        <IconComponent className="w-6 h-6 lg:w-7 lg:h-7 text-dark-text-secondary text-text-secondary" />
      </div>
      <h3 className="text-lg lg:text-xl font-bold text-dark-text-primary mb-2">
        {title}
      </h3>
      <p className="text-text-secondary text-sm lg:text-base mb-6">
        {description}
      </p>
      {showCard && (
        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 mb-6 text-left">
          <h4 className="text-red-400 font-medium mb-2 text-sm lg:text-base">
            탈퇴 시 삭제되는 정보:
          </h4>
          <ul className="text-red-300 text-xs lg:text-sm space-y-1">
            <li>• 프로필 정보 및 사진</li>
            <li>• 모든 포스트 및 댓글</li>
            <li>• 팔로워 및 팔로잉 정보</li>
            <li>• 메시지 및 알림</li>
            <li>• 기타 모든 활동 기록</li>
          </ul>
        </div>
      )}
      {buttons && (
        <div className="flex gap-3 mt-6">
          {/* 임시,버튼 컴포넌트로 교체 예정 */}
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`
          font-bold rounded-full transition-all duration-200 cursor-pointer 
          whitespace-nowrap flex items-center justify-center border-0 outline-none 
          px-8 py-3 text-lg h-12 flex-1
          ${
            button.variant === 'primary'
              ? 'bg-primary text-black hover:bg-primary-dark'
              : ''
          }
          ${
            button.variant === 'secondary'
              ? 'bg-dark-surface text-dark-text-primary border border-background-border hover:bg-background-border active:bg-background-border'
              : ''
          }
          ${
            button.variant === 'danger'
              ? 'bg-red-600 text-white hover:bg-red-700 active:bg-red-700'
              : ''
          }
        `}
            >
              {button.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Description
