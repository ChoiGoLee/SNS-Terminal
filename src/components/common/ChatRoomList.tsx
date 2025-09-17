import React, { useState, useMemo } from 'react'
import ChatRoomItem from './ChatRoomItem'

export interface ChatUser {
  id: string
  name: string
  avatarUrl?: string | null
}

export interface ChatRoom {
  id: string
  ChatUsers: ChatUser[]
  lastMessage?: string | null
  lastTimestamp?: string | number
  unreadCount?: number
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
}: ChatRoomListProps) {
  return (
    <aside className="w-full bg-background-surface text-white min-h-screen flex flex-col">
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

export const sampleRooms: ChatRoom[] = [
  {
    id: '1',
    ChatUsers: [
      { id: 'me123', name: '나' },
      { id: 'u456', name: '박개발' },
    ],
    lastMessage: 'React Hook Form 사용법에 대해...',
    lastTimestamp: Date.now() - 1000 * 60 * 15,
    unreadCount: 2,
  },
  {
    id: '2',
    ChatUsers: [
      { id: 'me123', name: '나' },
      { id: 'u789', name: '이디자인' },
    ],
    lastMessage: '프로젝트 리뷰 완료했습니다',
    lastTimestamp: Date.now() - 1000 * 60 * 30,
    unreadCount: 0,
  },
  {
    id: '3',
    ChatUsers: [
      { id: 'me123', name: '나' },
      { id: 'u101', name: '최기획' },
    ],
    lastMessage: '내일 스터디 모임 어떤가요?',
    lastTimestamp: Date.now() - 1000 * 60 * 60,
    unreadCount: 1,
  },
  {
    id: '4',
    ChatUsers: [
      { id: 'me123', name: '나' },
      { id: 'u202', name: '김마케팅' },
    ],
    lastMessage: '런칭 일정 변경 관련해서...',
    lastTimestamp: Date.now() - 1000 * 60 * 60 * 24,
    unreadCount: 0,
  },
  {
    id: '5',
    ChatUsers: [
      { id: 'me123', name: '나' },
      { id: 'u303', name: '한테스터' },
    ],
    lastMessage:
      '이거 어떻게하는거냐 왜 안되는거냐 내가 넓이값을 지정을 안했네..',
    lastTimestamp: Date.now() - 1000 * 60 * 60 * 10000,
    unreadCount: 5,
  },
]
