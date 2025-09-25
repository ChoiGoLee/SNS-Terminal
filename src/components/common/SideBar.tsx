import React, { useMemo } from 'react'
import { useNavigate } from 'react-router'
import BaseButton from './BaseButton'
import SidebarButton from './SidebarButton'
import { sidebarItems as items } from '../constants/sidebarItems.ts'

export type SideItemType =
  | 'home'
  | 'messages'
  | 'profile'
  | 'settings'
  | 'login'
  | 'followerFeed'

export interface SideItem {
  type: SideItemType
  path: string
  img?: string
  activeImg?: string
  text: string
  requireAuth?: boolean
  href: string
}

interface SideProps {
  isAuthenticated?: boolean
  activeItem?: string
}

// 로그인 프롬프트 컴포넌트 분리
const LoginPrompt = ({ onLoginClick }: { onLoginClick: () => void }) => (
  <div className="bg-background-surface border border-background-border rounded-2xl p-4">
    <h3 className="font-bold text-lg pb-2">Terminal 시작하기</h3>
    <p className="text-text-secondary text-sm pb-4">
      사람들의 이야기를 확인하고 대화에 참여해보세요
    </p>
    <BaseButton
      content="회원가입하러 가기"
      width="flexWidth"
      ariaLabel="go to signup page"
      color="primary"
      size="lg"
      fontWeight="bold"
      onClick={onLoginClick}
    />
  </div>
)

// 사이드바 아이템 컴포넌트 분리
const SidebarMenuItem = ({
  item,
  isActive,
  onClick,
}: {
  item: SideItem
  isActive: boolean
  onClick: () => void
}) => {
  const iconSrc = isActive && item.activeImg ? item.activeImg : item.img

  return (
    <li className="w-full">
      <SidebarButton
        onclick={onClick}
        content={item.text}
        icon={iconSrc}
        isActive={isActive}
        ariaLabel={`go to ${item.text} page`}
      />
    </li>
  )
}

export const SideBar: React.FC<SideProps> = ({
  isAuthenticated = false,
  activeItem,
}) => {
  const navigate = useNavigate()

  // 보여줄 아이템들 분류
  const { mainItems, loginItem } = useMemo(() => {
    const visibleItems = items.filter(
      (item) => !item.requireAuth || isAuthenticated
    )

    return {
      mainItems: visibleItems.filter((item) => item.type !== 'login'),
      loginItem: visibleItems.find((item) => item.type === 'login'),
    }
  }, [items, isAuthenticated])

  const handleItemClick = (item: SideItem) => {
    navigate(item.path)
  }

  return (
    <aside className="w-64 bg-background-surface border-r border-background-border flex flex-col top-0 sticky">
      <div className="flex flex-col h-screen p-4">
        {/* 로고 */}
        <header className="pb-8 text-center">
          <span className="font-BoldRound text-primary  text-4xl">
            Terminal
          </span>
        </header>

        {/* 메인 메뉴 */}
        <nav className="flex-1">
          <ul className="space-y-2 text-text-primary text-xl font-medium">
            {mainItems.map((item) => (
              <SidebarMenuItem
                key={item.type}
                item={item}
                isActive={activeItem === item.path}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </ul>
        </nav>

        {/* 로그인 영역 */}
        {loginItem && (
          <LoginPrompt onLoginClick={() => handleItemClick(loginItem)} />
        )}
      </div>
    </aside>
  )
}
