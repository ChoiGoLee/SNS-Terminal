import Avatar from './Avatar'
import Markdown from './Markdown'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import UserLevel from './UserLevel'
import { useNavigate } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import type { Common, HeartAPI } from '../../types/api'
import { api } from '../../services/apiWrapper'
import { formatTimeAgo } from '../../utils/timeUtils'
import { API_BASE_URL } from '../../utils/configs'
import { LoadIntroData } from '../../utils/profileStackLoad'

interface PostCardProps {
  /**홈/피드페이지 or 상세페이지 여부**/
  isDetail?: boolean
  // 게시글 더보기 클릭 이벤트 핸들러 함수
  onClick?: () => void
  // api에서 받은 게시글 데이터
  post: Common.Post
}

/**
 *
 * @param {boolean} isDetail - 홈/피드페이지 or 상세페이지 여부
 * @param {function} onClick - 게시글 더보기 클릭 이벤트 핸들러 함수
 * @returns
 */
function PostCard({ isDetail = false, onClick, post }: PostCardProps) {
  const { finalStack } = LoadIntroData(post.author.intro || '')

  const maxHeight = 100

  const navigate = useNavigate()

  // UI 상태
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMoreBtn, setShowMoreBtn] = useState(false)
  const [showGradient, SetShowGradient] = useState(false)
  const commentRef = useRef<HTMLDivElement>(null)

  // API 상태
  const [isLiked, setIsLiked] = useState(post?.hearted ?? false)
  const [likeCount, setLikeCount] = useState(post?.heartCount ?? 0)
  const [isLikeLoading, setIsLikeLoading] = useState(false)

  // 좋아요/좋아요 취소 API 호출
  const handleLike = async () => {
    if (isLikeLoading) return

    setIsLikeLoading(true)

    try {
      if (isLiked) {
        // 좋아요 취소
        const res = await api.delete<HeartAPI.RemoveHeart.Res>(
          `/post/${post.id}/unheart`
        )

        setIsLiked(false)
        setLikeCount(res.post.heartCount)
      } else {
        // 좋아요
        const res = await api.post<HeartAPI.AddHeart.Res>(
          `/post/${post.id}/heart`
        )
        setIsLiked(true)
        setLikeCount(res.post.heartCount)
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error)
    } finally {
      setIsLikeLoading(false)
    }
  }
  // 홈/피드의 게시글일때만 게시글 상세페이지로 이동
  const handlePostClick = () => {
    if (!isDetail) {
      navigate(`/post-detail/${post.id}`)
    }
  }

  // 이벤트 버블링 방지
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick()
  }

  useEffect(() => {
    if (commentRef.current && commentRef.current.scrollHeight > maxHeight) {
      setShowMoreBtn(true)
      SetShowGradient(true)
    } else if (
      commentRef.current &&
      commentRef.current.scrollHeight < maxHeight
    ) {
      setShowMoreBtn(false)
      SetShowGradient(false)
    }
  }, [post])

  return (
    <article
      onClick={handlePostClick}
      className={`bg-background border-background-border max-w-[769px] p-4 transition-colors relative ${
        isDetail ? 'border' : 'cursor-pointer border-b'
      }`}
    >
      <section className="flex space-x-3">
        <Avatar
          userImage={post.author.image}
          userName={post.author.username}
          size="md"
        />
        <section className="flex-1">
          <ul className="flex items-center gap-2 mb-2">
            <li className="text-lg font-bold text-text-primary">
              {post.author.username}
            </li>
            <li>
              <UserLevel level="mid" />
            </li>
            <li className="text-text-secondary text-sm">
              {formatTimeAgo(new Date(post.createdAt).getTime())}
            </li>
          </ul>
          <ul
            className={`${isDetail ? 'flex flex-wrap gap-1 mb-3' : 'hidden'}`}
          >
            {/* 기술스택 표시 */}
            {finalStack.map((stack) => (
              <li
                key={stack}
                className="px-2 py-1 bg-background-surface text-text-secondary text-xs rounded border border-background-border"
              >
                {stack}
              </li>
            ))}
          </ul>

          <div
            className={`${
              !isDetail &&
              (isExpanded ? 'max-h-full' : 'relative max-h-96 overflow-hidden')
            }`}
            ref={commentRef}
          >
            {!isDetail && !isExpanded && showGradient && (
              <div className="absolute bottom-0 left-0 w-full h-36 gradation bg-gradient-to-t from-background z-10"></div>
            )}

            {/* 텍스트 한 줄 처리가 길어질때 줄바꿈 되게 함 */}
            <div className="overflow-hidden break-all">
              <Markdown content={post.content} />
            </div>

            {/* 게시글 이미지 표시 */}
            {post.image && (
              <div className="mt-3">
                <img
                  src={
                    post.image.startsWith('http')
                      ? post.image
                      : `${API_BASE_URL}/${post.image}`
                  }
                  alt="게시글 이미지"
                  className="w-full max-w-md rounded-lg object-cover"
                  onError={(e) => {
                    console.log('게시글 이미지 로드 실패:', post.image)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-center">
            {showMoreBtn && !isDetail && (
              <button
                className="py-2 px-5 transition bg-background-border hover:bg-background-surface text-sm text-text-primary rounded-full"
                onClick={(e) => {
                  setIsExpanded((prevState) => !prevState)
                  handleClick(e)
                }}
              >{`${isExpanded ? '접기' : '더보기'}`}</button>
            )}
          </div>

          <div className={`flex space-x-6 mt-3`}>
            {!isDetail && (
              <>
                <LikeButton
                  likeCount={likeCount}
                  isLiked={isLiked}
                  onLike={handleLike}
                />
                <CommentButton
                  commentCount={post.commentCount}
                  postId={post.id}
                />
              </>
            )}
          </div>
        </section>
      </section>
    </article>
  )
}

export default PostCard
