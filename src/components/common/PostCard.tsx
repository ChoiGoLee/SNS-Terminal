interface PostCardProps {
  post: {
    id: string
    content: string
    image?: string
    createdAt: string
    hearted: boolean
    heartCount: number
    commentCount: number
    author: {
      _id: string
      username: number
      accountname: number
      image: string
    }
  }
  onLike: () => void
  onPostClick: () => void
}

function PostCard({ post, onLike, onPostClick }) {
  const handleLike = (e) => {
    e.stopPropagation()
    onLike()
  }

  return (
    <article onClick={onPostClick}>
      <div className="flex space-x-3">
        <div className="flex-1"></div>
      </div>
    </article>
  )
}
