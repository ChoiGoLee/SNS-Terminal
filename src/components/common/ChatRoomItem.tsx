import React from 'react'
import Avatar from './Avatar'
import Unread from './Unread'

// JSON 데이터 구조에 맞는 타입 정의
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

interface ChatRoomItemProps {
  room: ChatRoom
  currentUserId: string
  isSelected: boolean
  onClick: () => void
}

export function formatTime(dateString?: string): string {
  if (!dateString) return ''

  const messageDate = new Date(dateString)
  if (isNaN(messageDate.getTime())) return ''

  const now = new Date()
  const diff = Math.floor((now.getTime() - messageDate.getTime()) / 1000)

  if (diff < 60) return `${diff}초 전`
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`

  const days = Math.floor(diff / 86400)
  if (days < 30) return `${days}일 전`

  return messageDate.toLocaleDateString('ko-KR', {
    month: 'numeric',
    day: 'numeric',
  })
}

function ChatRoomItem({
  room,
  currentUserId,
  isSelected,
  onClick,
}: ChatRoomItemProps): React.JSX.Element {
  // 상대방 찾기 (현재 사용자가 아닌 사람)
  const otherUser = room.ChatUsers.find(
    (person: ChatUserSimple) => person.accountname !== currentUserId
  )

  // 마지막 메시지 계산
  const lastMessage =
    room.messages.length > 0
      ? room.messages.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0]
      : null

  // 읽지 않은 메시지 개수 (임시로 랜덤 값, 실제로는 읽음 상태 관리 필요)
  const unreadCount = Math.floor(Math.random() * 3)

  // 채팅방 이름 (상대방이 없으면 모든 참여자 표시)
  const roomName = otherUser
    ? otherUser.accountname
    : room.ChatUsers.map((user) => user.accountname).join(', ')

  return (
    <li>
      <button
        onClick={onClick}
        className={`
          w-full text-left px-4 py-4 flex items-center gap-3 
          hover:bg-background-border border-background-border border-b
          
          ${isSelected ? 'bg-background-border' : 'bg-background-surface'}
        `}
      >
        {/* 아바타 영역 */}
        <div className="flex-shrink-0">
          <Avatar userName={roomName} size="sm" />
        </div>

        {/* 텍스트 영역 */}
        <div className="flex-1 min-w-0">
          {/* 위쪽: 이름과 시간 */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-text-primary font-medium truncate">
              {roomName}
            </span>
            <span className="text-text-primary text-sm ml-2 flex-shrink-0">
              {lastMessage ? formatTime(lastMessage.createdAt) : ''}
            </span>
          </div>

          {/* 아래쪽: 마지막 메시지와 읽지 않은 개수 */}
          <div className="flex items-start justify-between gap-2">
            <p className="text-text-secondary text-sm flex-1 line-clamp-1">
              {lastMessage ? lastMessage.text : '아직 메시지가 없습니다.'}
            </p>
            <Unread count={unreadCount} />
          </div>
        </div>
      </button>
    </li>
  )
}

export default ChatRoomItem
