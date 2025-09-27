import React, { useEffect, useState } from 'react'
import { Header } from '../../components/common/Header'
import PostCard from '../../components/common/PostCard'
import { api } from '../../services/apiWrapper'
import type {
  Common,
  PostAPI,
  CommentAPI,
  UserAPI,
  HeartAPI,
} from '../../types/api'
import { useParams } from 'react-router-dom'
import CommentInput from '../../components/common/CommentInput'
import CommentItem from '../../components/common/CommentItem'
import LikeButton from '../../components/common/LikeButton'
import { formatFullTimeAgo } from '../../utils/timeUtils'

function PostDetail(): React.JSX.Element {
  // useParams로 url의 파라미터 값 가져오기
  const { postId } = useParams()
  // console.log('게시글 id:', postId)

  // 상태관리
  const [postData, setPostData] = useState<Common.Post | null>(null)
  const [commentList, setCommentList] = useState<Common.Comment[]>([])
  const [userData, setUserData] = useState<Common.User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLiked, setIsLiked] = useState(postData?.hearted ?? false)
  const [likeCount, setLikeCount] = useState(postData?.heartCount ?? 0)
  const [isLikeLoading, setIsLikeLoading] = useState(false)

  // 첫 마운트시,postid가 바뀔때만 랜더링
  useEffect(() => {
    handlePostLoad()
    handleCommentList()
    handleMyInfoLoad()
    window.scrollTo(0, 0) // 페이지 진입시 최상단으로
  }, [postId])

  // 게시글 데이터가 로딩되면 좋아요가 결정되게
  useEffect(() => {
    if (postData) {
      setIsLiked(postData.hearted ? postData.hearted : false)
      setLikeCount(postData.heartCount ? postData.heartCount : 0)
      console.log('초기 좋아요 상태:', postData.hearted, postData.heartCount)
    }
  }, [postData])

  // 좋아요/좋아요 취소 API 호출
  const handleLike = async () => {
    if (isLikeLoading) return

    setIsLikeLoading(true)

    try {
      if (isLiked) {
        const res = await api.delete<HeartAPI.RemoveHeart.Res>(
          `/post/${postId}/unheart`
        )
        setIsLiked(false)
        setLikeCount(res.post.heartCount)
        console.log('취소 후 setIsLiked(false) 호출')
      } else {
        // 좋아요
        const res = await api.post<HeartAPI.AddHeart.Res>(
          `/post/${postId}/heart`
        )
        setIsLiked(true)
        setLikeCount(res.post.heartCount)
        console.log('추가 후 setIsLiked(true) 호출')
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error)
    } finally {
      setIsLikeLoading(false)
    }
  }

  // 특정 게시글 불러오기
  const handlePostLoad = async (): Promise<void> => {
    try {
      const response: PostAPI.GetUserPosts.Res = await api.get(
        `/post/${postId}`
      )
      console.log('게시글 데이터:', response)

      setPostData(
        Array.isArray(response.post) ? response.post[0] : response.post
      )
    } catch (error) {
      console.error('게시글 불러오기를 실패했습니다.', error)
      alert('게시글 불러오기를 실패했습니다.')
    }
  }

  // 유저 정보 불러오기
  const handleMyInfoLoad = async (): Promise<void> => {
    try {
      const response: UserAPI.MyInfo.Res = await api.get('/user/myinfo')

      if (response.user) {
        setUserData(response.user)
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error('내 정보 불러오기 실패:', error)
      setIsLoggedIn(false)
    }
  }

  console.log('저장된 postData:', postData)

  // 댓글 작성
  const handleCommentSubmit = async (commentText: string): Promise<void> => {
    try {
      const response: CommentAPI.CreateComment.Res = await api.post(
        `/post/${postId}/comments`,
        {
          comment: {
            content: commentText,
          },
        }
      )

      console.log('댓글 작성에 성공하였습니다.', response)

      // 댓글 작성 후 목록 새로고침 추가
      await handleCommentList()
    } catch (error) {
      console.error('댓글 작성에 실패했습니다.', error)
      alert('댓글 작성에 실패했습니다.')
    }
  }

  // 댓글 목록
  const handleCommentList = async (): Promise<void> => {
    try {
      const response: CommentAPI.GetComments.Res = await api.get(
        `/post/${postId}/comments`
      )

      setCommentList(response.comments || []) // 댓글이 없는 경우 고려
      // console.log('댓글 목록 로딩에 성공하였습니다.', response)
    } catch (error) {
      console.error('댓글 목록 로딩에 실패했습니다.', error)
      alert('댓글 목록 불러오기를 실패했습니다.')
    }
  }

  return (
    <>
      <Header title="포스트" buttons={{ back: { show: true } }} />
      <div className="flex">
        <section className="flex flex-col mx-auto min-w-[769px]">
          {postData ? (
            <PostCard isDetail={true} post={postData} /> // 전체 데이터 받아올 수 있게 수정
          ) : (
            <div className="p-4 text-center">로딩 중...</div>
          )}

          <div className="p-4 border-b border-x border-background-border flex items-center justify-between font-bold">
            <LikeButton
              likeCount={likeCount}
              isLiked={isLiked}
              onLike={handleLike}
            />
            <p className="text-text-secondary text-sm font-medium border-background-border">
              {postData &&
                formatFullTimeAgo(new Date(postData.createdAt).getTime())}
            </p>
          </div>
          <div className="p-4 border-b border-x border-background-border flex justify-between  items-center font-bold">
            <div className="flex items-center gap-4">
              <span>댓글 {commentList.length} 개</span>
            </div>
          </div>

          <div className="p-4 border-b border-x border-background-border">
            {isLoggedIn && userData ? (
              <CommentInput
                userName={userData.username}
                userImage={userData.image}
                onSubmit={handleCommentSubmit}
              />
            ) : (
              <div className="text-center text-text-secondary py-4">
                댓글을 작성하시려면 로그인 해주세요.
              </div>
            )}
          </div>
          <div className="border-b border-x border-background-border">
            {commentList.map((comment) => (
              <CommentItem
                key={comment.id}
                userName={comment.author.username}
                userImage={comment.author.image}
                level="senior"
                content={comment.content}
                createdAt={new Date(comment.createdAt).getTime()}
                onLikeToggle={() => console.log('좋아요')}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
export default PostDetail
