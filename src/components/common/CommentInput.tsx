import { useState } from 'react'
import Avatar from './Avatar'

interface CommentInputProps {
  userImage?: string
  userName: string
  onSubmit: (coment: string) => void
  placeholder?: string
}

function CommentInput({
  userImage,
  userName,
  onSubmit,
  placeholder = '댓글을 입력하세요.',
}: CommentInputProps) {
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment.trim())
      setComment('')
    }
  }

  const isDisabled = comment.trim() === ''

  return (
    <div className="flex space-x-3">
      <Avatar userImage={userImage} userName={userName} size="sm" />
      <div className="flex-1">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-transparent text-text-primary placeholder-text-secondary resize-none border-none outline-none text-sm"
        />
        <div className="flex justify-end">
          {/* 버튼 컴포넌트 임시 */}
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`px-4 py-1.5 text-sm text-black font-medium rounded-full whitespace-nowrap transition-color ${
              isDisabled
                ? 'bg-primary opacity-50 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-dark cursor-pointer'
            }`}
          >
            댓글
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentInput
