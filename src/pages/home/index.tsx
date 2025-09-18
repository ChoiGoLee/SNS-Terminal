import React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import Description from '../../components/common/Description'
import {
  MessageBubble,
  sampleMessages,
} from '../../components/common/MessageBubble'

function Home(): React.JSX.Element {
  return (
    <div className="flex min-h-screen">
      <div className="h-full">
        <SideBar isAuthenticated={true} activeItem="/" />
      </div>
      <div className="mx-auto border-x border-background-border border-r border-l">
        <Header title="홈" />
      </div>
    </div>
  )
}
export default Home
