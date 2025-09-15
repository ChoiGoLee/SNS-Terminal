import { Header } from '../../components/common/Header'
import { SideBar, type SideItem } from '../../components/common/SideBar'
import Markdown from '../../components/common/Markdown'
import CommentInput from '../../components/common/CommentInput'
import CommentItem from '../../components/common/CommentItem'

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

const handleCommentSubmit = (comment: string) => {
  console.log('댓글 제출:', comment)
  alert(`댓글: ${comment}`)
}

function Home(): any {
  return (
    <div className="flex min-h-screen">
      <div className="h-full">
        <SideBar items={sidebarItems} isAuthenticated={true} activeItem="/" />
      </div>
      <div className="mx-auto border-x border-background-border border-r border-l">
        <Header title="홈" />
        <Markdown />
        <CommentInput
          userName="테스트유저"
          userImage="https://picsum.photos/40/40"
          onSubmit={handleCommentSubmit}
        />
        <CommentItem
          userName="김개발"
          level="senior"
          content="좋은 코드네요! 참고하겠습니다."
          createdAt={Date.now() - 180000} // 3분 전 (직접 계산)
          isLiked={false}
          likeCount={3}
          onLikeToggle={() => console.log('좋아요 토글')}
        />

        <CommentItem
          userName="박프론트"
          level="junior"
          content="질문이 있습니다!"
          createdAt={Date.now() - 3600000} // 1시간 전
          isLiked={true}
          likeCount={5}
          onLikeToggle={() => console.log('좋아요 토글')}
        />
      </div>
    </div>
  )
}

export default Home
