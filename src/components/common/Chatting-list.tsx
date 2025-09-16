import React, { useMemo, useState } from 'react'
import Avatar from './Avatar'

export type Participant = {
  id: string
  name: string
  avatarUrl?: string | null
}

export type ChatRoom = {
  id: string
  participants: Participant[]
  lastMessage?: string | null
  lastTimestamp?: string | number
  unreadCount?: number
}

type Props = {
  currentUserId: string
  rooms?: ChatRoom[]
  selectedId?: string | null
  onSelect?: (id: string) => void
}

function formatTime(ts?: string | number | null) {
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

export function ChatList({
  currentUserId,
  rooms = [],
  selectedId = null,
  onSelect,
}: Props) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rooms
    return rooms.filter((room) => {
      const other = room.participants.find((p) => p.id !== currentUserId)
      return (
        other?.name.toLowerCase().includes(q) ||
        (room.lastMessage || '').toLowerCase().includes(q)
      )
    })
  }, [rooms, query, currentUserId])

  return (
    <aside className="w-full bg-background-surface text-white min-h-screen flex flex-col">
      {/* 채팅 목록 */}
      <ul className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <li className="px-4 py-8 text-center text-text-secondary">
            {query ? '검색 결과가 없습니다.' : '채팅이 없습니다.'}
          </li>
        )}

        {filtered.map((room) => {
          const active = room.id === selectedId
          const other = room.participants.find((p) => p.id !== currentUserId)

          return (
            <li key={room.id}>
              <button
                onClick={() => onSelect && onSelect(room.id)}
                className={`
                  w-full text-left px-4 py-4 flex items-center gap-3 
                  hover:bg-background-border border-background-border border-y
                  ${active ? 'bg-background-border' : ''}
                `}
                aria-current={active ? 'true' : undefined}
              >
                {/* 아바타 */}
                <div className="relative flex-shrink-0">
                  {other?.avatarUrl ? (
                    <img
                      src={other.avatarUrl}
                      alt={`${other.name} avatar`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <Avatar userName={other?.name || 'undefined'} size="sm" />
                  )}
                </div>

                {/* 메세지 컨텐츠 */}
                <div className="flex-1 min-w-0 w-80">
                  {/*이름과 시간 */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-text-primary font-medium truncate">
                      {other?.name ?? '알 수 없음'}
                    </span>
                    <span className="text-text-secondary text-sm ml-2 flex-shrink-0">
                      {formatTime(room.lastTimestamp)}
                    </span>
                  </div>

                  {/* 마지막 메시지 / 읽지 않은 개수 */}
                  <div className="flex items-start justify-between gap-2">
                    {/* last메세지 */}
                    <p className="text-text-secondary text-sm flex-1 line-clamp-1 leading-5">
                      {room.lastMessage ?? '아직 메시지가 없습니다.'}
                    </p>

                    {(room.unreadCount ?? 0) > 0 && (
                      <span
                        className="ml-2 inline-flex items-center justify-center 
                                     h-5 px-1.5 
                                     text-xs font-bold rounded-full 
                                     bg-primary text-text-primary flex-shrink-0"
                      >
                        {(room.unreadCount ?? 0) > 99
                          ? '99+'
                          : room.unreadCount ?? 0}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default ChatList

// 더미 데이터
export const sampleRooms: ChatRoom[] = [
  {
    id: '1',
    participants: [
      { id: 'me123', name: '나' },
      {
        id: 'u456',
        name: '박개발',
        avatarUrl: null,
      },
    ],
    lastMessage: 'React Hook Form 사용법에 대해...',
    lastTimestamp: Date.now() - 1000 * 60 * 15, // 15분 전
    unreadCount: 2,
  },
  {
    id: '2',
    participants: [
      { id: 'me123', name: '나' },
      {
        id: 'u789',
        name: '이디자인',
        avatarUrl: null,
      },
    ],
    lastMessage: '프로젝트 리뷰 완료했습니다',
    lastTimestamp: Date.now() - 1000 * 60 * 30, // 30분 전
    unreadCount: 0,
  },
  {
    id: '3',
    participants: [
      { id: 'me123', name: '나' },
      {
        id: 'u101',
        name: '최기획',
        avatarUrl: null,
      },
    ],
    lastMessage: '내일 스터디 모임 어떤가요?',
    lastTimestamp: Date.now() - 1000 * 60 * 60, // 1시간 전
    unreadCount: 1,
  },
  {
    id: '4',
    participants: [
      { id: 'me123', name: '나' },
      {
        id: 'u202',
        name: '김마케팅',
        avatarUrl: null,
      },
    ],
    lastMessage: '런칭 일정 변경 관련해서...',
    lastTimestamp: Date.now() - 1000 * 60 * 60 * 24, // 1일 전
    unreadCount: 0,
  },
  {
    id: '5',
    participants: [
      { id: 'me123', name: '나' },
      {
        id: 'u303',
        name: '한테스터',
        avatarUrl: null,
      },
    ],
    lastMessage:
      '이거 어떻게하는거냐 왜 안되는거냐 내가 넓이값을 지정을 안했네..',
    lastTimestamp: Date.now() - 1000 * 60 * 60 * 10000,
    unreadCount: 5,
  },
]
