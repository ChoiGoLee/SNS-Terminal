## **Input 컴포넌트 테스트 케이스**

### **사용 예시**

**1. 사용자 검색 (userSearch)**

```tsx
<Input
  variant="userSearch"
  placeholder="사용자 검색"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
/>
```

**2. 해시태그 입력 (hashtag)**

```tsx
<Input
  variant="hashtag"
  placeholder="#태그 입력"
  value={hashtagValue}
  onChange={handleHashtagChange}
/>
```

**3. 전체 검색 (globalSearch)**

```tsx
<Input
  variant="globalSearch"
  placeholder="사용자, 해시태그, 게시물 검색..."
  value={globalSearchValue}
  onChange={handleGlobalSearch}
/>
```

**4. 메시지 입력 (message)**

```tsx
<Input
  variant="message"
  placeholder="메시지를 입력하세요"
  value={messageValue}
  onChange={(e) => setMessageValue(e.target.value)}
  onKeyDown={handleEnterSend}
/>
```

**5. 프로필 정보 입력 (profile - 아이콘 없음)**

```tsx
<Input
  variant="profile"
  placeholder="이름을 입력하세요"
  value={nameValue}
  onChange={handleNameChange}
  required
/>
```

**6. 기술스택 검색 (profile - 아이콘 있음)**

```tsx
<Input
  variant="profile"
  icon="search"
  placeholder="기술스택 검색..."
  value={techStackValue}
  onChange={handleTechStackSearch}
/>
```

**7. 자기소개 작성 (textarea)**

```tsx
<Input
  variant="textarea"
  placeholder="자기소개를 써주세요"
  rows={4}
  value={introValue}
  onChange={handleIntroChange}
  maxLength={500}
/>
```

**8. 긴 텍스트 입력 (textarea - 큰 사이즈)**

```tsx
<Input
  variant="textarea"
  placeholder="프로젝트 설명을 자세히 작성해주세요"
  rows={8}
  value={projectDescValue}
  onChange={handleProjectDescChange}
  className="min-h-40"
/>
```

**9. 비활성화 상태 테스트**

```tsx
<Input
  variant="message"
  placeholder="수정할 수 없습니다"
  value="고정된 텍스트"
  disabled
/>
```

**10. 에러 상태 (빨간 테두리)**

```tsx
<Input
  variant="profile"
  placeholder="이메일을 입력하세요"
  value={emailValue}
  onChange={handleEmailChange}
  className="border-danger focus:border-danger"
/>
```

---

### **Props**

- **variant**: Input 타입 (userSearch/hashtag/globalSearch/message/profile/textarea) (필수)
- **value**: 입력값 (선택적)
- **onChange**: 값 변경 핸들러 (e: ChangeEvent) (선택적)
- **placeholder**: 안내 텍스트 (선택적)
- **disabled**: 비활성화 여부 (선택적)
- **className**: 추가 CSS 클래스 (선택적)
- **icon**: 아이콘 타입 (search/hash) - profile variant에서만 (선택적)
- **rows**: textarea 줄 수 (textarea variant 전용, 기본값: 4) (선택적)

---

### **크기별 테스트**

**Small (S) 크기**

- userSearch: 24x24px 아이콘, rounded-full, pl-10 padding
- hashtag: 24x24px 아이콘, rounded-lg, pl-10 padding

**Medium (M) 크기**

- globalSearch: 28x28px 아이콘, rounded-full, pl-10~12 padding
- message: 아이콘 없음, rounded-lg, px-4 padding

**Large (L) 크기**

- profile: 28x28px 아이콘(선택적), rounded-lg, p-3~4 padding
- textarea: 아이콘 없음, rounded-lg, p-3~4 padding, rows 조절 가능

---

### **아이콘별 테스트**

**Search 아이콘**

- userSearch (기본)
- globalSearch (기본)
- profile (icon="search" 지정시)

**Hash 아이콘**

- hashtag (기본)
- profile (icon="hash" 지정시) - 특별한 경우

---

### **반응형 테스트**

**모바일 (기본)**

- 텍스트: text-sm
- 아이콘: 기본 크기
- padding: 기본값

**PC (lg 이상)**

- 텍스트: text-base
- 아이콘: 더 큰 크기 (일부 variant)
- padding: 증가 (pl-12, py-3~4)
