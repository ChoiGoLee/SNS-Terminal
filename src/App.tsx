import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/home/index'
import Login from './pages/login/index'
import Signup from './pages/signup/index'
import PostDetail from './pages/post-detail/index'
import PostCreate from './pages/post-create/index'
import Profile from './pages/profile/index'
import ProfileSetting from './pages/profile-setting/index'
import Messages from './pages/messages/index'
import Settings from './pages/settings/index'
import FollowerFeed from './pages/follower-feed'
import { useAuth } from './contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'

function App() {
  const { isAuthenticated, isLoading } = useAuth()
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 769)
    }

    // 초기 체크
    checkScreenSize()

    // resize 이벤트 리스너 등록
    window.addEventListener('resize', checkScreenSize)

    // cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-secondary mx-auto mb-6"></div>
          <p className="text-text-secondary">로딩 중...</p>
        </div>
      </div>
    )
  }

  // 769px 미만일 때 보여줄 화면
  if (isSmallScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-6">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-text-primary mb-4">
            데스크톱에서 이용해주세요
          </h1>

          <p className="text-text-secondary mb-6">
            더 나은 경험을 위해 화면 크기가 769px 이상인 기기에서 접속해주세요.
          </p>

          <div className="bg-background-surface border border-background-border rounded-lg p-4 text-left">
            <p className="text-sm text-text-secondary mb-2">
              현재 화면 너비:{' '}
              <span className="font-mono text-primary">
                {window.innerWidth}px
              </span>
            </p>
            <p className="text-sm text-text-secondary">
              필요한 최소 너비:{' '}
              <span className="font-mono text-primary">769px</span>
            </p>
          </div>

          <p className="text-xs text-text-secondary mt-6">
            모바일 버전은 준비 중입니다.
          </p>
        </div>
      </div>
    )
  }

  // 769px 이상일 때 정상 레이아웃
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            // 인증된 사용자용 라우트
            <>
              <Route element={<PageLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/follower-feed" element={<FollowerFeed />} />
                <Route path="/post-detail/:postId" element={<PostDetail />} />
                <Route path="/post-create" element={<PostCreate />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:accountname" element={<Profile />} />
                <Route path="/profile-setting" element={<ProfileSetting />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              {/* 인증된 사용자가 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트 */}
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/signup" element={<Navigate to="/" replace />} />

              {/* 정의되지 않은 경로는 홈으로 리다이렉트 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            // 인증되지 않은 사용자용 라우트
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* 인증되지 않은 사용자가 다른 모든 경로 접근 시 로그인으로 리다이렉트 */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
