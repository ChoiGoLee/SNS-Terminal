import React from 'react'
import { useNavigate } from 'react-router-dom'
import addButton from '/icons/add.svg'
import closeButton from '/icons/close.svg'
import backArrowButton from '/icons/back-arrow.svg'

interface HeaderButton {
  text?: string
  icon?: React.ReactNode
  onClick: () => void
}

interface HeaderProps {
  title?: string
  onBackClick?: () => void
  onCancelClick?: () => void
  onAddClick?: () => void
  showBackButton?: boolean
  showAddButton?: boolean
  showCancelButton?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBackClick,
  onAddClick,
  onCancelClick,
  showBackButton = false,
  showAddButton = false,
  showCancelButton = false,
}) => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick()
    } else {
      navigate(-1)
    }
  }

  const handleAddClick = () => {
    if (onAddClick) {
      onAddClick()
    } else {
      console.log('add버튼 누름')
    }
  }

  const handleCancelClick = () => {
    if (onCancelClick) {
      onCancelClick()
    } else {
      console.log('cancle버튼 누름')
    }
  }

  return (
    <header className="min-w-[670px] bg-background-surface text-text-primary text-xl flex">
      {/* 왼쪽 버튼 */}
      <div className="flex items-center">
        {showBackButton && (
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded transition-colors"
          >
            {backArrowButton}
          </button>
        )}
        {showCancelButton && (
          <button
            onClick={handleCancelClick}
            className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded transition-colors text-gray-600"
          >
            취소
          </button>
        )}
      </div>
      {/* 중앙 타이틀 */}
      <h1>{title}</h1>
      {/* 오른쪽 버튼 */}
      <div className="flex items-center">
        {showAddButton && (
          <button
            onClick={handleAddClick}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {addButton}
          </button>
        )}
      </div>
    </header>
  )
}
