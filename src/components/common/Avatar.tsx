import { useCallback, useState } from 'react'

interface AvatarProps {
  userImage?: string
  userName: string
  size: 'xs' | 'sm' | 'md' | 'lg'
}

const SIZECLASSES = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-10 h-10 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-lg',
} as const

function Avatar({ userImage, userName, size }: AvatarProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleError = useCallback(() => setImageError(true), [])

  return (
    <div
      className={`${
        SIZECLASSES[size]
      } rounded-full flex items-center justify-center font-bold text-black overflow-hidden ${
        userImage && !imageError && imageLoaded ? '' : 'bg-primary'
      }`}
    >
      {userImage && !imageError ? (
        <img
          src={userImage}
          alt={userName}
          className="rounded-full object-cover w-full h-full"
          onError={handleError}
          onLoad={() => setImageLoaded(true)}
        />
      ) : (
        userName.charAt(0)
      )}
    </div>
  )
}

export default Avatar
