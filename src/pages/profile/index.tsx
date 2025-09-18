import type React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'

function Profile(): React.JSX.Element {
  return (
    <>
      <div className="min-h-30">
        <Header title="프로필" buttons={{ back: { show: true } }} />
      </div>
      <div className="flex">
        <SideBar isAuthenticated={true} activeItem="/profile" />
        <div>Profile Page</div>
      </div>
    </>
  )
}
export default Profile
