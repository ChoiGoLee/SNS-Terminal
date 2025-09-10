interface AvatarProps {
  userImage?: string
  userName: string
  size: 'xs' | 'sm' | 'md' | 'lg'
}

function Avatar({ userImage, userName, size }: AvatarProps) {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-primary flex items-center justify-center font-bold text-black overflow-hidden`}
    >
      {userImage ? (
        <img
          src={userImage}
          className="rounded-full object-cover w-full h-full"
        />
      ) : (
        userName.charAt(0)
      )}
    </div>
  )
}

export default Avatar
