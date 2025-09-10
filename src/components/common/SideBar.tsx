import React from 'react'
import { useNavigate } from 'react-router'

// 사이드바 아이템 종류 정의
export type SideItemType =
  | 'home'
  | 'messages'
  | 'profile'
  | 'settings'
  | 'login'

export interface SideItem {
  type: SideItemType
  path: string
  img?: string
  text: string
  requireAuth?: boolean
  href: string
}

interface SideProps {
  items: SideItem[]
  isAuthenticated?: boolean
  activeItem?: string
}

export const SideBar: React.FC<SideProps> = ({
  items,
  isAuthenticated = false,
  activeItem,
}) => {
  const navigate = useNavigate()

  // 아이템 클릭 시 페이지 이동
  const handleItemClick = (item: SideItem) => {
    navigate(item.path)
  }

  // 아이템을 보여줄지 결정
  const isItemVisible = (item: SideItem): boolean => {
    // 로그인이 필요한 메뉴인데 로그인하지 않은 경우 숨김
    if (item.requireAuth && !isAuthenticated) {
      return false
    }
    return true
  }

  // 보여줄 아이템들만 필터링
  const visibleItems = items.filter(isItemVisible)

  const mainMenuItems = visibleItems.filter((item) => item.type !== 'login')
  const loginItem = visibleItems.find((item) => item.type === 'login')

  // 각 사이드바 아이템 렌더링
  const renderSideItem = (item: SideItem) => {
    const isActive = activeItem === item.path

    // 현재 페이지인지에 따라 스타일 변경
    const buttonClass = isActive
      ? 'w-full flex items-center px-4 py-2 text-left transition-colors bg-primary/10 text-primary'
      : 'w-full flex items-center px-4 py-2 text-left transition-colors text-text-primary hover:text-primary hover:bg-primary/10'

    return (
      <li key={item.type} className="w-full">
        <button
          className={buttonClass}
          onClick={() => handleItemClick(item)}
          type="button"
        >
          {/* 아이콘이 있으면 표시 */}
          {item.img && (
            <div className="w-5 h-5 mr-3">
              <img
                src={item.img}
                alt={`${item.text} 아이콘`}
                className="w-full h-full"
              />
            </div>
          )}
          <span className="font-medium">{item.text}</span>
        </button>
      </li>
    )
  }

  return (
    <aside className="w-64 bg-background-surface border-r border-background-border">
      <div className="flex flex-col h-screen">
        {/* 로고 영역 */}
        <div className="flex items-center justify-center p-4 border-b border-background-border">
          {/* 로고 이미지가 들어갈 자리 */}
          <span className="text-sm text-gray-500">SNS-Terminal</span>
        </div>

        {/* 메뉴 컨텐츠 영역 */}
        <div className="flex flex-col flex-1 p-4">
          {/* 메인 메뉴 항목들 */}
          <ul className="space-y-1 flex-1">
            {mainMenuItems.map(renderSideItem)}
          </ul>

          {/* 로그인 버튼 (아래쪽 고정) */}
          {loginItem && (
            <ul className="space-y-1 mt-auto">{renderSideItem(loginItem)}</ul>
          )}
        </div>
      </div>
    </aside>
  )
}
