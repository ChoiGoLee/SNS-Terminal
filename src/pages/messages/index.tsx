import React from 'react'
import { useState } from 'react'
import { sampleRooms } from '../../components/common/ChatRoomList'
import ChatRoomList from '../../components/common/ChatRoomList'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'

function Messages(): React.JSX.Element {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  return (
    <div className="flex min-h-screen">
      <div className="flex">
        <SideBar isAuthenticated={true} activeItem="/messages" />
      </div>
      <div className="mx-auto border-x border-background-border">
        <Header title="메시지" buttons={{ add: { show: true } }} />
        <div className="w-80 border-r border-background-border">
          <ChatRoomList
            currentUserId="me123"
            rooms={sampleRooms}
            selectedId={selectedChatId}
            onSelect={setSelectedChatId}
          />
        </div>
      </div>
    </div>
  )
}
export default Messages
