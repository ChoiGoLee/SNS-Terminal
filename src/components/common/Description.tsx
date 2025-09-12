import TrashIcon from '../../assets/icons/trash.svg?react'
import LogoutIcon from '../../assets/icons/logout.svg?react'
import PostIcon from '../../assets/icons/post.svg?react'
import HeartIcon from '../../assets/icons/heart-line.svg?react'
import CommentIcon from '../../assets/icons/comment.svg?react'

interface ExplainProps {
  iconType: 'resign' | 'logout' | 'post' | 'like' | 'comment' | 'search'
  title: string
  description: string
  buttons?: Array<{
    text: string
    onClick: () => void
    variant: 'primary' | 'secondary' | 'danger'
  }>
  showCard?: boolean
}

//매핑 객체
const ICON_TYPES = {
  resign: { icon: TrashIcon, bgColor: 'bg-red-500' },
  logout: { icon: LogoutIcon, bgColor: 'bg-background-border' },
  post: { icon: PostIcon, bgColor: 'bg-background-border' },
  like: { icon: HeartIcon, bgColor: 'bg-background-border' },
  comment: { icon: CommentIcon, bgColor: 'bg-background-border' },
  search: 'special', // 예외 처리
}

const ICON_IMAGES = {}

function Description() {
  return (
    <div>
      <img src="" />
      <p></p>
    </div>
  )
}

export default Description
