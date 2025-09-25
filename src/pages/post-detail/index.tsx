import React, { useEffect, useState } from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import PostCard from '../../components/common/PostCard'
import { api } from '../../services/apiWrapper'
import type { PostAPI, CommentAPI } from '../../types/api'
// import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentInput from '../../components/common/CommentInput'
import CommentItem from '../../components/common/CommentItem'

function PostDetail(): React.JSX.Element {
  // 상태관리
  const [postData, setPostData] = useState<any>(null) // 초기값: 데이터 없음
  // const [commentInput, setCommentInput] = useState('')
  const [commentList, setCommentList] = useState<any[]>([])

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

      setPostData(response.post)
    } catch (error) {
      console.error('게시글 불러오기를 실패했습니다.', error)
      alert('게시글 불러오기를 실패했습니다.')
    }
  }

  console.log('저장된 postData:', postData)

  // 댓글 작성
  const handleCommentSubmit = async (commentText: string): Promise<void> => {
    console.log('받은 댓글 내용:', commentText) // 추가
    console.log('댓글 길이:', commentText.length) // 추가
    console.log('trim 후:', commentText.trim()) // 추가

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
      const response = await api.get(`/post/${postId}/comments`)

      setCommentList(response.comments || []) // 댓글이 없는 경우 고려
      console.log('댓글 목록 로딩에 성공하였습니다.', response)
    } catch (error) {
      console.error('댓글 목록 로딩에 실패했습니다.', error)
      alert('댓글 목록 불러오기를 실패했습니다.')
    }
  }

  // 게시글 목록 가져오는 테스트 함수 추가
  const testGetPosts = async () => {
    try {
      const response = await api.get('/post') // 전체 게시글
      console.log('전체 게시글 목록:', response)
      // 여기서 실제 ID들을 확인할 수 있어
    } catch (error) {
      console.error('게시글 목록 가져오기 실패:', error)
    }
  }

  // 첫 마운트시,postid가 바뀔때만 랜더링
  useEffect(() => {
    handlePostLoad()
    handleCommentList()
    testGetPosts()
  }, [postId])

  return (
    <>
      {/* 개발자 테스트 도구 - 나중에 삭제 예정 */}
      <div
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: '#fff',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 1000,
          fontSize: '12px',
          color: '#000',
        }}
      >
        <h4 style={{ margin: '0 0 8px 0' }}>테스트용 게시글들</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            onClick={() =>
              (window.location.href = `/post-detail/68d3e23ec93d7c81614c37fd`)
            }
            style={{ padding: '4px 8px', fontSize: '11px' }}
          >
            게시글 1 (현재)
          </button>
          {/* testGetPosts()에서 확인한 다른 ID들 추가 */}
          <button
            onClick={() => (window.location.href = `/post-detail/다른ID`)}
            style={{ padding: '4px 8px', fontSize: '11px' }}
          >
            게시글 2
          </button>
        </div>
      </div>
      <div className="min-h-30">
        <Header title="포스트" buttons={{ back: { show: true } }} />
      </div>
      <div className="flex">
        <SideBar isAuthenticated={true} activeItem="/" />
        <div>Post Detail Page</div>
        <section className="flex flex-col">
          <PostCard
            isDetail={true}
            comment={postData?.content || '로딩 중...'} //null인지,데이터인지 맞춰서 값을 반환
            onClick={() => {}}
          />
          <div className="p-4 border-b border-x border-background-border">
            <CommentInput
              userName="김개발자" // 임시 하드코딩
              userImage="https://picsum.photos/40/40" // 임시 이미지
              onSubmit={handleCommentSubmit}
            />
          </div>
          <div className="p-4 border-b border-x border-background-border font-bold">
            댓글 {commentList.length} 개
          </div>
          <div className="border-b border-x border-background-border">
            {commentList.map((comment) => (
              <CommentItem
                key={comment.id}
                userName={comment.author.username}
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
