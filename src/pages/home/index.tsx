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
    img: '/icons/notification.svg',
    path: '/notifications',
    text: '알림',
    href: '/notifications',
    requireAuth: true,
  },
  {
    img: '/icons/setting.svg',
    path: '/settings',
    text: '설정',
    href: '/settings',
    requireAuth: true,
  },
]

function Home(): any {
  return (
    <>
      <div className="min-h-30">
        <Header title="홈" />
      </div>
      <div className="flex">
        <SideBar items={sidebarItems} isAuthenticated={true} activeItem="/" />
        <h1>Home Page</h1>
      </div>
    </>
  )
}

export default Home
