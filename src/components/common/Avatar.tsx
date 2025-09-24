import { API_BASE_URL } from '../../utils/configs'

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
  // 이미지 있는지 확인
  const hasImage = userImage && userImage !== '' && userImage !== '/Ellipse.png'

  // 가져올 이미지 주소
  let imageUrl = ''
  if (hasImage) {
    if (userImage?.startsWith('http') || userImage?.startsWith('blob:')) {
      imageUrl = userImage
    } else {
      imageUrl = `${API_BASE_URL.replace(/\/$/, '')}/${userImage.replace(
        /^\//,
        ''
      )}`
    }
  }

  return (
    <div
      className={`${SIZECLASSES[size]} rounded-full flex items-center justify-center font-bold text-black overflow-hidden bg-primary leading-none`}
    >
      {userImage ? (
        userImage === '/Ellipse.png' ? (
          userName?.charAt(0)
        ) : (
          <img
            src={imageUrl}
            alt={userName}
            className="rounded-full object-cover w-full h-full"
          />
        )
      ) : (
        userName?.charAt(0)
      )}
    </div>
  )
}

export default Avatar
