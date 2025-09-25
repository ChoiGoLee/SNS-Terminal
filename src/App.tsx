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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/follower-feed" element={<FollowerFeed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post-detail" element={<PostDetail />} />
          <Route path="/post-create" element={<PostCreate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:accountname" element={<Profile />} />
          <Route path="/profile-setting" element={<ProfileSetting />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
