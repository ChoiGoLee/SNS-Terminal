import TrashIcon from '../../assets/icons/trash.svg?react'
import LogoutIcon from '../../assets/icons/logout.svg?react'
import PostIcon from '../../assets/icons/post.svg?react'
import HeartIcon from '../../assets/icons/heart-line.svg?react'
import CommentIcon from '../../assets/icons/comment.svg?react'
import SearchIcon from '../../assets/icons/search-g.svg?react'
import BaseButton from './BaseButton'

/**
 * Description 컴포넌트 Props 타입
 */
interface ExplainProps {
  /** 아이콘 타입 */
  iconType: 'resign' | 'logout' | 'post' | 'like' | 'comment' | 'search'
  /** 제목 텍스트 */
  title: string
  /** 설명 텍스트 */
  description: string
  /** 버튼 (선택적) */
  buttons?: Array<{
    text: string
    onClick: () => void
    variant: 'primary' | 'surface' | 'danger'
  }>
  /** 카드 표시 (선택적) */
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
} as const

const BUTTON_COLOR_TYPES = {
  primary: 'primary',
  danger: 'danger',
  surface: 'surface',
} as const

/**
 * 다양한 상황에서 사용되는 설명/안내 컴포넌트
 * 회원탈퇴, 로그아웃, 빈 상태 등에서 사용
 *
 * @param {Object} props - 컴포넌트 props
 * @param {'resign'|'logout'|'post'|'like'|'comment'|'search'} props.iconType - 표시할 아이콘 타입
 * @param {string} props.title - 메인 제목 텍스트
 * @param {string} props.description - 설명 텍스트
 * @param {Array} [props.buttons] - 버튼 배열 (선택적)
 * @param {boolean} [props.showCard] - 추가 정보 카드 표시 여부 (선택적)
 * @returns {JSX.Element} 설명 컴포넌트 JSX 요소
 *  * @example
 * // 회원탈퇴 (카드 + 버튼)
 * <Description
 *   iconType="resign"
 *   title="계정을 탈퇴하시겠습니까?"
 *   description="탈퇴 시 모든 데이터가 영구적으로 삭제됩니다."
 *   showCard={true}
 *   buttons={[
 *     { text: '취소', onClick: () => {}, variant: 'secondary' },
 *     { text: '탈퇴하기', onClick: () => {}, variant: 'danger' }
 *   ]}
 * />
 *
 * @example
 * // 검색 결과 없음 (텍스트만)
 * <Description
 *   iconType="search"
 *   title="검색 결과가 없습니다"
 *   description="다른 키워드로 시도해보세요"
 * />
 *
 * @example
 * // 포스트 빈 상태
 * <Description
 *   iconType="post"
 *   title="아직 포스트가 없습니다"
 *   description="첫 번째 포스트를 작성해보세요"
 * />
 */

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
        <IconComponent
          className={`w-6 h-6 lg:w-7 lg:h-7 ${
            iconType === 'resign' ? 'text-red-500' : 'text-text-secondary'
          }`}
        />
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
        <div className="flex w-full gap-3 mt-6">
          {/* 버튼 컴포넌트로 교체 */}
          {buttons.map((button, index) => (
            <BaseButton
              key={index}
              content={button.text}
              ariaLabel={button.text}
              onClick={button.onClick}
              size="md"
              width="fullWidth"
              fontWeight="bold"
              color={BUTTON_COLOR_TYPES[button.variant]}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Description
