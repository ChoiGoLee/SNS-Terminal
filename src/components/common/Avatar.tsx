interface AvatarProps {
  /** user image 주소 */
  userImage?: string
  /** user name 유저 이름 */
  userName: string
  /** 아바타의 크기  */
  size: 'xs' | 'sm' | 'md' | 'lg'
}

const SIZECLASSES = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-10 h-10 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-lg',
} as const

function Avatar({ userImage, userName, size }: AvatarProps) {
  // const [imageError, setImageError] = useState(false)
  // const [imageLoaded, setImageLoaded] = useState(false)
  // const handleError = useCallback(() => setImageError(true), [])

  return (
    <div
      className={`${SIZECLASSES[size]} rounded-full flex items-center justify-center font-bold text-black overflow-hidden bg-primary`}
    >
      {userImage ? (
        <img
          src={userImage}
          alt={userName}
          className="rounded-full object-cover w-full h-full"
          // onError={handleError}
          // onLoad={() => setImageLoaded(true)}
        />
      ) : (
        userName?.charAt(0)
      )}
    </div>
  )
}

export default Avatar
