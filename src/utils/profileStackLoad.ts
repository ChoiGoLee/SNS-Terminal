/**
 * 프로필 기술스택 불러오기
 *
 * @param {string} introData - 유저정보의 자기소개(intro)
 * @returns {string} '$%' 문자열로 분리된 '자기소개 텍스트'와 '기술스택'
 *
 */

export const LoadIntroData = (introData: string) => {
  let finalStack: string[]
  let finalIntroduce: string

  if (introData.includes('§$') === true) {
    // '§$'문자열로 자기소개를 배열로 나눔
    const splitIntroData = introData.split('§$')
    // '자기소개 텍스트','기술스택'으로 나뉘어짐
    finalIntroduce = splitIntroData[0]
    finalStack = splitIntroData[1].split(',')
  } else {
    finalIntroduce = introData
    finalStack = []
  }

  return { finalIntroduce, finalStack }
}
