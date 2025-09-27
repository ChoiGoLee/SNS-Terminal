import React, { useEffect, useMemo } from 'react'
import { Header } from '../../components/common/Header'
// import PostCard from '../../components/common/PostCard'
import SearchInput from '../../components/common/SearchInput'
import { useState } from 'react'
import type { Common, PostAPI } from '../../types/api'
import { api } from '../../services/apiWrapper'
import { useInfinityScroll } from '../../hooks/useInfinityScroll'
import PostCard from '../../components/common/PostCard'

function Home(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('')

  const [posts, setPosts] = useState<Common.Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 무한스크롤
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const POSTS_PER_PAGE = 10
  const currentPostsCount = posts.length

  // 필터링된 게시글 계산 (useMemo로 성능 최적화)
  const filteredPosts = useMemo(() => {
    if (!inputValue.trim()) {
      return posts
    }

    const searchTerm = inputValue.toLowerCase().trim()

    return posts.filter((post) => {
      // 게시물의 제목, 내용, 작성자 정보에서 검색
      const searchableFields = [
        post.content,
        post.author?.accountname,
        post.author?.username,
      ].filter(Boolean) // null, undefined 값 제거

      return searchableFields.some((field) =>
        field?.toString().toLowerCase().includes(searchTerm)
      )
    })
  }, [posts, inputValue])

  // ** profile페이지 코드 참고하기 **
  /**
   * TODO
   * PostAPI.GetFeed.Res 연결해서 게시글 목록 불러오기
   * 불러온 게시글 목록을 map 돌려서 PostCard 컴포넌트로 렌더링하기
   * 로딩 중일때 로딩 스피너
   * 에러 났을때 에러 메세지
   *
   * 무한스크롤
   * 로딩중일때 로딩 스피너
   * 다음 페이지 없을때 끝입니다 메세지
   */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    console.log(e.target.value)
  }

  // 게시글 목록 불러오기
  const fetchPosts = async (pageNum = 1) => {
    try {
      setIsLoading(pageNum === 1) // 첫페이지 로딩중
      setIsLoadingMore(pageNum !== 1) // 다음페이지 로딩중

      const res = await api.get<PostAPI.GetAllPosts.Res>(
        `/post?limit=${POSTS_PER_PAGE}&skip=${currentPostsCount}`
      )

      console.log(res)
      if (res.posts.length === 1) {
        setPosts(res.posts)
      } else {
        setPosts((prev) => [...prev, ...res.posts])
        // 게시글 더이상 없을때
      }
      if (res.posts.length === 0) {
        setHasMore(false)
      }
    } catch (error) {
      setError('게시글을 불러오는데 실패했습니다.')
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  // 더 많은 게시글 불러오기
  const loadMorePosts = async () => {
    if (isLoadingMore || !hasMore) return

    const nextPage = page + 1
    setPage(nextPage)
    await fetchPosts(nextPage)
  }

  const { lastContent } = useInfinityScroll({
    onLoadMore: loadMorePosts,
    hasMore,
    isLoading: isLoadingMore,
  })

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    fetchPosts(1)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <div className="mx-auto border-x border-background-border border-r border-l w-[769px]">
          <Header title="홈" />
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-secondary mx-auto mb-6"></div>
              <p className="text-text-secondary">게시글을 불러오는 중...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="border-x border-background-border">
        <Header title="홈" />
        <div className="flex items-center justify-center min-h-96 w-[769px]">
          <div className="text-center">
            <p className="text-red-500 mb-4 ">{error}</p>
            <button
              onClick={() => {
                setError(null)
                setPage(1)
                setHasMore(true)
                fetchPosts(1)
              }}
              className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary-dark"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header title="홈" />

      <SearchInput
        onchange={handleChange}
        value={inputValue}
        placeholder="게시물 검색"
        size="md"
        border={'fullRound'}
        id="text"
        type="All"
      ></SearchInput>

      {/* 게시글 목록 */}
      <div className="feed-container">
        {/* 검색 결과 표시 */}
        {inputValue.trim() && (
          <div className="px-4 py-2 text-sm text-text-secondary border-b border-background-border">
            "{inputValue}" 검색 결과: {filteredPosts.length}개
          </div>
        )}

        {/* 검색 결과가 없거나 게시글이 없을 때 */}
        {filteredPosts.length === 0 && !isLoading ? (
          <div className="text-center py-12 w-[769px]">
            <p className="text-text-secondary">
              {inputValue.trim()
                ? `"${inputValue}"에 대한 검색 결과가 없습니다.`
                : '아직 게시글이 없습니다.'}
            </p>
          </div>
        ) : (
          filteredPosts.map((post, index) => (
            <div
              key={post.id}
              ref={index === filteredPosts.length - 1 ? lastContent : null}
            >
              <PostCard post={post} onClick={() => {}} />
            </div>
          ))
        )}

        {/* 무한스크롤 로딩 인디케이터 - 검색 중이 아닐 때만 표시 */}
        {!inputValue.trim() && isLoadingMore && (
          <div className="text-center py-4">
            {/* 로딩스피너 */}
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-secondary mx-auto mb-6"></div>
            <p className="text-text-secondary text-sm">더 불러오는 중...</p>
          </div>
        )}

        {/* 마지막 메시지 - 검색 중이 아닐 때만 표시 */}
        {!inputValue.trim() && !hasMore && posts.length > 0 && (
          <div className="text-center py-8">
            <p className="text-text-secondary">모든 게시글을 불러왔습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default Home
