import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'

const sidebarItems = [
  {
    img: '/icons/home.svg',
    path: '/',
    text: '홈',
    href: '/',
    requireAuth: false,
  },
  {
    img: '/icons/message.svg',
    path: '/messages',
    text: '메시지',
    href: '/messages',
    requireAuth: true,
  },
  {
    img: '/icons/profile.svg',
    path: '/profile',
    text: '프로필',
    href: '/profile',
    requireAuth: true,
  },

  {
    img: '/icons/setting.svg',
    path: '/settings',
    text: '설정',
    href: '/settings',
    requireAuth: true,
  },
  {
    path: '/login',
    text: '로그인',
    href: '/login',
    requireAuth: false,
  },
]

function Messages() {
  return (
    <>
      <div className="min-h-30">
        <Header title="메시지" showAddButton={true} />
      </div>
      <div className="flex">
        <SideBar
          items={sidebarItems}
          isAuthenticated={true}
          activeItem="/messages"
        />
        <div>Messages Page</div>
      </div>
    </>
  )
}
export default Messages
