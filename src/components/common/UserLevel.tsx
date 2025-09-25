interface UserLevelProps {
  level: 'junior' | 'mid' | 'senior' | 'lead'
}

const LEVEL_ICONS = {
  junior: '/icons/junior.svg',
  mid: '/icons/mid.svg',
  senior: '/icons/senior.svg',
  lead: '/icons/lead.svg',
} as const

/**
 * 사용자의 회원 등급을 아이콘으로 표시하는 컴포넌트
 * 개발자의 경력 수준(junior,mid,senior,lead)에 따른 레벨 아이콘을 렌더링
 *
 * @example
 * ```tsx
 * // 댓글에서 사용
 * <UserLevel level="senior" />
 * ```
 *
 * @example
 * ```tsx
 * // 프로필에서 배지와 함께 사용
 * <div className="bg-purple-100 px-2 py-1 rounded flex items-center gap-1">
 *   <UserLevel level="lead" />
 *   <span>리드 개발자</span>
 * </div>
 * ```
 *
 * @example
 * ```tsx
 * // 게시물 작성자 정보에서 사용
 * <div className="flex items-center gap-2">
 *   <span className="font-medium">김개발자</span>
 *   <UserLevel level="mid" />
 * </div>
 * ```
 */

function UserLevel({ level }: UserLevelProps) {
  return (
    <img
      src={LEVEL_ICONS[level]}
      alt={level}
      className="w-3 h-3 flex item-center justify-center"
    />
  )
}

export default UserLevel
