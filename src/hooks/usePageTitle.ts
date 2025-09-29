import { useEffect, useState } from 'react'

/**
 * 페이지별 메타태그(title) 생성 훅
 * @param initialTitle - 페이지 타이틀
 * @returns 타이틀 업데이트 세터함수
 */

export function useTitle(initialTitle: string) {
  const [title, setTitle] = useState(initialTitle)

  const updateTitle = () => {
    document.title = title
  }

  // useEffect가 마운트될때 title은 props로 전달된 new title
  useEffect(updateTitle, [title])
  return setTitle
}
