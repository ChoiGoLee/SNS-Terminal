// export type variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
// export type size = 'sm' | 'md' | 'lg' | 'full-width'
// export type size = 'sm' | 'md' | 'lg' | 'full-width'

/**
* @description 재사용 가능한 버튼 컴포넌트

* Parameters
* @param content string - 버튼에 표시할 텍스트
* @param img (optional) string - 버튼 아이콘 이미지 URL
* @param variant (optional) ButtonVariant - 버튼 스타일 (primary | secondary | danger | ghost | outline)
* @param size (optional) ButtonSize - 버튼 크기 (sm | md | lg | full-width)
* @param onClick (optional) function - 클릭 이벤트 핸들러
* @param disabled (optional) boolean - 버튼 비활성화 여부
* @param className (optional) string - 추가 CSS 클래스
* @returns React.JSX.Element
 */

/**
 * 버튼 컴포넌트 속성 인터페이스
 */
export default interface IButtonProps {
  /**
   * @param {string} content - 버튼 내부에 표시할 텍스트 내용
   * @example "클릭하세요"
   */
  content?: string

  /**
   * @param {string} img - 텍스트 앞에 표시할 선택적 아이콘의 이미지 소스 URL
   * @example "/icons/arrow.svg"
   */
  img?: string

  /**
   * @param variant - 버튼의 시각적 변형/스타일
   * @description 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
   * @default 'primary'
   */
  variant?: string

  /**
   * @param size - 패딩과 텍스트 크기에 영향을 주는 버튼의 크기 변형
   * @description 'sm' | 'md' | 'lg' | 'full-width'
   * @default 'md'
   */
  size?: string

  /**
   * 버튼 텍스트의 글꼴 굵기
   * @description 'medium' | 'regular'| 'bold'
   * @default 'regular'
   */
  fontWeight?: string

  /**
   * 클릭 이벤트 핸들러 함수
   * @param event - 마우스 클릭 이벤트
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void

  /**
   * @param disabled - 버튼 비활성화 여부
   * @default false
   */
  disabled?: boolean

  /**
   * @param className - 추가로 적용할 CSS 클래스명
   */
  className?: string
}
