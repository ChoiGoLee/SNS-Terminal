import { Header } from '../../components/common/Header'
import { SideBar, type SideItem } from '../../components/common/SideBar'

const sidebarItems: SideItem[] = [
  {
    type: 'home',
    img: '/icons/home.svg',
    path: '/',
    text: '홈',
    href: '/',
    requireAuth: false,
  },
  {
    type: 'messages',
    img: '/icons/message.svg',
    path: '/messages',
    text: '메시지',
    href: '/messages',
    requireAuth: true,
  },
  {
    type: 'profile',
    img: '/icons/profile.svg',
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
    text: '로그인',
    href: '/login',
    requireAuth: false,
  },
]

function Profile() {
  return (
    <>
      <div className="min-h-30">
        <Header title="프로필" buttons={{ back: { show: true } }} />
      </div>
      <div className="flex">
        <SideBar
          items={sidebarItems}
          isAuthenticated={true}
          activeItem="/profile"
        />
        <div>Profile Page</div>
      </div>
    </>
  )
}
export default Profile
