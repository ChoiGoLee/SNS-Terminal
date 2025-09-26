import type React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import PostCard from '../../components/common/PostCard'
import { useEffect, useState } from 'react'
import { api } from '../../services/apiWrapper'
import type { UserAPI, PostAPI, Common, ProfileAPI } from '../../types/api'
import Avatar from '../../components/common/Avatar'
import { useNavigate, useParams } from 'react-router-dom'
import BaseButton from '../../components/common/BaseButton'
import UserLevel from '../../components/common/UserLevel'
import { LoadIntroData } from '../../utils/profileStackLoad'

function Profile(): React.JSX.Element {
  // URL 파라미터에서 accountname 추출
  const { accountname } = useParams<{ accountname: string }>()
  const [isLoading, setIsLoading] = useState(true) // 로딩 상태
  const [loginUser, setLoginUser] = useState<Common.User | null>(null) //  로그인된 사용자 정보
  const [profileUser, setProfileUser] = useState<Common.User | null>(null) //  프로필 주인 정보
  const [posts, setPosts] = useState<Common.Post[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isFollowLoading, setIsFollowLoading] = useState(false) // 팔로우 버튼 로딩 상태
  const [isFollowing, setIsFollowing] = useState(false) // 팔로우 상태
  const navigate = useNavigate()

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
      setIsFollowing(response.profile.isfollow ?? false) // 팔로우 상태 설정
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
    if (!profileUser || isFollowLoading) return

    setIsFollowLoading(true) // 버튼 비활성화

    try {
      if (isFollowing) {
        const response = await api.delete<ProfileAPI.Unfollow.Res>(
          `/profile/${profileUser.accountname}/unfollow`
        )
        setIsFollowing(false)
        setProfileUser({
          ...profileUser,
          followerCount: response.profile.followerCount,
        })
      } else {
        const response = await api.post<ProfileAPI.Follow.Res>(
          `/profile/${profileUser.accountname}/follow`
        )
        setIsFollowing(true)
        setProfileUser({
          ...profileUser,
          followerCount: response.profile.followerCount,
        })
      }
    } catch (err) {
      console.error('팔로우/언팔로우 실패:', err)
      setError('팔로우 상태를 변경할 수 없습니다.')
    } finally {
      setIsFollowLoading(false) // 버튼 다시 활성화
    }
  }

  // intro 데이터 파싱을 위한 함수
  const getDisplayData = (profileUser: Common.User | null) => {
    if (!profileUser?.intro) {
      return { displayIntro: '소개글 없음', techStack: [] }
    }

    const { finalIntroduce, finalStack } = LoadIntroData(profileUser.intro)
    return {
      displayIntro: finalIntroduce || '소개글 없음',
      techStack: finalStack,
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
      <div className="flex min-h-screen ">
        <div className="h-full">
          <SideBar activeItem="/profile" />
        </div>
        <div className="mx-auto border-x border-background-border border-r border-">
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

  const { displayIntro, techStack } = getDisplayData(profileUser)

  return (
    <div className="flex min-h-screen">
      <div className="h-full top-0 sticky">
        <SideBar activeItem="/profile" />
      </div>
      <div className="mx-auto border-x border-background-border border-r border-l max-w-[769px] w-full">
        <Header
          title={
            isMyProfile ? '내 프로필' : `${profileUser?.username}님의 프로필`
          }
        />

        {/* 내 프로필 섹션 */}
        <div className="p-6 border-b border-background-border">
          <div className="flex w-full">
            {/* 프로필 이미지 */}
            <div className="flex-shrink-0">
              <div className="flex justify-between">
                <Avatar
                  userImage={profileUser?.image}
                  userName={profileUser?.username || ''}
                  size={'lg'}
                />
                {/* 팔로우 버튼 */}
                {!isMyProfile ? (
                  <div>
                    <BaseButton
                      ariaLabel={isFollowing ? '언팔로우' : '팔로우'}
                      width={'flexWidth'}
                      color={isFollowing ? 'surface' : 'primary'}
                      size={'sm'}
                      content={
                        isFollowLoading
                          ? '처리 중...'
                          : isFollowing
                          ? 'Unfollow'
                          : 'Follow'
                      }
                      onClick={isFollowLoading ? () => {} : toggleFollow}
                    />
                  </div>
                ) : (
                  <div>
                    <BaseButton
                      ariaLabel="프로필 수정"
                      width={'flexWidth'}
                      color={'surface'}
                      size={'sm'}
                      content={'프로필 수정'}
                      onClick={() => {
                        // 프로필 수정 페이지로 이동
                        navigate('/profile-setting')
                      }}
                    />
                  </div>
                )}
              </div>
              {/* 사용자 정보 */}
              <div className="flex-1 mt-4">
                {/* 사용자 이름 userName */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-text-primary mb-1">
                    {profileUser?.username || '사용자'}
                  </h2>
                </div>
              </div>
              {/* 계정명@accountName */}
              <p className="text-sm text-text-secondary mb-3">
                @{profileUser?.accountname || 'accountname'}
              </p>
              {/* 회원 등급 */}
              <div className="flex mb-2 bg-emerald-500/15 border-primary-dark border rounded-full items-center px-4 py-2 w-fit gap-2">
                <UserLevel level={'junior'} />
                <span className="text-primary-dark">주니어 개발자</span>
              </div>
              {/* 소개글 */}
              <div>
                <p className="text-text-secondary mb-3">{displayIntro}</p>
                {techStack.length > 0 && (
                  <div className="mb-3">
                    <h3 className="text-lg text-text-primary mb-2">
                      기술 스택
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3 text-sm text-text-secondary">
                {/* 팔로워 팔로잉 수 */}
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-text-primary">
                    {profileUser?.followerCount || 0}
                  </p>{' '}
                  팔로워
                  <p className="text-lg font-bold text-text-primary">
                    {profileUser?.followingCount || 0}
                  </p>{' '}
                  팔로잉
                </div>
              </div>
              {/* 깃허브 잔디 */}
              <div className=" p-4 mt-4 w-full bg-background-surface border-background-border border-2 rounded-lg">
                <h2>GitHub 활동</h2>
                {/* 임의로 accountname 하드코딩 */}
                <img
                  src="https://ghchart.rshah.org/219138/chlwlsgh777"
                  className="mt-3"
                />
              </div>
            </div>
          </div>
        </div>
        {/* 게시글 섹션 */}
        <div className="w-full">
          <h2 className="text-lg p-4">게시글</h2>
          {error ? (
            <p className="p-4 text-red-500">{error}</p>
          ) : (
            <div>
              {posts.length === 0 ? (
                <p className="p-4">작성한 게시글이 없습니다.</p>
              ) : (
                posts.map((post: Common.Post) => (
                  <PostCard key={post.id} post={post} onClick={() => {}} />
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
