/**
 * TODO LIST
 * 이메일 검증 [x]
 * 사용자 이름 검증 [x]
 * 계정 ID 검증 [x]
 * 비밀번호 검증 [x]
 * 이미지 확장자 검증 [x]
 * 이미지 크기 검증 [x]
 * 이미지 최대 3개 업로드 [x]
 */

/**
 * API명세 규칙
 * 이메일: 이메일 형식
 * 계정 ID: 영어, 숫자, 점, 밑줄
 * 비밀번호: 6자 이상
 * 이미지 확장자: jpg, gif, png, jpeg, bmp, tif, heic
 * 이미지 크기: 10MB 이하
 * 다중 이미지: 3개 이하
 */

/**
 * .test() 메서드란?
 * - 정규식(RegExp) 객체의 메서드
 * - 주어진 문자열이 정규식 패턴과 일치하는지 확인
 * - 결과: true 또는 false 반환
 */

// 글자 수 가중치 계산 (한글=2, 그 외=1)
function getCustomLength(str: string): number {
  let length = 0
  for (const char of str) {
    if (/[가-힣]/.test(char)) {
      length += 2
    } else {
      length += 1
    }
  }
  return length
}

/**
 * 이메일 검증
 */

export function validateEmail(email: string): boolean {
  // 정규식 검사
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailPattern.test(email)
}

/**
 * 사용자 이름 검증
 * userName이 없거나 공백이면 false
 */
export function validateUserName(userName: string): boolean {
  if (userName.trim().length === 0) return false
  if (getCustomLength(userName) > 10) return false
  return true
}

/**
 * 계정 ID 검증
 */
export function validateAccountID(id: string): boolean {
  const idPattern = /^[a-zA-Z0-9._]+$/
  if (!idPattern.test(id)) return false
  if (getCustomLength(id) > 10) return false
  return true
}

/**
 * 비밀번호 검증
 */

export function validatePassword(password: string): boolean {
  if (!password) {
    return false
  }
  if (password.length < 6) {
    return false
  }
  return true
}

/**
 *
 * 이미지 확장자 검증
 * 이미지 확장자: jpg, gif, png, jpeg, bmp, tif, heic
 */
export function validateImageExtend(file: File): boolean {
  const allowExtends = ['jpg', 'gif', 'png', 'jpeg', 'bmp']
  const extend = file.name.split('.').pop()?.toLowerCase() ?? ''

  if (!allowExtends.includes(extend)) {
    return false
  }

  return true
}

/**
 * 이미지 크기 검증
 * 10MB이하
 */

export function validateImageSize(file: File): boolean {
  const maxSize = 10 * 1024 * 1024
  if (maxSize < file.size) {
    return false
  }
  return true
}

/**
 * 다중 이미지 업로드 검증
 * 이미지 최대 3개 업로드 []
 */

export function validateMultiImage(files: File[]): boolean {
  if (files.length >= 4) {
    return false
  }
  return true
}
