import React from 'react'
import Avatar from './Avatar'
import UnreadBadge from './Unread'

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

interface ChatRoomItemProps {
  room: ChatRoom
  currentUserId: string
  isSelected: boolean
  onClick: () => void
}

export function formatTime(ts?: string | number | null): string {
  if (!ts) return ''
  const t = typeof ts === 'number' ? new Date(ts) : new Date(ts)
  if (isNaN(t.getTime())) return ''
  const now = new Date()
  const diff = Math.floor((now.getTime() - t.getTime()) / 1000)

  if (diff < 60) return `${diff}초 전`
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`

  const days = Math.floor(diff / 86400)
  if (days < 30) return `${days}일 전`

  return t.toLocaleDateString('ko-KR', {
    month: 'numeric',
    day: 'numeric',
  })
}

function ChatRoomItem({
  room,
  currentUserId,
  isSelected,
  onClick,
}: ChatRoomItemProps) {
  const otherUser = room.ChatUsers.find(
    (person: ChatUser) => person.id !== currentUserId
  )

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
          {otherUser?.avatarUrl ? (
            <img
              src={otherUser.avatarUrl}
              alt={`${otherUser.name} 아바타`}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <Avatar userName={otherUser?.name || '알수없음'} size="sm" />
          )}
        </div>

        {/* 텍스트 영역 */}
        <div className="flex-1 min-w-0">
          {/* 위쪽: 이름과 시간 */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-text-primary font-medium truncate">
              {otherUser?.name || '알 수 없음'}
            </span>
            <span className="text-text-primary text-sm ml-2 flex-shrink-0">
              {formatTime(room.lastTimestamp)}
            </span>
          </div>

          {/* 아래쪽: 마지막 메시지와 읽지 않은 개수 */}
          <div className="flex items-start justify-between gap-2">
            <p className="text-text-secondary text-sm flex-1 line-clamp-1">
              {room.lastMessage || '아직 메시지가 없습니다.'}
            </p>
            <UnreadBadge count={room.unreadCount || 0} />
          </div>
        </div>
      </button>
    </li>
  )
}

export default ChatRoomItem
