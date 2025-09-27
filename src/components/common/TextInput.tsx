import { useState } from 'react'
import CloseIcon from '../../assets/icons/close-g.svg?react'

interface inputProps {
  /** input의 사이즈 */
  size: 'sm' | 'md' | 'lg'
  /** input의 placeholder */
  placeholder?: string
  /** input의 id(label과 연결 - 웹접근성으로 사용) */
  id: string
  /** input요소의 입력값 변경을 감지함 */
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** input의 value 값(상태값) */
  value: string
  /** input 클릭 인식(클릭시 삭제 버튼 나오게) */
  onclick?: () => void
  /** border-radius */
  border: 'fullRound' | 'lgRound'
  /** input의 type(ex:password) */
  type: string
}

const SIZE_TYPE = {
  sm: {
    input: 'w-full pr-8 py-2 text-[14px] gap-2',
    icon: 'w-[14px]',
  },
  md: {
    input: 'w-full px-8 lg:p-3 py-2 lg:py-3 text-4 gap-2',
    icon: 'w-4',
  },
  lg: {
    input: 'w-full px-8 lg:p-4 py-2.5 lg:py-3 text-[18px] gap-3',
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
  onchange,
  value,
  border,
  onclick,
  id,
  type,
}: inputProps) {
  const [showCloseIcon, setShowCloseIcon] = useState(false)

  const eraseInput = () => {
    setShowCloseIcon(false)
    if (onchange) {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>
      onchange(event)
    }
  }
  // input에 내용이 있을 시에만 삭제버튼 나오게
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onchange) {
      onchange(e)
    }
    if (e.target.value.length > 0) {
      setShowCloseIcon(true)
    } else {
      setShowCloseIcon(false)
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
        {id}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          className={`text-text-primary bg-background-surface placeholder-text-secondary border border-background-border focus:border-primary focus:outline-none transition-colors ${SIZE_TYPE[size].input} ${BORDER_TYPES[border]}`}
          value={value}
          placeholder={placeholder}
          onChange={handleInput}
          onClick={onclick}
        />
        {/* input클릭시 닫기버튼이 나오게 함 */}
        {showCloseIcon && (
          <CloseIcon
            className={`${SIZE_TYPE[size].icon} absolute top-1/2 right-3 flex items-center transform -translate-y-1/2 cursor-pointer text-text-secondary`}
            onClick={eraseInput}
          />
        )}
      </div>
    </div>
  )
}

export default TextInput
