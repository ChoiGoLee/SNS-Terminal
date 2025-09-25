import React, { useEffect, useState } from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import PostCard from '../../components/common/PostCard'
import { api } from '../../services/apiWrapper'
import type { Common, PostAPI, CommentAPI, UserAPI } from '../../types/api'
// import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentInput from '../../components/common/CommentInput'
import CommentItem from '../../components/common/CommentItem'

function PostDetail(): React.JSX.Element {
  // 상태관리
  const [postData, setPostData] = useState<Common.Post | null>(null)
  const [commentList, setCommentList] = useState<Common.Comment[]>([])
  const [userData, setUserData] = useState<Common.User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // useParams로 url의 파라미터 값 가져오기
  const { postId } = useParams()
  console.log('게시글 id:', postId)

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
        console.log('내 정보:', response.user)
        console.log('게시글 id:', postId)
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
      console.log('댓글 목록 로딩에 성공하였습니다.', response)
    } catch (error) {
      console.error('댓글 목록 로딩에 실패했습니다.', error)
      alert('댓글 목록 불러오기를 실패했습니다.')
    }
  }

  const testGetPosts = async () => {
    try {
      const response: any = await api.get('/post') // 타입 제거하고 실제 구조 확인
      console.log('전체 게시글 목록:', response)

      // 실제 응답 구조에 맞게 수정 (이미지에서 봤듯이 posts 배열)
      if (response.posts && response.posts.length > 0) {
        const postIds = response.posts.map((post) => post.id)
        console.log('사용 가능한 게시글 ID들:', postIds)

        // 각 게시글의 간단한 정보도 표시
        response.posts.forEach((post, index) => {
          console.log(
            `${index}: ID=${post.id}, 내용="${post.content.slice(0, 20)}..."`
          )
        })
      }
    } catch (error) {
      console.error('게시글 목록 가져오기 실패:', error)
    }
  }

  // 첫 마운트시,postid가 바뀔때만 랜더링
  useEffect(() => {
    handlePostLoad()
    handleCommentList()
    handleMyInfoLoad()
    testGetPosts()
  }, [postId])

  return (
    <>
      <div className="min-h-30">
        <Header title="포스트" buttons={{ back: { show: true } }} />
      </div>
      <div className="flex">
        <SideBar isAuthenticated={true} activeItem="/" />
        <section className="flex flex-col mx-auto min-w-[769px]">
          {postData ? (
            <PostCard isDetail={true} post={postData} /> // 전체 데이터 받아올 수 있게 수정
          ) : (
            <div className="p-4 text-center">로딩 중...</div>
          )}

          <div className="p-4 border-b border-x border-background-border font-bold"></div>
          <div className="p-4 border-b border-x border-background-border font-bold">
            댓글 {commentList.length} 개
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
