import React from 'react'

interface IBaseButtonProps {
  content?: string
  img?: string
  width: fullWidth | flexWidth
  color: primary | danger | ghost
  isLeft?: true | false
  size: sm | md | lg
  fontWeight?: normal | medium | bold
  onClick?: () => void
}

const WIDTH_TYPES = {
  fullWidth: 'w-full',
  flexWidth: 'flex-1',
}

const COLOR_TYPES = {
  primary:
    'bg-primary border-background-border text-black hover:bg-primary-dark disabled:opacity-30',
  danger:
    'bg-danger border-background-border text-white hover:bg-danger-dark disabled:opacity-30',
  surface:
    'bg-background-surface border-background-border text-white hover:bg-background-border disabled:opacity-30',
}

const SIZE_TYPES = {
  sm: { btn: 'px-4 py-2 text-[14px] gap-2', icon: 'w-[14px]' },
  md: { btn: 'px-4 py-3 text-4 gap-2', icon: 'w-4' },
  lg: { btn: 'px-4 py-4 text-[18px] gap-3', icon: 'w-[18px]' },
}

function BaseButton({
  content,
  img,
  size,
  color,
  isLeft = true,
  width,
  fontWeight = normal,
  onClick,
}: IBaseButtonProps) {
  return (
    <button
      className={`
      flex items-center justify-center rounded-full
    ${WIDTH_TYPES[width]} 
    ${COLOR_TYPES[color]} 
    ${SIZE_TYPES[size].btn}
    font-${fontWeight}
  `}
    >
      {isLeft && img && (
        <img src={img} className={SIZE_TYPES[size].icon} alt="버튼" />
      )}
      {content}
      {!isLeft && img && (
        <img src={img} className={SIZE_TYPES[size].icon} alt="버튼" />
      )}
    </button>
  )
}

export default BaseButton
