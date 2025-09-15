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

const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now()
  const seconds = Math.floor((now - timestamp) / 1000)

  if (seconds < 60) {
    return '방금 전'
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes}분 전`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours}시간 전`
  }

  const days = Math.floor(hours / 24)
  return `${days}일 전`
}

export { formatTimeAgo }
