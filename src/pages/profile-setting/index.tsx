import React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'

function ProfileSetting(): React.JSX.Element {
  return (
    <>
      <div className="min-h-30">
        <Header title="프로필 편집" buttons={{ back: { show: true } }} />
      </div>
      <div className="flex">
        <SideBar isAuthenticated={true} activeItem="/settings" />
        <div>Profile Setting Page</div>
      </div>
    </>
  )
}
export default ProfileSetting
