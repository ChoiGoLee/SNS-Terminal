import React from 'react'

interface HeaderButton {
  text?: string
  icon?: React.ReactNode
  onClick: () => void
}

interface HeaderProps {
  title?: string
  leftButton?: HeaderButton
  rightButton?: HeaderButton
}

export const Header: React.FC<HeaderProps> = ({
  title,
  leftButton,
  rightButton,
}) => {
  return (
    <header className="min-w-[670px] bg-background-surface text-text-primary text-xl flex">
      {leftButton && (
        <button onClick={leftButton.onClick}>
          {leftButton.icon}
          {leftButton.text && !leftButton.icon && (
            <span>{leftButton.text}</span>
          )}
        </button>
      )}
      <h1>{title}</h1>
      {rightButton && (
        <button onClick={rightButton.onClick}>
          {rightButton.icon}
          {rightButton.text && !rightButton.icon && (
            <span className="text-primary">{rightButton.text}</span>
          )}
        </button>
      )}
    </header>
  )
}
