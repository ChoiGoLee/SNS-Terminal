import { useState } from 'react'
import Avatar from './Avatar'

type Message = 'me' | 'other'

interface MessageBubbleProps {
  type: Message
  text: string
  userName?: string
  createdAt?: string // JSON 데이터의 createdAt 필드 추가
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  type,
  text,
  userName = '알수없는 사용자',
  createdAt,
}) => {
  // 더보기 상태 열림/닫힘
  const [showMore, setShowMore] = useState(false)

  const isLong = text.length > 100

  const displayText = showMore
    ? text
    : text.slice(0, 100) + (isLong ? '...' : '')

  // 시간 포맷팅 함수 (선택사항)
  const formatMessageTime = (dateString?: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  if (type === 'other') {
    return (
      <div className="flex pt-4 pb-2 gap-3">
        <Avatar userName={userName} size={'md'} />
        <div className="flex flex-col gap-2">
          <div className="bg-background-border rounded-2xl w-auto max-w-64 py-3">
            <p className="px-4">{displayText}</p>
            {isLong && (
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-[#A7A7A7] text-sm mt-4 text-end w-full border-t-[1px] pt-3 border-t-[#505050] px-4"
              >
                {showMore ? '접기' : '더보기'}
              </button>
            )}
          </div>

          {/* 시간 표시 (선택사항) */}
          {createdAt && (
            <div className="w-full flex justify-start px-4 mt-1 text-xs text-[#A7A7A7]">
              {formatMessageTime(createdAt)}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (type === 'me') {
    return (
      <div className="flex flex-col items-end pt-4 pb-2 gap-2">
        <div className="bg-primary rounded-2xl w-full max-w-64 py-3 text-black">
          <p className="px-4">{displayText}</p>
          {isLong && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-[#445640] text-sm mt-4 text-end w-full border-t-[1px] pt-3 border-t-[#505050] px-4"
            >
              {showMore ? '접기' : '더보기'}
            </button>
          )}
        </div>
        {/* 시간 표시 (선택사항) */}
        {createdAt && (
          <div className="px-4 mt-1 text-xs text-[#445640] text-right">
            {formatMessageTime(createdAt)}
          </div>
        )}
      </div>
    )
  }
  return null
}
