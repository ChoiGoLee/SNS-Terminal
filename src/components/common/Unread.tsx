import React from 'react'

interface UnreadBadgeProps {
  count: number
}

function Unread({ count }: UnreadBadgeProps) {
  if (!count || count <= 0) return null

  return (
    <span className="ml-2 inline-flex items-center justify-center h-5 px-1.5 text-xs font-bold rounded-full bg-primary text-white flex-shrink-0">
      {count > 99 ? '99+' : count}
    </span>
  )
}

export default Unread
