import SearchIcon from '../../assets/icons/search-g.svg?react'
import HashIcon from '../../assets/icons/hash.svg?react'

interface InputProps {
  /** Input 컴포넌트의 스타일 및 크기를 결정하는 variant */
  variant:
    | 'userSearch'
    | 'hashtag'
    | 'globalSearch'
    | 'message'
    | 'profile'
    | 'textarea'
  /** 현재 입력값 */
  value?: string
  /** 입력값 변경 이벤트 핸들러 */
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  /** 입력창 안내 텍스트 */
  placeholder?: string
  /** 입력창 비활성화 여부 */
  disabled?: boolean
  /** 추가 CSS 클래스명 */
  className?: string
  /** 아이콘 타입 (profile variant에서 아이콘 추가시 사용) */
  icon?: 'search' | 'hash'
  /** textarea의 줄 수 (textarea variant 전용, 기본값: 4) */
  rows?: number
}

// 아이콘 매핑
const ICON_COMPONENTS = {
  search: SearchIcon,
  hash: HashIcon,
} as const

// variant별 설정
const VARIANT_STYLES = {
  userSearch: {
    container: 'relative',
    iconContainer:
      'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
    iconSize: 'w-5 h-5',
    inputClass:
      'w-full pl-10 pr-3 py-2 bg-background-surface border border-background-border rounded-full text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors text-sm lg:text-base',
    icon: 'search',
  },
  hashtag: {
    container: 'relative',
    iconContainer:
      'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
    iconSize: 'w-5 h-5',
    inputClass:
      'w-full pl-10 pr-3 py-2 bg-background-surface border border-background-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors text-sm lg:text-base',
    icon: 'hash',
  },
  globalSearch: {
    container: 'relative',
    iconContainer:
      'absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none',
    iconSize: 'w-6 h-6',
    inputClass:
      'w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 bg-background-surface border border-background-border rounded-full text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors text-sm lg:text-base',
    icon: 'search',
  },
  message: {
    inputClass:
      'w-full px-4 py-2.5 lg:py-3 bg-background-surface border border-background-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors text-sm lg:text-base',
  },
  profile: {
    inputClass:
      'w-full p-3 lg:p-4 bg-background-surface border border-background-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors text-sm lg:text-base',
  },
  textarea: {
    inputClass:
      'w-full p-3 lg:p-4 bg-background-surface border border-background-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors text-sm lg:text-base',
  },
} as const

/**
 * 통합 Input 컴포넌트
 *
 * @example
 * ```tsx
 * // 사용자 검색
 * <Input variant="userSearch" placeholder="사용자 검색" />
 *
 * // 메시지 입력
 * <Input variant="message" placeholder="메시지 입력" />
 *
 * // 자기소개 작성
 * <Input variant="textarea" placeholder="자기소개" rows={4} />
 *
 * // 프로필 편집 (아이콘 있음)
 * <Input variant="profile" icon="search" placeholder="기술스택" />
 * ```
 */
function Input({ variant, icon, rows, className = '', ...props }: InputProps) {
  const style = VARIANT_STYLES[variant]

  // textarea일 경우
  if (variant === 'textarea') {
    return (
      <textarea
        className={`${style.inputClass} ${className}`}
        rows={rows || 4}
        {...props}
      />
    )
  }

  // 아이콘이 있는 경우
  if ('container' in style) {
    const iconToUse = icon || style.icon // props의 icon을 우선으로 없으면 기본 icon 사용
    const IconComponent = ICON_COMPONENTS[iconToUse]

    return (
      <div className={style.container}>
        <div className={style.iconContainer}>
          <IconComponent className={`${style.iconSize} text-text-secondary`} />
        </div>
        <input
          type="text"
          className={`${style.inputClass} ${className}`}
          {...props}
        />
      </div>
    )
  }

  // 프로필 페이지 input
  if (variant === 'profile' && icon) {
    const IconComponent = ICON_COMPONENTS[icon]
    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
          <IconComponent className="w-6 h-6 text-text-secondary" />
        </div>
        <input
          type="text"
          className={`w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-4 bg-background-surface border border-background-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors text-sm lg:text-base ${className}`}
          {...props}
        />
      </div>
    )
  }

  // 일반 input
  return <input className={`${style.inputClass} ${className}`} {...props} />
}

export default Input
