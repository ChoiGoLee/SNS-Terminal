import HeartLine from '../../assets/icons/heart-line.svg?react'

interface LikeButtonProps {
  likeCount: number
  isLiked: boolean
  onLike: () => void
}

function LikeButton({ likeCount, isLiked, onLike }: LikeButtonProps) {
  return (
    <button onClick={onLike} className="flex items-center gap-2 p-2 group">
      <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-red-500/10 transition-colors">
        {isLiked ? (
          <img
            src="/icons/heart-fill.svg"
            alt="heart-fill"
            className="w-5 h-5"
          />
        ) : (
          <HeartLine className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
        )}
      </div>
      <span
        className={`text-sm transition-colors ${
          isLiked ? 'text-red-500' : 'text-gray-500 group-hover:text-red-500'
        }`}
      >
        {likeCount}
      </span>
    </button>
  )
}

export default LikeButton
