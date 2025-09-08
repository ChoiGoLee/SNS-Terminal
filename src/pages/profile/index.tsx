import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import BackArrow from '/icons/back-arrow.svg'

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

function Profile() {
  return (
    <>
      <div className="min-h-30">
        <Header
          title="프로필"
          leftButton={{
            icon: <img src={BackArrow} />,
            onClick: () => {
              console.log('뒤로가기')
            },
          }}
        />
      </div>
      <div className="flex">
        <SideBar items={sidebarItems} isAuthenticated={true} activeItem="/" />
        <div>Profile Page</div>
      </div>
    </>
  )
}
export default Profile
