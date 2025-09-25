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
    // 파일 업로드시 미리보기는 blob:http://로 시작
    // 실제 서버에 존재하는게 아니라 내 브라우저 메모리에만 존재하는 파일 주소
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
      {/* 이미지 있는경우와 없는 경우로 압축 ellipse삭제 */}
      {hasImage ? (
        <img
          src={imageUrl}
          alt={userName}
          className="rounded-full object-cover w-full h-full"
        />
      ) : (
        userName?.charAt(0) || '?'
      )}
    </div>
  )
}

export default Avatar
