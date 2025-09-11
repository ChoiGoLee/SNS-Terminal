import React from 'react'
import type { IButtonProps } from '/src/docs/IButtonType.ts'
import '../../assets/css/btns.css'

function Btns({
  content,
  img,
  variant = 'primary',
  size = 'md',
  fontWeight = 'regular',
  onClick,
  disabled = false,
  className = '',
}: IButtonProps): React.JSX.Element {
  const getButtonClasses = (): string => {
    const baseClasses = ['btn']

    // variant 클래스 추가
    const variantClass = `${variant}-btn`
    baseClasses.push(variantClass)

    // size 클래스 추가
    const sizeClass = size === 'full-width' ? 'full-width-btn' : `${size}-btn`
    baseClasses.push(sizeClass)

    // 글꼴 굵기 클래스 추가
    const fontClass = `${fontWeight}-font`
    baseClasses.push(fontClass)

    // 사용자 정의 className이 있으면 추가
    if (className) {
      baseClasses.push(className)
    }

    return baseClasses.join(' ')
  }

  return (
    <button
      className={getButtonClasses()}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {img && (
        <img
          className="mr-3 w-5 h-5"
          src={img}
          alt={content ? `${content} icon` : 'button icon'}
        />
      )}
      {content}
    </button>
  )
}

export default Btns
