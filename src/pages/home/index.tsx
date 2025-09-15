import { Header } from '../../components/common/Header'
import { SideBar, type SideItem } from '../../components/common/SideBar'
import Markdown from '../../components/common/Markdown'

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

function Home(): any {
  return (
    <div className="flex min-h-screen">
      <div className="h-full">
        <SideBar items={sidebarItems} isAuthenticated={true} activeItem="/" />
      </div>
      <div className="mx-auto border-x border-background-border border-r border-l">
        <Header title="홈" />
        <Markdown />
      </div>
    </div>
  )
}

export default Home
