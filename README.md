# SNS-Terminal

## 컴포넌트 사용 예시

### 1. Buttons

#### 1-1. BaseButton

```ts
/**
 * @param {string} content - (optional) 버튼에 표시될 텍스트
 * @param {string} icon - (optional) 버튼 아이콘 이미지 주소
 * @param {string} ariaLabel - 버튼에 대한 설명
 * @param {string} width - 버튼 너비 (fullWidth | flexWidth)
 * @param {string} color - 버튼 색상 설정 (primary | danger | surface)
 * @param {string} size - 버튼 크기 속성 (sm | md | lg)
 * @param {boolean} isLeft - 아이콘 왼쪽에 위치하는지 여부 (기본값: false)
 * @param {function} onclick - 클릭 이벤트 핸들러 함수
 *
 * @example
 * <BaseButton
 *  content="버튼에 표시될 텍스트"
 *  icon="아이콘 이미지 주소"
 *  ariaLabel="버튼에 대한 설명"
 *  width="fullWidth"
 *  color="primary"
 *  size="lg"
 *  isLeft={false}
 *  onclick={onClick} />
 */
```

#### 1-2. SidebarButton

```ts
/**
 * @param {string} content - 버튼에 표시될 텍스트
 * @param {string} icon - 버튼 아이콘 이미지 주소
 * @param {string} ariaLabel - 버튼에 대한 설명
 * @param {boolean} isActive - 버튼 활성화 상태 (기본값: false)
 * @param {function} onclick - 클릭 이벤트 핸들러 함수
 *
 * @example
 * <SidebarButton
 *  content="버튼에 표시될 텍스트"
 *  icon="아이콘 이미지 주소"
 *  ariaLabel="버튼에 대한 설명"
 *  isLeft={false}
 *  onclick={onClick} />
 */
```
