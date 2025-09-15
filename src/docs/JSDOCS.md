# Description 컴포넌트 테스트 케이스

**페이지별 사용 예시**

1. 회원탈퇴 페이지

```tsx
<Description
  iconType="resign"
  title="계정을 탈퇴하시겠습니까?"
  showCard={true}
  buttons={[취소, 탈퇴하기]}
/>
```

2. 로그아웃 페이지

```tsx
<Description
  iconType="logout"
  title="로그아웃 하시겠습니까?"
  buttons={[취소, 로그아웃]}
/>
```

3. 검색 결과 없음

```tsx
<Description iconType="search" title="검색 결과가 없습니다" />
```

4. 프로필 빈 상태

```tsx
<Description iconType="post" title="아직 포스트가 없습니다" />
<Description iconType="like" title="마음에 들어요가 없습니다" />
<Description iconType="comment" title="답글이 없습니다" />
```

Props

- iconType: 아이콘 종류 (resign/logout/post/like/comment/search)
- title: 제목 텍스트
- showCard: 탈퇴 시에만 true
- buttons: 버튼 배열 (선택적)
