import React from 'react'
import ChatRoomItem from './ChatRoomItem'

// JSON 데이터 구조에 맞는 타입 정의 (ChatRoomItem과 동일)
export interface ChatUserSimple {
  accountname: string
}

export interface MessageItem {
  id: string
  sender: string
  text: string
  createdAt: string
}

export interface ChatRoom {
  id: string
  ChatUsers: ChatUserSimple[]
  messages: MessageItem[]
}

interface ChatRoomListProps {
  currentUserId: string
  rooms: ChatRoom[]
  selectedId?: string | null
  onSelect?: (id: string) => void
}

function ChatRoomList({
  currentUserId,
  rooms = [],
  selectedId = null,
  onSelect,
}: ChatRoomListProps): React.JSX.Element {
  return (
    <aside className="w-[300px] bg-background-surface text-white flex flex-col">
      {/* 채팅 목록 */}
      <ul className="flex-1 overflow-y-auto">
        {rooms.length === 0 ? (
          <li className="px-4 py-8 text-center text-text-secondary">
            채팅이 없습니다.
          </li>
        ) : (
          rooms.map((room: ChatRoom) => (
            <ChatRoomItem
              key={room.id}
              room={room}
              currentUserId={currentUserId}
              isSelected={room.id === selectedId}
              onClick={() => onSelect?.(room.id)}
            />
          ))
        )}
      </ul>
    </aside>
  )
}

export default ChatRoomList
