/**
 *
 * 게시물 이미지 개수에 따라 변하는 그리드 레이아웃 클래스
 * @param {string} images - 쉼표로 구분한 이미지 문자열(URL)
 * @returns {string} 테일윈드 그리드 클래스
 *
 */

const getImageLayout = (images: string): string => {
  const imageCount = images.split(',').length

  switch (imageCount) {
    case 1:
      return 'grid-cols-1' // 1개: 전체 너비
    case 2:
      return 'grid-cols-2' // 2개: 좌우 반반
    case 3:
      return 'grid-cols-2 grid-rows-2' // 3개: 왼쪽1개(큰), 오른쪽 2개(위아래)
    case 4:
      return 'grid-cols-2 grid-rows-2' // 4개: 2x2 그리드
    default:
      return 'grid-cols-2' // 5개 이상: 2열로 정렬
  }
}

/**
 *
 * 이미지 개별 클래스 반환
 * @param {string} index - 이미지 인덱스
 * @param {string} images - 쉼표로 구분한 이미지 문자열(URL)
 * @returns {string} - 테일윈드 그리드 클래스
 *
 */

const getImageClass = (index: number, images: string): string => {
  const total = images.split(',').length
  const baseClass = 'aspect-[4/3] w-full object-cover'

  if (total === 3 && index === 0) {
    return `${baseClass} row-span-2 h-full object-cover`
  }

  return baseClass
}

export { getImageClass, getImageLayout }
