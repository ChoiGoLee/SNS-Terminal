import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import SidebarButton from './SidebarButton'
import { sidebarItems as items } from '../constants/sidebarItems.ts'
import { useAuth } from '../../contexts/AuthContext.tsx'
import Avatar from './Avatar.tsx'
import BaseButton from './BaseButton.tsx'

export type SideItemType =
  | 'home'
  | 'messages'
  | 'profile'
  | 'login'
  | 'followerFeed'
  | 'postCreate'

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
  activeItem?: string
}

// 유저 정보 컴포넌트
const UserInfo = ({
  userAccount,
  userName,
  userImage,
  onSettingsClick,
}: {
  userAccount: string
  userName: string
  userImage?: string
  onSettingsClick: () => void
}) => (
  <div
    className="bg-background-surface border border-background-border rounded-2xl p-4"
    onClick={(e) => {
      e.stopPropagation()
      if (!userAccount) return
      location.href = `/profile/${userAccount}`
    }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar userName={userName} size={'lg'} userImage={userImage} />
        <div className="flex flex-col">
          <span className="text-text-primary text-lg">{userName}님</span>
          <span className="text-text-secondary text-sm">@{userAccount}</span>
        </div>
      </div>
      <button
        onClick={onSettingsClick}
        className="p-2 hover:bg-background-border rounded-lg transition-colors"
        aria-label="설정"
      >
        <img src="/icons/setting.svg" alt="설정" width="20" height="20" />
      </button>
    </div>
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

export const SideBar: React.FC<SideProps> = ({ activeItem }) => {
  const navigate = useNavigate()
  const { user, checkAuth } = useAuth()

  // 컴포넌트 마운트 시마다 사용자 정보 업데이트
  useEffect(() => {
    checkAuth()
  }, [])

  // 보여줄 아이템들 분류
  const mainItems = useMemo(() => {
    return items.filter((item) => item.type !== 'login')
  }, [])

  const handleItemClick = (item: SideItem) => {
    navigate(item.path)
  }

  return (
    <aside className="min-w-65 bg-background-surface border-r border-background-border flex flex-col top-0 sticky">
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

        {/* 포스트작성 버튼 */}
        <div className="mb-3">
          <BaseButton
            content="포스트 작성"
            ariaLabel="새 포스트 작성"
            size="md"
            color="primary"
            width="fullWidth"
            fontWeight="bold"
            isLeft={true}
            onClick={() => navigate('/post-create')}
          />
        </div>

        {/* 유저 정보 영역 */}
        {user?.username && (
          <UserInfo
            userAccount={user.accountname}
            userName={user.username}
            userImage={user.image}
            onSettingsClick={() => {
              navigate('/settings')
            }}
          />
        )}

        <footer>
          <div className="text-center px-4 pt-4 text-text-secondary text-xs">
            &copy; {new Date().getFullYear()} Choigolee. All rights reserved.
          </div>
        </footer>
      </div>
    </aside>
  )
}
