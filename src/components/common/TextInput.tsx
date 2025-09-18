import { useState } from 'react'

interface inputProps {
  placeholder: string
  icon?: string
  label: string
  isLeft?: boolean
  fontWeight: 'normal' | 'medium' | 'bold'
  size: 'sm' | 'md' | 'lg'
  type: 'text' | 'textarea'
  border: 'fullRound' | 'lgRound'
}

const SIZE_TYPES = {
  sm: { input: 'px-4 py-2 text-[14px] gap-2', icon: 'w-[14px]' },
  md: { input: 'px-4 py-3 text-4 gap-2', icon: 'w-4' },
  lg: { input: 'px-4 py-4 text-[18px] gap-3', icon: 'w-[18px]' },
} as const

const BORDER_TYPES = {
  fullRound: 'rounded-full',
  lgRound: 'rounded-lg',
} as const

function TextInput({
  label,
  placeholder,
  icon,
  fontWeight,
  size,
  type,
  border,
}: inputProps) {
  const [value, setValue] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className="relative">
      {/* 라벨은 로그인,회원가입,프로필편집페이지에만 나와야함 */}
      <label
        htmlFor={type}
        className={`text-lg font-${fontWeight} text-text-primary mb-4`}
      >
        {label}
      </label>

      {icon && (
        <img
          src={icon}
          className="absolute inset-y-0 pl-4 flex items-center pointer-events-none"
        />
      )}

      <input
        type={type}
        id={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`w-full bg-background-surface border border-background-border text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors ${SIZE_TYPES[size].input} ${BORDER_TYPES[border]}`}
      />
      <p>입력된 값: {value}</p>
    </div>
  )
}

export default TextInput
