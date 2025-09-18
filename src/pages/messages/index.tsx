import React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'

function Messages(): React.JSX.Element {
  return (
    <>
      <div className="min-h-30">
        <Header title="메시지" buttons={{ add: { show: true } }} />
        <div>Messages Page</div>
      </div>
      <div className="flex">
        <SideBar isAuthenticated={true} activeItem="/messages" />
      </div>
    </>
  )
}
export default Messages
