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
import { getImageClass, getImageLayout } from '../../utils/getImageLayout'

interface PostCardProps {
  /**홈/피드페이지 or 상세페이지 여부**/
  isDetail?: boolean
  // api에서 받은 게시글 데이터
  post: Common.Post
}

/**
 *
 * @param {boolean} isDetail - 홈/피드페이지 or 상세페이지 여부
 * @returns
 */
function PostCard({ isDetail = false, post }: PostCardProps) {
  const maxHeight = 300

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

  // 게시글 유형 아이콘 타입
  const POST_TYPE_ICONS = {
    일반: '/icons/daily-fill.svg',
    개발: '/icons/tag-fill.svg',
    헬프: '/icons/question-fill.svg',
    테크: '/icons/stack-fill.svg',
    프로젝트: '/icons/folder-fill.svg',
    학습: '/icons/study-fill.svg',
  } as const

  const getPostTypeIcon = (postType: string) => {
    return POST_TYPE_ICONS[postType as keyof typeof POST_TYPE_ICONS]
  }

  // 게시물 컨텐츠, 메타 정보 분리 함수
  const parsePostContent = (content: string) => {
    // 본문과 메타 정보 'Φ$'로 분리
    const [mainContent, metaData] = content.split('Φ$')

    // 메타 정보가 없을때 일반 컨텐츠만 노출되게 함
    if (!metaData) {
      return {
        content: mainContent,
        postType: null,
        hashtags: [] as string[], // 빈 []은 undefined 타입 경고가 떠서 문자값 배열로 타입 지정
      }
    }

    // 게시물 타입과 해시태그를 '¶$'로 분리
    const [postType, hashTagString] = metaData.split('¶$')

    // 해시태그 조건(','로 분리,공백없음,글자수 존재)
    const hashtags = hashTagString
      ? hashTagString
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : []

    return {
      content: mainContent,
      postType: postType || null,
      hashtags,
    }
  }

  // 위에서 파싱된 데이터
  const postMeta = parsePostContent(post.content)

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
    console.log('PostCard 클릭됨!', post.id)
    console.log('isDetail:', isDetail)

    if (!isDetail) {
      console.log('navigate 호출:', `/post-detail/${post.id}`)
      navigate(`/post-detail/${post.id}`)
    }
  }

  // 이벤트 버블링 방지
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (commentRef.current && commentRef.current.offsetHeight > maxHeight) {
        setShowMoreBtn(true)
        SetShowGradient(true)
      } else if (
        commentRef.current &&
        commentRef.current.offsetHeight < maxHeight
      ) {
        setShowMoreBtn(false)
        SetShowGradient(false)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [post.content])

  return (
    <article
      onClick={handlePostClick}
      className={`bg-background border-background-border p-5 transition-colors relative ${
        isDetail ? 'border' : 'cursor-pointer border-b'
      }`}
    >
      <section className="flex-1 max-w-[769px]">
        <ul className="flex items-center relative mb-3">
          <li className="flex flex-1 items-center gap-1 max-w-[80%]">
            <div className="flex-none">
              <Avatar
                userImage={post.author.image}
                userName={post.author.username}
                size="md"
                accountName={post?.author?.accountname}
              />
            </div>
            <div className="mx-2 text-lg font-bold text-text-primary line-clamp-1 truncate max-w-[80%]">
              {post.author.username}
            </div>
            <UserLevel level="mid" />

            {/* 게시글 상세페이지에서만 나오게(createdAt이 api - 게시글 전체보기에 없음) */}
            {isDetail && (
              <div className="ml-1 text-text-secondary text-sm whitespace-nowrap">
                {formatTimeAgo(new Date(post.createdAt).getTime())}
              </div>
            )}
          </li>
          {/* 게시글 유형 */}
          {postMeta.postType && (
            <li className="mt-4 mb-8 absolute right-0 top-0">
              <span className="px-3 py-2 border-primary text-primary border rounded-full text-xs font-medium flex gap-1">
                <img
                  src={getPostTypeIcon(postMeta.postType)}
                  alt={postMeta.postType}
                />
                {postMeta.postType}
              </span>
            </li>
          )}
        </ul>

        <div
          className={`${
            !isDetail &&
            (isExpanded
              ? 'max-h-full ml-16'
              : 'relative max-h-96 overflow-hidden ml-16')
          }`}
          ref={commentRef}
        >
          {!isDetail && !isExpanded && showGradient && (
            <div className="absolute bottom-0 left-0 w-full h-36 gradation bg-gradient-to-t from-background z-10"></div>
          )}

          {/* 해시태그 */}
          {postMeta.hashtags.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                {postMeta.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-primary text-sm hover:text-primary-dark cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 텍스트 한 줄 처리가 길어질때 줄바꿈 되게 함 */}
          <div className="overflow-hidden break-all">
            <Markdown content={postMeta.content} />
          </div>
          {post.image && (
            <div className={`grid gap-2 ${getImageLayout(post.image)}`}>
              {post.image.split(',').map((imageUrl, index) => (
                <img
                  key={index}
                  src={
                    imageUrl.trim().startsWith('http')
                      ? imageUrl
                      : `${API_BASE_URL}/${imageUrl.trim()}`
                  }
                  alt="게시글 이미지"
                  className={`w-full rounded-lg object-cover ${getImageClass(
                    index,
                    post.image
                  )}`}
                  onLoad={() => {
                    // 이미지 로드 후 높이 재계산
                    if (
                      commentRef.current &&
                      commentRef.current.offsetHeight > maxHeight
                    ) {
                      setShowMoreBtn(true)
                      SetShowGradient(true)
                    }
                  }}
                  onError={(e) => {
                    console.log('게시글 이미지 로드 실패:', post.image)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ))}
            </div>
          )}
        </div>
        {showMoreBtn && !isDetail && (
          <div className="flex justify-center mt-8">
            <button
              className={`py-2 px-5 transition text-sm text-text-primary rounded-full ${
                isExpanded
                  ? 'py-2 px-5 bg-background-border text-sm hover:bg-background-surface'
                  : 'bg-background-border hover:bg-background-surface'
              }`}
              onClick={(e) => {
                setIsExpanded((prevState) => !prevState)
                handleClick(e)
              }}
            >{`${isExpanded ? '접기' : '더보기'}`}</button>
          </div>
        )}

        <div className={`flex space-x-6 mt-2`}>
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
    </article>
  )
}

export default PostCard
