interface IBaseButtonProps {
  /** BaseButton 안에 들어갈 텍스트 내용 */
  content?: string
  /** BaseButton 속 아이콘 이미지 주소 */
  icon?: string
  /** 버튼에 대한 설명 */
  ariaLabel: string
  /** 아이콘이 왼쪽에 위치하는지 여부 (true: 왼쪽에 있음, false: 오른쪽에 있음)*/
  isLeft?: boolean
  /** 폰트 사이즈 설정 */
  fontWeight?: 'normal' | 'medium' | 'bold'
  /** BaseButton 너비 */
  width: 'fullWidth' | 'flexWidth'
  /** BaseButton 색상 설정 */
  color: 'primary' | 'danger' | 'surface'
  /** BaseButton 사이즈 설정 */
  size: 'sm' | 'md' | 'lg'
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void
  /** 버튼 타입 지정 */
  btnType?: 'button' | 'submit'
  /** 버튼 비활성화 여부 */
  disabled?: boolean
}

const WIDTH_TYPES = {
  fullWidth: 'w-full',
  flexWidth: 'flex-1',
} as const

const COLOR_TYPES = {
  primary:
    'bg-primary border-background-border text-black hover:bg-primary-dark disabled:opacity-30',
  danger:
    'bg-danger border-background-border text-white hover:bg-danger-dark disabled:opacity-30',
  surface:
    'bg-background-surface border-background-border text-white hover:bg-background-border disabled:opacity-30',
} as const

const SIZE_TYPES = {
  sm: { btn: 'px-4 py-2 text-[14px] gap-2', icon: 'w-[14px]' },
  md: { btn: 'px-4 py-3 text-4 gap-2', icon: 'w-4' },
  lg: { btn: 'px-4 py-4 text-[18px] gap-3', icon: 'w-[18px]' },
} as const

/**
 * 기본 버튼 컴포넌트
 *
 * @param content - 버튼에 표시될 텍스트 (선택적)
 * @param icon - 버튼 아이콘 이미지 URL (선택적)
 * @param isLeft - 아이콘 위치, true면 왼쪽 (기본값: true)
 * @param fontWeight - 폰트 두께 ('normal' | 'medium' | 'bold', 기본값: 'normal')
 * @param ariaLabel - 버튼에 대한 설명
 * @param width - 버튼 너비 설정
 *   - 'fullWidth': 부모 요소의 전체 너비 차지
 *   - 'flexWidth': 컨테이너 내에서 유연하게 확장
 * @param color - 버튼 색상 ('primary' | 'danger' | 'surface')
 * @param size - 버튼 크기 ('sm' | 'md' | 'lg')
 * @param onClick - 클릭 이벤트 핸들러 함수
 */
function BaseButton({
  content,
  icon,
  ariaLabel,
  size,
  color,
  isLeft = true,
  width,
  fontWeight = 'normal',
  onClick,
  btnType = 'button',
  disabled = false,
}: IBaseButtonProps) {
  return (
    <button
      disabled={disabled}
      type={btnType}
      onClick={onClick}
      className={`
      flex items-center justify-center rounded-full
    ${WIDTH_TYPES[width]} 
    ${COLOR_TYPES[color]} 
    ${SIZE_TYPES[size].btn}
    font-${fontWeight}
  `}
      aria-label={ariaLabel}
    >
      {isLeft && icon && (
        <img src={icon} className={SIZE_TYPES[size].icon} alt="" />
      )}
      {content}
      {!isLeft && icon && <img src={icon} className={SIZE_TYPES[size].icon} />}
    </button>
  )
}

export default BaseButton
