interface SidebarButtonProps {
  /** 버튼에 표시될 텍스트 */
  content: string
  /** 버튼 아이콘 이미지 URL */
  icon?: string
  /** 버튼에 대한 설명 */
  ariaLabel: string
  /** 버튼 활성화 상태 */
  isActive?: boolean
  /** 클릭 이벤트 핸들러 함수 */
  onclick?: () => void
}

/**
 * 사이드바 버튼 component
 *
 * @param {string} content - 버튼에 표시될 텍스트
 * @param {string} icon - 버튼 아이콘 이미지 URL
 * @param {string} ariaLabel - 버튼에 대한 설명
 * @param {boolean} isActive - 버튼 활성화 상태 (기본값: false)
 * @param {function} onclick - 클릭 이벤트 핸들러 함수
 */
function SidebarButton({
  icon,
  content,
  isActive = false,
  ariaLabel,
  onclick,
}: SidebarButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onclick}
      className={`w-full rounded-full flex items-center py-3 px-4 gap-4 text-5 bg-opacity-10 ${
        isActive
          ? 'text-primary bg-primary bg-opacity-30'
          : 'hover:bg-background-border active:bg-primary active:bg-opacity-30 active:text-primary'
      }`}
    >
      <img src={icon} alt="icon" className="w-4 h-4" />
      {content}
    </button>
  )
}
export default SidebarButton
