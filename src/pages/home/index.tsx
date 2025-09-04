// src/pages/home/index.tsx
import React, { useState } from 'react'
import LikeButton from '../../components/common/LikeButton'
import CommentButton from '../../components/common/CommentButton'

function HomePage() {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(28)

  const handleLike = () => {
    if (liked) {
      setLiked(false)
      setLikeCount(likeCount - 1)
    } else {
      setLiked(true)
      setLikeCount(likeCount + 1)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">버튼 테스트</h1>

      <div className="flex gap-4">
        <LikeButton likeCount={likeCount} isLiked={liked} onLike={handleLike} />
        <CommentButton commentCount={6} />
      </div>
    </div>
  )
}

export default HomePage
