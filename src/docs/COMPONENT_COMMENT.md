# CommentInput 컴포넌트 테스트 케이스

**사용 예시**

1. 기본 댓글 작성

```tsx
<CommentInput
  userName="김개발자"
  userImage="https://example.com/avatar.jpg"
  onSubmit={(comment) => console.log('댓글:', comment)}
/>
```

2. 이미지 없는 사용자

```tsx
<CommentInput
  userName="홍길동"
  onSubmit={handleCommentSubmit}
  placeholder="질문을 남겨보세요"
/>
```

3. 커스텀 placeholder

```tsx
<CommentInput
  userName="박개발"
  userImage="https://example.com/profile.jpg"
  onSubmit={handleCommentSubmit}
  placeholder="코드 리뷰를 작성해주세요"
/>
```

**Props**

- userName: 사용자 이름 (필수)
- userImage: 프로필 이미지 URL (선택적)
- onSubmit: 댓글 제출 함수 (comment: string 매개변수)
- placeholder: 입력창 안내 텍스트 (기본값: "댓글을 입력하세요...")

---

<br>

# CommentItem 컴포넌트 테스트 케이스

**사용 예시**

1. 기본 댓글 표시

```tsx
<CommentItem
  userName="김개발자"
  userImage="https://example.com/avatar.jpg"
  level="senior"
  content="좋은 코드네요! 참고하겠습니다."
  createdAt={Date.now() - 180000} // 3분 전
  isLiked={false}
  likeCount={5}
  onLikeToggle={() => console.log('좋아요 토글')}
/>
```

2. 이미지 없는 주니어 개발자

```tsx
<CommentItem
  userName="박주니어"
  level="junior"
  content="질문이 있습니다!"
  createdAt={Date.now() - 3600000} // 1시간 전
  isLiked={true}
  likeCount={12}
  onLikeToggle={handleLikeToggle}
/>
```

3. 여러 줄 댓글 (리드 개발자)

```tsx
<CommentItem
  userName="이시니어"
  userImage="https://example.com/profile.jpg"
  level="lead"
  content="성능 최적화 관점에서 개선할 부분이 보이네요.
메모리 사용량을 줄일 수 있을 것 같습니다."
  createdAt={Date.now() - 86400000} // 1일 전
  isLiked={false}
  likeCount={8}
  onLikeToggle={handleLikeToggle}
/>
```

4. 좋아요 많은 댓글

```tsx
<CommentItem
  userName="최미드"
  level="mid"
  content="이 방법 정말 유용해요!"
  createdAt={Date.now() - 30000} // 30초 전
  isLiked={true}
  likeCount={25}
  onLikeToggle={handleLikeToggle}
/>
```

**Props**

- userName: 사용자 이름 (필수)
- userImage: 프로필 이미지 URL (선택적)
- level: 개발자 레벨 (junior/mid/senior/lead)
- content: 댓글 내용 (줄바꿈 지원)
- createdAt: 작성 시간 (타임스탬프, 밀리초)
- isLiked: 좋아요 여부 (boolean)
- likeCount: 좋아요 수 (number)
- onLikeToggle: 좋아요 버튼 클릭 함수

**시간 표시 테스트**

- 30초 전 → "방금 전"
- 3분 전 → "3분 전"
- 1시간 전 → "1시간 전"
- 1일 전 → "1일 전"

**레벨별 아이콘 테스트**

- junior: 주니어 개발자 아이콘
- mid: 미드 개발자 아이콘
- senior: 시니어 개발자 아이콘
- lead: 리드 개발자 아이콘
