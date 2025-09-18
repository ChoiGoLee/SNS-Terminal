import React from 'react'
import { useNavigate } from 'react-router-dom'
import addButton from '/icons/add.svg'
import closeButton from '/icons/close.svg'
import backArrowButton from '/icons/back-arrow.svg'

type ButtonType = 'back' | 'add' | 'cancel'
type ButtonPosition = 'left' | 'right'

interface ButtonConfig {
  type: ButtonType
  position: ButtonPosition
  icon: string
  alt: string
}

interface HeaderProps {
  title?: string
  buttons?: Partial<
    Record<
      ButtonType,
      {
        show: boolean
        onClick?: () => void
      }
    >
  >
}

const BUTTON_CONFIGS: Record<ButtonType, ButtonConfig> = {
  back: {
    type: 'back',
    position: 'left',
    icon: backArrowButton,
    alt: '뒤로가기',
  },
  cancel: {
    type: 'cancel',
    position: 'left',
    icon: closeButton,
    alt: '취소',
  },
  add: {
    type: 'add',
    position: 'right',
    icon: addButton,
    alt: '추가',
  },
}

export const Header: React.FC<HeaderProps> = ({ title = '', buttons = {} }) => {
  const navigate = useNavigate()

  // 기본 동작들
  const defaultActions = {
    back: () => navigate(-1),
    cancel: () => console.log('취소 클릭'),
    add: () => console.log('추가 클릭'),
  }

  // 버튼 렌더링 함수
  const renderButton = (buttonType: ButtonType) => {
    const buttonProps = buttons[buttonType]
    if (!buttonProps?.show) return null

    const config = BUTTON_CONFIGS[buttonType]
    const handler = buttonProps.onClick || defaultActions[buttonType]

    return (
      <button key={buttonType} onClick={handler} type="button">
        <img src={config.icon} alt={config.alt} />
      </button>
    )
  }

  // 위치별 버튼 필터링
  const leftButtons = (['back', 'cancel'] as const)
    .map(renderButton)
    .filter(Boolean)

  const rightButtons = (['add'] as const).map(renderButton).filter(Boolean)

  return (
    <header className="flex items-center bg-background-surface min-h-15 text-text-primary border-b border-background-border">
      {/* 왼쪽 버튼들 */}
      <div className="flex items-center min-w-20">{leftButtons}</div>

      {/* 중앙 제목 */}
      <h1 className="flex-1 font-medium text-lg  px-4">{title}</h1>

      {/* 오른쪽 버튼들 */}
      <div className="flex items-center min-w-20 justify-end">
        {rightButtons}
      </div>
    </header>
  )
}
