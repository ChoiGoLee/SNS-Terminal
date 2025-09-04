interface LikeButtonProps {
  likeCount: number
  isLiked: boolean
  onLike: () => void
}

function LikeButton({ likeCount, isLiked, onLike }: LikeButtonProps) {
  const handleClick = () => {
    onLike()
  }

  return (
    <button onClick={handleClick} className="flex items-center gap-2 p-2 group">
      <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-red-500/10 transition-colors">
        <span>{isLiked ? '❤️' : '🤍'}</span>
      </div>
      <span className="text-sm group-hover:text-red-500 transition-colors">
        {likeCount}
      </span>
    </button>
  )
}

export default LikeButton
