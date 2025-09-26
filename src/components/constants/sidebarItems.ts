import { type SideItem } from '../common/SideBar.tsx'

export const sidebarItems: SideItem[] = [
  {
    type: 'home',
    img: '/icons/home.svg',
    activeImg: '/icons/home-fill.svg',
    path: '/',
    text: '홈',
    href: '/',
  },
  {
    type: 'followerFeed',
    img: '/icons/follower.svg',
    activeImg: '/icons/follower-fill.svg',
    path: '/follower-feed',
    text: '팔로워 피드',
    href: '/follower-feed',
  },
  {
    type: 'messages',
    img: '/icons/message.svg',
    activeImg: '/icons/message-fill.svg',
    path: '/messages',
    text: '메시지',
    href: '/messages',
  },
  {
    type: 'profile',
    img: '/icons/profile.svg',
    activeImg: '/icons/profile-fill.svg',
    path: '/profile',
    text: '프로필',
    href: '/profile',
  },
  {
    type: 'login',
    path: '/login',
    text: '로그인 또는 가입하기',
    href: '/login',
  },
]
