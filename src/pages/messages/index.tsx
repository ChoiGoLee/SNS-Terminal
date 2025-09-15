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
  return (
    <>
      <div className="flex ">
        <nav className="flex-shrink-0">
          <SideBar
            items={sidebarItems}
            isAuthenticated={true}
            activeItem="/messages"
          />
        </nav>
        <div className=" border-background-border border-x mx-auto max-w-2xl">
          <Header title="메시지" buttons={{ add: { show: true } }} />
          <main className="">
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
              magnam doloribus atque, aliquam sed laborum culpa deleniti numquam
              beatae amet eaque fugiat quibusdam sequi laudantium adipisci. Quae
              est sed nostrum?
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
export default Messages
