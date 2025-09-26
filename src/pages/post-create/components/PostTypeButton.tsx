interface PostTypeButtonProps {
  text: string
  icon: string
  isSelected: boolean
  onClick: () => void
}

function PostTypeButton({
  text,
  icon,
  isSelected,
  onClick,
}: PostTypeButtonProps) {
  // 선택되면 -fill 추가, 선택 안되면 원본 경로
  const iconSrc = isSelected ? icon.replace('.svg', '-fill.svg') : icon

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full border rounded-lg flex p-3 gap-3 mb-2 transition-colors ${
        isSelected
          ? 'border-primary bg-primary bg-opacity-10'
          : 'border-background-border bg-background-surface hover:bg-background-hover'
      }`}
    >
      <img src={iconSrc} alt={`${text}게시물`} className="w-5 h-5" />
      <span
        className={`text-[14px] ${
          isSelected ? 'text-primary font-medium' : 'text-text-primary'
        }`}
      >
        {text}
      </span>
    </button>
  )
}

export default PostTypeButton
