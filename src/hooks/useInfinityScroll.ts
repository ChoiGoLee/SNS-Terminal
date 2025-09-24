// hooks/useInfinityScroll.ts
import { useEffect, useRef } from 'react'

interface UseInfinityScrollProps {
  onLoadMore: () => void // 더 불러올 때 실행할 함수
  hasMore: boolean // 더 불러올 데이터가 있는지
  isLoading: boolean // 현재 로딩 중인지
}

export const useInfinityScroll = ({
  onLoadMore,
  hasMore,
  isLoading,
}: UseInfinityScrollProps) => {
  // 마지막 요소를 가리킬 ref
  const lastContent = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // 로딩 중이거나 더 불러올 데이터가 없으면 아무것도 안 함
    if (isLoading || !hasMore) return

    // IntersectionObserver 생성
    const observer = new IntersectionObserver((entries) => {
      // 마지막 요소가 화면에 보이면
      if (entries[0].isIntersecting) {
        onLoadMore() // 더 불러오기 실행
      }
    })

    // 마지막 요소 관찰 시작
    if (lastContent.current) {
      observer.observe(lastContent.current)
    }

    // 정리 함수: 컴포넌트 언마운트 시 관찰 중지
    return () => {
      observer.disconnect()
    }
  }, [isLoading, hasMore, onLoadMore])

  return { lastContent }
}
