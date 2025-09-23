import React from 'react'
import { useState } from 'react'
import { sampleRooms } from '../../components/common/ChatRoomList'
import ChatRoomList from '../../components/common/ChatRoomList'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import Description from '../../components/common/Description'
import {
  MessageBubble,
  sampleMessages,
} from '../../components/common/MessageBubble'
import TextInput from '../../components/common/TextInput'
import { useSearchUser } from '../../hooks/useSearchUser'

function Messages(): React.JSX.Element {
  const { users, isLoading, error, searchUsers } = useSearchUser()
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchUsers(selectedChatId)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="sticky top-0 h-screen">
        <SideBar isAuthenticated={true} activeItem="/messages" />
      </div>
      <div className="mx-auto border-background-border border-x">
        <div className="flex ">
          <aside className=" border-background-border border-x overflow-y-scroll max-h-svh">
            <Header title="메시지" buttons={{ add: { show: true } }} />
            <TextInput
              size="lg"
              placeholder="채팅하고 싶은 사용자를 찾아보세요"
              id="유저 검색창"
              label="유저 검색창"
              onchange={(e) => setSelectedChatId(e.target.value)}
            />
            <ChatRoomList
              currentUserId="me123"
              rooms={sampleRooms}
              selectedId={selectedChatId}
              onSelect={setSelectedChatId}
            />
          </aside>
          {/* 메세지가 없을때 */}
          <div className="overflow-y-scroll max-h-svh">
            {sampleMessages.length === 0 ? (
              <Description
                iconType="post"
                title="아직 포스트가 없습니다"
                description="첫 번째 포스트를 작성해보세요"
              />
            ) : (
              <>
                {/* 메세지가 있을때 */}
                {sampleMessages.map((msg) => (
                  <MessageBubble
                    type={msg.type}
                    text={msg.text}
                    userName={msg.userName} // 없으면 기본값 사용
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Messages
