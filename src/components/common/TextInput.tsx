import { useEffect, useState } from 'react'

interface inputProps {
  size: string
  placeholder: string
  onchange: () => void
  value: string
  onclick: () => void
  isButton: boolean
} // 2. 타입 에러가 나서 막으려고 선언함

const SIZE_TYPES = {
  sm: { input: 'px-4 py-2 text-[14px] gap-2', icon: 'w-[14px]' },
  md: { input: 'px-4 py-3 text-4 gap-2', icon: 'w-4' },
  lg: { input: 'px-4 py-4 text-[18px] gap-3', icon: 'w-[18px]' },
} as const

const BORDER_TYPES = {
  fullRound: 'rounded-full',
  lgRound: 'rounded-lg',
} as const

/*
1.size props를 넣는다.(겉의 모양. 외곽 크기... border-raidus,텍스트 크기,아이콘 이미지 크기(size에 맞춰서 or 상황 이름))
2.placeholder를 넣는다.
3.onchange 이벤트를 넣는다.
4.value를 넣는다.
5.onclick을 넣는다.(isButton이 true일때...  x버튼을 랜더링한다. onclick 이벤트를 버튼 안에 넣어)
6.isButton을 넣는다.(5번 문제)
*/

function TextInput({
  size, // 1. 외부로부터 내부의 값을 변동시키려고 선언한 변수 또는 동적 할당
  placeholder,
  onchange,
  value,
  onclick,
  isButton,
}: inputProps) {
  const SIZE_TYPE = {
    sm: 'w-5',
    md: 'w-7',
    lg: 'w-10',
  } as const // 3. 굳이 이렇게 쓰는 이유는 as const로 상수 선언하면 이 값이 보호받을 수 있고 외부에서 변동 X 관리하기 쉽다.

  // 아하!
  // 함수 안에 switch를 넣는다..
  function sizeSwitch(sizeParam: string) {
    switch (sizeParam) {
      case 'sm':
        return SIZE_TYPE.sm
      case 'md':
        return SIZE_TYPE.md
      case 'lg':
        return SIZE_TYPE.lg
      default:
        return SIZE_TYPE.sm
    } // 4. if문으로 props와 size type을 비교하는 함수를 작성했음
  } // 5. if문이 너무 길고, 유지보수가 어려울 거 같아서 switch case문으로 교체함
  // 6. return을 썼더니, 컴포넌트가 스위치 문에서 리턴돼서 아래에 리턴문이 실행되지 않음.(이부분 아직 잘 모름)
  // 7. 이 문제를 해결하기 위해 스위치 문을 함수 스코프 안에 선언하였음.

  useEffect(() => {
    sizeSwitch(size)
  }, [])

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
