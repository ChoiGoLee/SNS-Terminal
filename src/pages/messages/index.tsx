import { useState } from 'react'
import { sampleRooms } from '../../components/common/ChatRoomList'
import ChatRoomList from '../../components/common/ChatRoomList'
import { Header } from '../../components/common/Header'
import { SideBar, type SideItem } from '../../components/common/SideBar'

const sidebarItems: SideItem[] = [
  {
    type: 'home',
    img: '/icons/home.svg',
    activeImg: '/icons/home-fill.svg',
    path: '/',
    text: '홈',
    href: '/',
    requireAuth: false,
  },
  {
    type: 'messages',
    img: '/icons/message.svg',
    activeImg: '/icons/message-fill.svg',
    path: '/messages',
    text: '메시지',
    href: '/messages',
    requireAuth: true,
  },
  {
    type: 'profile',
    img: '/icons/profile.svg',
    activeImg: '/icons/profile-fill.svg',
    path: '/profile',
    text: '프로필',
    href: '/profile',
    requireAuth: true,
  },

  {
    type: 'settings',
    img: '/icons/setting.svg',
    path: '/settings',
    text: '설정',
    href: '/settings',
    requireAuth: true,
  },
  {
    type: 'login',
    path: '/login',
    text: '로그인 또는 가입하기',
    href: '/login',
    requireAuth: false,
  },
]

function Messages() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  return (
    <div className="flex min-h-screen">
      <div className="flex">
        <SideBar
          items={sidebarItems}
          isAuthenticated={true}
          activeItem="/messages"
        />
      </div>
      <div className="mx-auto border-x border-background-border">
        <Header title="메시지" buttons={{ add: { show: true } }} />
        <div className="w-80 border-r border-background-border">
          <ChatRoomList
            currentUserId="me123"
            rooms={sampleRooms}
            selectedId={selectedChatId}
            onSelect={setSelectedChatId}
          />
        </div>
      </div>
    </div>
  )
}
export default Messages
