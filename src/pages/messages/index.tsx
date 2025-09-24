import React from 'react'
import { useState, useMemo } from 'react'
import ChatRoomList from '../../components/common/ChatRoomList'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import Description from '../../components/common/Description'
import { MessageBubble } from '../../components/common/MessageBubble'
import SearchInput from '../../components/common/SearchInput'
import messageData from './message.json'

interface ChatUserSimple {
  accountname: string
}

interface MessageItem {
  id: string
  sender: string
  text: string
  createdAt: string
}

interface RoomData {
  id: string
  ChatUsers: ChatUserSimple[]
  messages: MessageItem[]
}

interface MessageDataType {
  rooms: RoomData[]
}

function Messages(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  // 현재 로그인한 사용자 (실제로는 context나 props에서 가져와야 함)
  const currentUserId = 'choigolee' // JSON 데이터에 맞게 설정

  const data = messageData as MessageDataType

  // 현재 사용자가 참여한 채팅방들만 필터링
  const filteredRooms = useMemo(() => {
    return data.rooms.filter((room) =>
      room.ChatUsers.some((user) => user.accountname === currentUserId)
    )
  }, [data, currentUserId])

  // 선택된 채팅방의 메시지들
  const currentMessages = useMemo(() => {
    if (!selectedChatId) {
      return []
    }

    const selectedRoom = data.rooms.find((room) => room.id === selectedChatId)
    if (!selectedRoom) {
      return []
    }

    // 메시지를 시간순으로 정렬하고 MessageBubble 형식으로 변환
    return selectedRoom.messages
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .map((msg) => {
        // sender가 현재 사용자인지 확인
        const isMyMessage = msg.sender === currentUserId

        // TODO: username API 호출
        // const senderUsername = await getUsernameByAccountname(msg.sender)

        return {
          id: msg.id,
          type: isMyMessage ? 'me' : ('other' as 'me' | 'other'),
          text: msg.text,
          userName: msg.sender, // 임시로 accountname 사용, 나중에 username으로 변경
          createdAt: msg.createdAt,
        }
      })
  }, [selectedChatId, data, currentUserId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // TODO: username을 가져오는 API 함수
  // const getUsernameByAccountname = async (accountname: string) => {
  //   try {
  //     const response = await api.get(`/user/profile/${accountname}`)
  //     return response.username
  //   } catch (error) {
  //     console.error('Failed to fetch username:', error)
  //     return accountname // fallback to accountname
  //   }
  // }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="sticky top-0 h-screen">
        <SideBar isAuthenticated={true} activeItem="/messages" />
      </div>
      <div className="mx-auto border-background-border border-x">
        <div className="flex ">
          <aside className=" border-background-border border-x overflow-y-scroll max-h-svh">
            <Header title="메시지" buttons={{ add: { show: true } }} />

            <SearchInput
              onchange={handleChange}
              value={inputValue}
              placeholder="채팅하고 싶은 유저를 찾아보세요"
              size="md"
              border={'none'}
              id="user search"
              type="user"
            />

            <ChatRoomList
              currentUserId={currentUserId}
              rooms={filteredRooms}
              selectedId={selectedChatId}
              onSelect={setSelectedChatId}
            />
          </aside>

          {/* 메시지 영역 */}
          <div className="overflow-y-scroll max-h-svh">
            {!selectedChatId ? (
              // 선택된 채팅방이 없을 때
              <Description
                iconType="post"
                title="채팅방을 선택해주세요"
                description="왼쪽에서 대화할 채팅방을 선택하세요"
              />
            ) : currentMessages.length === 0 ? (
              // 선택된 채팅방에 메시지가 없을 때
              <Description
                iconType="post"
                title="아직 메시지가 없습니다"
                description="첫 번째 메시지를 보내보세요"
              />
            ) : (
              // 메시지가 있을 때
              <>
                {currentMessages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    type={msg.type}
                    text={msg.text}
                    userName={msg.userName}
                    createdAt={msg.createdAt}
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
