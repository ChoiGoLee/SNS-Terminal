import { useState } from 'react'
import Avatar from './Avatar'

interface CommentInputProps {
  userImage?: string
  userName: string
  onSubmit: (coment: string) => void
  placeholder?: string
}

/**
 * 댓글 작성을 위한 입력 컴포넌트
 * 사용자 프로필(Avatar),댓글을 작성할 수 있는 textarea와 댓글작성 버튼
 *
 * @example
 * ```tsx
 * const handleCommentSubmit = (comment: string) => {
 *   console.log('댓글 제출:', comment)
 * }
 *
 * <CommentInput
 *   userName="김개발자"
 *   userImage="https://example.com/avatar.jpg"
 *   onSubmit={handleCommentSubmit}
 * />
 * ```
 */
function CommentInput({
  userImage,
  userName,
  onSubmit,
  placeholder = '댓글을 입력하세요.',
}: CommentInputProps) {
  const [comment, setComment] = useState('')

  /**
   * 댓글 제출 처리 함수
   * 빈 문자열이 아닌 경우에만 onSubmit 호출하고 입력창 초기화
   */
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
          {/* 버튼 컴포넌트 교체 예정 */}
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
