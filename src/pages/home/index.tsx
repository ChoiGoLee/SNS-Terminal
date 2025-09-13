import { Header } from '../../components/common/Header'
import { SideBar, type SideItem } from '../../components/common/SideBar'
import Markdown from '../../components/common/Markdown'
import Description from '../../components/common/Description'

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
        {/* 설명 컴포넌트 */}
        <div className="min-h-screen bg-dark-background p-8">
          <h1 className="text-2xl font-bold text-white mb-8">
            Description 컴포넌트 테스트
          </h1>

          {/* 회원탈퇴 케이스 */}
          <div className="mb-16">
            <h2 className="text-lg text-gray-300 mb-4">
              1. 회원탈퇴 (카드 + 버튼)
            </h2>
            <Description
              iconType="resign"
              title="계정을 탈퇴하시겠습니까?"
              description="탈퇴 시 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다."
              showCard={true}
              buttons={[
                {
                  text: '취소',
                  onClick: () => console.log('취소'),
                  variant: 'secondary',
                },
                {
                  text: '탈퇴하기',
                  onClick: () => console.log('탈퇴'),
                  variant: 'danger',
                },
              ]}
            />
          </div>

          <Description
            iconType="logout"
            title="로그아웃 하시겠습니까?"
            description="현재 세션이 종료되고 로그인 페이지로 이동합니다."
            buttons={[
              {
                text: '취소',
                onClick: () => console.log('취소'),
                variant: 'secondary',
              },
              {
                text: '로그아웃',
                onClick: () => console.log('로그아웃'),
                variant: 'primary',
              },
            ]}
          />

          {/* 검색 결과 없음 케이스 */}
          <Description
            iconType="search"
            title="검색 결과가 없습니다"
            description="다른 검색어를 시도해보세요."
          />

          <Description
            iconType="post"
            title="아직 포스트가 없습니다"
            description="첫 번째 포스트를 작성해보세요!"
          />

          <Description
            iconType="like"
            title="마음에 든 포스트가 없습니다"
            description="좋아하는 포스트에 하트를 눌러보세요."
          />

          <Description
            iconType="comment"
            title="답글이 없습니다"
            description="다른 사람의 포스트에 답글을 달아보세요."
          />
        </div>
      </div>
    </div>
  )
}

export default Home
