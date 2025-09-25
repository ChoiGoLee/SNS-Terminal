import React from 'react'

interface UnreadBadgeProps {
  count: number
}

function Unread({ count }: UnreadBadgeProps): React.JSX.Element | null {
  if (!count || count <= 0) return null

  return (
    <span className="inline-flex items-center justify-center h-3 px-1.5 font-bold rounded-full bg-primary">
      {/* {count > 99 ? '99+' : count} */}
    </span>
  )
}

export default Unread
