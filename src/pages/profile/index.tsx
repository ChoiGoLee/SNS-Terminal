import type React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import PostCard from '../../components/common/PostCard'
import { useEffect, useState } from 'react'
import { api } from '../../services/apiWrapper'
import type { UserAPI, PostAPI, Common } from '../../types/api'

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
