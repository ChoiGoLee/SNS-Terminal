/**
 * 게시물 작성 시간을 기준으로 경과 시간을 계산하여 반환
 *
 * @param {number} timestamp - 작성 시간 (밀리초 단위 타임스탬프)
 * @returns {string} 경과 시간 문자열 ('방금 전', '3분 전', '2시간 전', '5일 전')
 *
 * @example
 * ```tsx
 * const timeAgo = formatTimeAgo(Date.now() - 180000) // 3분 전
 * // 결과: "3분 전"
 * ```
 */

const formatTimeAgo = (timestamp: number | string): string => {
  if (!timestamp) return ''

  const messageDate = new Date(timestamp)
  if (isNaN(messageDate.getTime())) return ''

  const now = new Date()
  const diff = Math.floor((now.getTime() - messageDate.getTime()) / 1000)

  if (0 <= diff && diff < 60) return `${diff}초 전`
  if (0 <= diff && diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (0 <= diff && diff < 86400) return `${Math.floor(diff / 3600)}시간 전`

  const days = Math.floor(diff / 86400)
  if (0 <= diff && days < 30) return `${days}일 전`

  return messageDate.toLocaleDateString('ko-KR', {
    month: 'numeric',
    day: 'numeric',
  })
}

export { formatTimeAgo }
