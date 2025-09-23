import { useState } from 'react'
import SearchIcon from '../../assets/icons/search-g.svg?react'
import CloseIcon from '../../assets/icons/close-g.svg?react'

interface inputProps {
  /** input의 사이즈 */
  size: 'sm' | 'md' | 'lg'
  /** input의 placeholder */
  placeholder?: string
  /** input의 id(label과 연결 - 웹접근성으로 사용) */
  id: string
  /** input의 label(id와 연결 - 웹접근성으로 사용) */
  label?: string
  /** input요소의 입력값 변경을 감지함 */
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** input의 value 값(상태값) */
  value: string
  /** input 클릭 인식(클릭시 삭제 버튼 나오게) */
  onclick?: () => void
  /** border-radius */
  border: 'fullRound' | 'lgRound'
  /** 아이콘 여부 */
  hasIcon?: boolean
  /** input의 type(ex:password) */
  type: string
}

const SIZE_TYPE = {
  sm: {
    input: 'w-full px-8 lg:pl-9 py-2 text-[14px] gap-2',
    icon: 'w-[14px]',
  },
  md: {
    input: 'w-full px-8 lg:px-9 py-2 lg:py-3 text-4 gap-2',
    icon: 'w-4',
  },
  lg: {
    input: 'w-full px-8 lg:p-10 py-2.5 lg:py-3 text-[18px] gap-3',
    icon: 'w-[18px]',
  },
} as const

const BORDER_TYPES = {
  fullRound: 'rounded-full',
  lgRound: 'rounded-lg',
} as const

function TextInput({
  size,
  placeholder,
  label,
  onchange,
  value,
  border,
  onclick,
  hasIcon,
  id,
  type,
}: inputProps) {
  const [showCloseIcon, setShowCloseIcon] = useState(false)

  const handleInput = () => {
    setShowCloseIcon(true)
    if (onclick) {
      onclick()
    }
  }

  /**
   * input 컴포넌트
   *
   * @param size - input size
   * @param placeholder - input placeholder
   * @param label - input label(id 연결)
   * @param onchange - input 입력값 변경 감지
   * @param value - input의 value(상태값)
   * @param border - input border
   * @param onclick - input 클릭 인식
   * @param hasIcon - input의 아이콘 여부
   * @param id - input의 id(label 연결)
   * @param type - input의 type((ex)password)
   */

  return (
    <div className={`flex flex-col justify-center`}>
      <label htmlFor={id} className={`sr-only`}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          className={`text-text-primary bg-background-surface placeholder-text-secondary border border-background-border focus:border-primary focus:outline-none transition-colors ${SIZE_TYPE[size].input} ${BORDER_TYPES[border]}`}
          value={value}
          placeholder={placeholder}
          onChange={onchange}
          onClick={handleInput}
        />
        {hasIcon && (
          <SearchIcon
            className={` ${SIZE_TYPE[size].icon} absolute top-1/2 left-3 flex items-center transform -translate-y-1/2 text-text-secondary`}
          />
        )}
        {/* input클릭시 닫기버튼이 나오게 함 */}
        {hasIcon && showCloseIcon && (
          <CloseIcon
            className={`${SIZE_TYPE[size].icon} absolute top-1/2 right-3 flex items-center transform -translate-y-1/2 cursor-pointer text-text-secondary`}
          />
        )}
      </div>
    </div>
  )
}

export default TextInput
