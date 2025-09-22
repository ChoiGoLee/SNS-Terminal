import type React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import PostCard from '../../components/common/PostCard'
import { useEffect, useState } from 'react'
import { api } from '../../services/apiWrapper'
import type { UserAPI, PostAPI, Common } from '../../types/api'
import Avatar from '../../components/common/Avatar'

function Profile(): React.JSX.Element {
  const [user, setUser] = useState<Common.User | null>(null)
  const [posts, setPosts] = useState<Common.Post[]>([])
  const [error, setError] = useState<string | null>(null)

  // 내 정보 가져오기
  const fetchMyInfo = async () => {
    try {
      const response = await api.get<UserAPI.MyInfo.Res>('/user/myinfo')
      setUser(response.user)
      return response.user
    } catch (err) {
      console.error('사용자 정보 조회 실패:', err)
      setError('사용자 정보를 불러올 수 없습니다.')
      return null
    }
  }

  // 내 게시글 가져오기
  const fetchMyPosts = async (accountname: string) => {
    try {
      const response = await api.get<PostAPI.GetUserPosts.Res>(
        `/post/${accountname}/userpost/`
      )
      setPosts(response.post)
    } catch (err) {
      console.error('게시글 조회 실패:', err)
      setError('게시글을 불러올 수 없습니다.')
    }
  }

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('로그인이 필요합니다.')
      return
    }
    const loadProfileData = async () => {
      setError(null)

      // 내 정보 가져오기
      const userData = await fetchMyInfo()
      if (userData) {
        // 내 게시글 가져오기
        await fetchMyPosts(userData.accountname)
      }
    }

    loadProfileData()
  }, [])

  return (
    <div className="flex min-h-screen">
      <div className="h-full">
        <SideBar isAuthenticated={true} activeItem="/profile" />
      </div>
      <div className="mx-auto border-x border-background-border border-r border-l">
        <Header title="프로필" />
        {/* 내 프로필 섹션 */}
        <div className="flex items-center p-4 border-b border-background-border">
          <div className="mr-4">
            <Avatar userName={user?.accountname || ''} size={'md'} />
          </div>
          <div>
            {/* 사용자 이름 */}
            <h2 className="text-xl font-bold">{user?.username || '사용자'}</h2>
            {/* 유저 이름 @어쩌고 이메일 앞부분*/}
            <p className="text-sm text-text-secondary">
              @{user?.accountname || 'accountname'}
            </p>
            {/* 소개글 */}
            <p className="mt-2 text-text-secondary">
              {user?.intro || '소개글 없음'}
            </p>
          </div>
        </div>
        {/* 게시글 섹션 */}
        <div className="">
          {error ? (
            <p className="p-4 text-red-500">{error}</p>
          ) : (
            <div>
              {posts.length === 0 ? (
                <p className="p-4">작성한 게시글이 없습니다.</p>
              ) : (
                posts.map((post: Common.Post) => (
                  <PostCard
                    key={post.id}
                    comment={post.content}
                    onClick={() => {}}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
