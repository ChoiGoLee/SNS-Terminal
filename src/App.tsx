import { Route, Routes, BrowserRouter } from 'react-router-dom'
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

function App() {
  const { isAuthenticated, isLoading } = useAuth()
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
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            // 인증된 사용자용 라우트
            <>
              <Route path="/" element={<Home />} />
              <Route path="/follower-feed" element={<FollowerFeed />} />
              <Route path="/post-detail/:postId" element={<PostDetail />} />
              <Route path="/post-create" element={<PostCreate />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:accountname" element={<Profile />} />
              <Route path="/profile-setting" element={<ProfileSetting />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />

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
