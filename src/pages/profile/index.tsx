import type React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import PostCard from '../../components/common/PostCard'
import { useEffect, useState } from 'react'
import { api } from '../../services/apiWrapper'
import type { UserAPI, PostAPI, Common, ProfileAPI } from '../../types/api'
import Avatar from '../../components/common/Avatar'
import { useParams } from 'react-router-dom'
import BaseButton from '../../components/common/BaseButton'

/**
 * todo
 * - [x] 내 정보 가져오기
 * - [x] 특정 유저 정보 가져오기
 * - [x] 특정 유저 게시글 가져오기
 * - [x] 내 프로필과 다른 사람 프로필 구분
 * - [x] 프로필 UI 구현
 * - [x] 게시글 UI 구현
 * - [x] 에러 처리
 * - [x] 로딩스피너 처리
 * - [x] github api 연결?
 * - [x] 팔로우/언팔로우 기능
 * - [ ] 프로필 수정 페이지로 이동 기능
 * - [ ] 게시글 클릭 시 상세 페이지로 이동 기능
 * - [ ] 페이지네이션 또는 무한 스크롤 구현
 */

/**
 * todo
 * 팔로우 상태관리
 * 팔로우 언팔로우 함수
 * 유저 정보에서 팔로우 상태 받아오기
 * 내 프로필 아닐때 팔로우 버튼 보이기
 */

function Profile(): React.JSX.Element {
  // URL 파라미터에서 accountname 추출
  const { accountname } = useParams<{ accountname: string }>()
  const [isLoading, setIsLoading] = useState(true) // 로딩 상태
  const [loginUser, setLoginUser] = useState<Common.User | null>(null) //  로그인된 사용자 정보
  const [profileUser, setProfileUser] = useState<Common.User | null>(null) //  프로필 주인 정보
  const [posts, setPosts] = useState<Common.Post[]>([])
  const [error, setError] = useState<string | null>(null)
  // 팔로우 상태
  const [isFollowing, setIsFollowing] = useState(false)

  // 내 정보 가져오기
  const fetchMyInfo = async () => {
    try {
      const response = await api.get<UserAPI.MyInfo.Res>('/user/myinfo')
      setLoginUser(response.user)
      return response.user
    } catch (err) {
      console.error('사용자 정보 조회 실패:', err)
      setError('사용자 정보를 불러올 수 없습니다.')
      return null
    }
  }
  // 특정 유저 정보 가져오기
  const fetchUserInfo = async (accountname: string) => {
    try {
      const response = await api.get<ProfileAPI.GetProfile.Res>(
        `/profile/${accountname}`
      )
      setProfileUser(response.profile)
      setIsFollowing(response.profile.isfollow) // 팔로우 상태 설정
      return response.profile
    } catch (err) {
      console.error('사용자 정보 조회 실패:', err)
      setError('사용자 정보를 불러올 수 없습니다.')
      return null
    }
  }

  // 특정 유저 게시글 가져오기
  const fetchUserPosts = async (accountname: string) => {
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

  const toggleFollow = async () => {
    if (!profileUser) return
    try {
      if (isFollowing) {
        // 언팔로우
        await api.delete<ProfileAPI.Unfollow.Res>(
          `/profile/${profileUser.accountname}/unfollow`
        )
        setIsFollowing(false)
        // 팔로워 수 업데이트
        setProfileUser({
          ...profileUser,
          followerCount: profileUser.followerCount - 1,
        })
      } else {
        // 팔로우
        await api.post<ProfileAPI.Follow.Res>(
          `/profile/${profileUser.accountname}/follow`
        )
        setIsFollowing(true)
        // 팔로워 수 업데이트
        setProfileUser({
          ...profileUser,
          followerCount: profileUser.followerCount + 1,
        })
      }
    } catch (err) {
      console.error('팔로우/언팔로우 실패:', err)
      setError('팔로우 상태를 변경할 수 없습니다.')
    }
  }

  // 내 프로필인지 판단
  const isMyProfile =
    loginUser &&
    profileUser &&
    loginUser.accountname === profileUser.accountname

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    const loadProfileData = async () => {
      //에러
      setError(null)
      //로딩중인지
      setIsLoading(true)

      // 내 정보 가져오기
      const myData = await fetchMyInfo()
      if (!myData) {
        setIsLoading(false)
        return
      }

      const targetAccountName = accountname || myData.accountname

      if (targetAccountName === myData.accountname) {
        // 내 프로필인 경우
        setProfileUser(myData)
        fetchUserPosts(myData.accountname)
      } else {
        // 다른 사람 프로필인 경우
        const userData = await fetchUserInfo(targetAccountName)
        if (userData) {
          fetchUserPosts(userData.accountname)
        }
      }
      // 로딩 완료
      setIsLoading(false)
    }
    loadProfileData()
  }, [accountname])

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <div className="h-full">
          <SideBar isAuthenticated={true} activeItem="/profile" />
        </div>
        <div className="mx-auto border-x border-background-border border-r border-l min-w-[769px]">
          <Header title="프로필" />
          <div className="flex items-center justify-center min-h-96">
            {/* 로딩 스피너 */}
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-secondary mx-auto mb-6"></div>
              <h3 className="text-lg font-medium text-text-secondary mb-2">
                프로필을 불러오는 중...
              </h3>
              <p className="text-sm text-text-secondary">
                잠시만 기다려 주세요
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen min-w-[769px]">
      <div className="h-full">
        <SideBar isAuthenticated={true} activeItem="/profile" />
      </div>
      <div className="mx-auto border-x border-background-border border-r border-l min-w-[769px]">
        <Header
          title={
            isMyProfile ? '내 프로필' : `${profileUser?.username}님의 프로필`
          }
        />

        {/* 내 프로필 섹션 */}
        <div className="p-6 border-b border-background-border">
          <div className="flex items-start gap-4">
            {/* 프로필 이미지 */}
            <div className="flex-shrink-0">
              <Avatar userName={profileUser?.accountname || ''} size={'md'} />
            </div>

            {/* 사용자 정보 */}
            <div className="flex-1 ">
              {/* 사용자 이름 userName */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-text-primary mb-1">
                  {profileUser?.username || '사용자'}
                </h2>
                {/* 팔로우 버튼 */}
                {!isMyProfile && profileUser && (
                  <div>
                    <BaseButton
                      ariaLabel={isFollowing ? '언팔로우' : '팔로우'}
                      width={'flexWidth'}
                      color={'primary'}
                      size={'sm'}
                      content={isFollowing ? '언팔로우' : '팔로우'}
                      onClick={toggleFollow}
                    />
                  </div>
                )}
              </div>
              {/* 계정명@accountName */}
              <p className="text-sm text-text-secondary mb-3">
                @{profileUser?.accountname || 'accountname'}
              </p>

              {/* 소개글 */}
              <p className="text-text-secondary">
                {profileUser?.intro || '소개글 없음'}
              </p>
              <div className="mt-3 text-sm text-text-secondary">
                <p>
                  {profileUser?.followerCount || 0} 팔로워{' '}
                  {profileUser?.followingCount || 0} 팔로잉
                </p>
              </div>
              {/* 깃허브 잔디 */}
              <div className="mt-4">
                {/* 임의로 accountname 하드코딩 */}
                <img src="https://ghchart.rshah.org/chlwlsgh777" />
              </div>
            </div>
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
