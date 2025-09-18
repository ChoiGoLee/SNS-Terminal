import React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'

function Settings(): React.JSX.Element {
  return (
    <>
      <div className="min-h-30">
        <Header title="설정" />
        <div className="flex">
          <SideBar isAuthenticated={true} activeItem="/settings" />
          <div>Settings Page</div>
        </div>
      </div>
    </>
  )
}
export default Settings
