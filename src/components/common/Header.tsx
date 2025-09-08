import React from 'react'
import { useNavigate } from 'react-router-dom'
import addButton from '/icons/add.svg'
import closeButton from '/icons/close.svg'
import backArrowButton from '/icons/back-arrow.svg'

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
  // 사용시 <Header title="제목" show버튼명={true} />
  // show버튼명 = {true}로만 변경하면 onClick 설정없이 사용 가능

  // 기본적으로 버튼은 fasle로 숨김처리 되어있음
  // show버튼명 = { 로직에 클릭시 실행함수 포함되어있음 }

  title,
  onBackClick,
  onAddClick,
  onCancelClick,
  showBackButton = false,
  showAddButton = false,
  showCancelButton = false,
}) => {
  const navigate = useNavigate()

  // 버튼 눌렀을때 작동 함수 설정
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
          <button onClick={handleBackClick}>
            <img src={backArrowButton} alt="뒤로가기" />
          </button>
        )}
        {showCancelButton && (
          <button onClick={handleCancelClick}>
            <img src={closeButton} alt="뒤로가기" />
          </button>
        )}
      </div>

      {/* 중앙 타이틀 */}
      <h1>{title}</h1>

      {/* 오른쪽 버튼 */}
      <div className="flex items-center">
        {showAddButton && (
          <button onClick={handleAddClick}>
            <img src={addButton} alt="추가" />
          </button>
        )}
      </div>
    </header>
  )
}
