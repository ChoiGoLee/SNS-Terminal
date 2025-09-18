import { Header } from '../../components/common/Header'
import { SideBar, type SideItem } from '../../components/common/SideBar'
import Markdown from '../../components/common/Markdown'
import Avatar from '../../components/common/Avatar'
import CommentButton from '../../components/common/CommentButton'
import CommentInput from '../../components/common/CommentInput'
import CommentItem from '../../components/common/CommentItem'
import LikeButton from '../../components/common/LikeButton'
import UserLevel from '../../components/common/UserLevel'
import Description from '../../components/common/Description'
import PostCard from '../../components/common/PostCard'

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

function Home(): React.JSX.Element {
  return (
    <div className="flex min-h-screen">
      <div className="h-full">
        <SideBar items={sidebarItems} isAuthenticated={true} activeItem="/" />
      </div>
      <div className="mx-auto border-x border-background-border border-r border-l">
        <Header title="홈" />
        <PostCard content="djfdksjflsdk" />
      </div>
    </div>
  )
}

export default Home
