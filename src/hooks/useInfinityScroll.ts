import { useEffect, useRef, useCallback } from 'react'

interface UseInfinityScrollProps {
  hasMore: boolean
  isLoading: boolean
  onLoadMore: () => void // 단순히 다음 페이지 로드를 알림
}

export const useInfinityScroll = ({
  hasMore,
  isLoading,
  onLoadMore,
}: UseInfinityScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useRef<HTMLDivElement | null>(null)

  // 콜백 메모이제이션
  const handleIntersection = useCallback(() => {
    if (!isLoading && hasMore) {
      onLoadMore()
    }
  }, [isLoading, hasMore, onLoadMore])

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleIntersection()
      }
    })

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [handleIntersection])

  return { lastElementRef }
}
