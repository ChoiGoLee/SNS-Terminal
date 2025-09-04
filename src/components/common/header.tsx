import React from 'react'

interface HeaderButton {
  text: string
  onClick: () => void
}

interface HeaderProps {
  title: string
  leftButton?: HeaderButton
  rightButton?: HeaderButton
}

export const Header: React.FC<HeaderProps> = ({
  title,
  leftButton,
  rightButton,
}) => {
  return (
    <header className="bg-background-surface text-text-primary text-xl">
      {leftButton && (
        <button onClick={leftButton.onClick}>{leftButton.text}</button>
      )}
      <h1>{title}</h1>
      {rightButton && (
        <button onClick={rightButton.onClick}>{rightButton.text}</button>
      )}
    </header>
  )
}
