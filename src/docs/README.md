# JSDoc 기본 사용법

JSDoc은 JavaScript/TypeScript 코드에 주석으로 문서를 작성하는 방법입니다. IDE에서 자동완성과 타입 힌트를 제공합니다.

## 기본 문법

```javascript
/**
 * 함수나 클래스에 대한 설명
 *
 * @param {타입} 매개변수명 - 매개변수 설명
 * @returns {타입} 반환값 설명
 */
```

## 함수 문서화

```javascript
/**
 * 두 숫자를 더합니다
 *
 * @param {number} a - 첫 번째 숫자
 * @param {number} b - 두 번째 숫자
 * @returns {number} 두 숫자의 합
 */
function add(a, b) {
  return a + b
}
```

## React 컴포넌트 문서화

````tsx
interface ButtonProps {
  /** 버튼에 표시될 텍스트 */
  children: React.ReactNode
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void
  /** 버튼 크기 */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * 재사용 가능한 버튼 컴포넌트
 *
 * @example
 * ```tsx
 * <Button size="lg" onClick={() => console.log('클릭!')}>
 *   클릭하세요
 * </Button>
 * ```
 */
function Button({ children, onClick, size = 'md' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn btn-${size}`}>
      {children}
    </button>
  )
}
````

```tsx
interface HeaderProps {
  title?: string
  on버튼명Click?: () => void
  show버튼명Button?: boolean
}
export const Header: React.FC<HeaderProps> = ({
  title,
  on버튼명Click,
  showButton = false,
}) => {
  const navigate = useNavigate()

  // 버튼 눌렀을때 작동 함수 설정
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick()
    } else {
      navigate(-1)
    }
  }

  const handle버튼명Click = () => {
    if (onAddClick) {
      onAddClick()
    } else {
      console.log('add버튼 누름')
    }
  }

  return (
    <header>
      <div className="flex items-center">
        {showBackButton && (
          <button onClick={handleBackClick}>
            <img src={backArrowButton} alt="뒤로가기" />
          </button>
        )}
      </div>

      <h1>{title}</h1>
    </header>
  )
}
현재 생성된 버튼은 아래 3가지가 있습니다.

- showBackButton
    - 현재 navigate -1로 로직 구성되어있어 외부페이지로 이탈 될 가능성이 있음 --> 수정 예정

    - 아래 두 버튼은 로직미구현으로 console에만 작동하는지 확인함 --> 로직 구현 예정
- showCancelButton
- showAddButton
```

## 주요 태그

| 태그          | 용도          | 예시                                 |
| ------------- | ------------- | ------------------------------------ |
| `@param`      | 매개변수 설명 | `@param {string} name - 사용자 이름` |
| `@returns`    | 반환값 설명   | `@returns {boolean} 성공 여부`       |
| `@example`    | 사용 예시     | `@example add(1, 2) // 3`            |
| `@throws`     | 예외 상황     | `@throws {Error} 잘못된 입력시 에러` |
| `@deprecated` | 사용 중단     | `@deprecated 버전 2.0부터 제거 예정` |

## TypeScript에서 인터페이스 문서화

```typescript
interface User {
  /** 사용자 고유 ID */
  id: number
  /** 사용자 이름 (3-20자) */
  username: string
  /** 이메일 주소 */
  email: string
  /** 계정 활성화 여부 */
  isActive: boolean
}
```

## 클래스 문서화

````javascript
/**
 * 사용자 관리 클래스
 *
 * @example
 * ```javascript
 * const userManager = new UserManager();
 * userManager.addUser('john', 'john@example.com');
 * ```
 */
class UserManager {
  /**
   * 새 사용자를 추가합니다
   *
   * @param {string} name - 사용자 이름
   * @param {string} email - 이메일 주소
   * @throws {Error} 이메일 형식이 잘못된 경우
   * @returns {User} 생성된 사용자 객체
   */
  addUser(name, email) {
    // 구현...
  }
}
````

## 실제 효과

JSDoc을 작성하면:

- VSCode에서 함수 호버시 설명 표시
- 자동완성에서 매개변수 정보 제공
- 타입 체크 도움
- 팀원들이 코드 이해하기 쉬워짐

## 팁

1. **간단명료하게**: 한 줄로 요약 후 필요시 상세 설명
2. **예시 포함**: `@example` 태그로 사용법 보여주기
3. **타입 명시**: TypeScript 사용시에도 명시적 타입 작성
4. **일관성 유지**: 팀 내에서 동일한 스타일 사용

이렇게 작성하면 코드를 읽는 사람이 함수의 목적과 사용법을 즉시 이해할 수 있습니다.
