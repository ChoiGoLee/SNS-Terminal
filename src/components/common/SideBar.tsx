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
    const isLoginButton = item.type === 'login'

    // 현재 페이지인지에 따라 스타일 변경
    let buttonClass = ''

    if (isLoginButton) {
      // 로그인 버튼 전용 스타일
      buttonClass =
        'w-full flex items-center justify-center px-6 py-3 bg-primary text-black rounded-full hover:bg-primary-dark font-bold'
    } else {
      // 일반 메뉴 버튼 스타일
      buttonClass = isActive
        ? 'w-full flex items-center px-4 py-3 text-left bg-primary/10 text-primary rounded-full'
        : 'w-full flex items-center px-4 py-3 text-left rounded-full hover:bg-background-border hover:rounded-full'
    }
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
          <span>{item.text}</span>
        </button>
      </li>
    )
  }

  return (
    <aside className="w-64 bg-background-surface border-r border-background-border p-4 flex flex-col">
      <div className="flex flex-col h-screen">
        {/* 로고 영역 */}
        <div className="pb-8 text-3xl">
          {/* 로고 이미지가 들어갈 자리 */}
          <span>SNS-Terminal</span>
        </div>

        {/* 메뉴 컨텐츠 영역 */}
        <div className=" flex-1">
          {/* 메인 메뉴 항목들 */}
          <ul className="space-y-2 flex-1 text-text-primary text-xl font-medium">
            {mainMenuItems.map(renderSideItem)}
          </ul>
        </div>
        {/* 로그인 버튼 (아래쪽 고정) */}
        {loginItem && (
          <div className="bg-background-surface border border-background-border rounded-2xl p-4 ">
            <h3 className="font-bold text-lg pb-2">로그인 또는 가입하기</h3>
            <p className="text-text-secondary text-sm pb-4">
              사람들의 이야기를 확인하고 대화에 참여해보세요
            </p>
            <ul className="space-y-1 mt-auto text-black whitespace-nowrap">
              {renderSideItem(loginItem)}
            </ul>
          </div>
        )}
      </div>
    </aside>
  )
}
