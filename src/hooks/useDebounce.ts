import { useEffect, useState } from 'react'

/**
 * useDebounce 훅
 * @param value - 디바운스 처리할 값
 * @param delay - 지연 시간(ms)
 * @returns 지연이 끝난 후 최종 값
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 값이 바뀔 때마다 기존 타이머를 클리어 -> 새 타이머 등록
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
