# 🖥️ Terminal

<img width="1920" height="1080" alt="Terminal 서비스 이미지" src="https://github.com/user-attachments/assets/bf2151d1-ab55-4c3b-b1ee-a4c46971fd77" />

> 코드로 소통하는 개발자 전용 SNS 플랫폼

[![Deploy](https://img.shields.io/badge/Deploy-Firebase-orange)](https://snsterminal.web.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0+-61dafb)](https://reactjs.org/)

**배포 URL**: [https://snsterminal.web.app/](https://snsterminal.web.app/)

**테스트 계정**

- 이메일: `choigolee@test.com`
- 비밀번호: `choigolee`

---

# 🖥️ Terminal

<img width="1920" height="1080" alt="Terminal 서비스 이미지" src="https://github.com/user-attachments/assets/bf2151d1-ab55-4c3b-b1ee-a4c46971fd77" />

> 코드로 소통하는 개발자 전용 SNS 플랫폼

[![Deploy](https://img.shields.io/badge/Deploy-Firebase-orange)](https://snsterminal.web.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0+-61dafb)](https://reactjs.org/)

**배포 URL**: [https://snsterminal.web.app/](https://snsterminal.web.app/)

**테스트 계정**

- 이메일: `choigolee@test.com`
- 비밀번호: `choigolee`

---

## 📑 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [개발 배경 및 목표](#-개발-배경-및-목표)
- [주요 기술 의사결정](#-주요-기술-의사결정)
  - [마크다운 & 코드 하이라이팅 구현](#마크다운--코드-하이라이팅-구현)
  - [API 제약 조건 내에서의 데이터 확장](#2-api-제약-조건-내에서의-데이터-확장)
  - [성능 최적화 전략](#3-성능-최적화-전략)
- [기술 스택](#️-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [페이지 구성](#-페이지-구성)
- [시작하기](#-시작하기)
- [API 명세](#-api-명세)
- [팀원 소개](#-팀원-소개)
- [참고 자료](#-참고-자료)
- [회고](#-회고)

## 📌 프로젝트 소개

Terminal은 개발자를 위한 특화 기능을 제공하는 SNS 플랫폼입니다. 일반적인 소셜 네트워크 기능에 더해, 코드 공유와 기술 스택 표시 등 개발자 커뮤니티에 최적화된 경험을 제공합니다.

### 핵심 가치

- **일상적인 코딩 습관 형성**: 매일 코드를 작성하고 공유하는 문화 조성
- **개발자 중심 설계**: 마크다운, 코드 하이라이팅 등 개발자 친화적 기능
- **기술 스택 가시화**: 프로필에서 사용 기술을 한눈에 확인

---

## ✨ 주요 기능

### SNS 기본 기능

- ✅ 게시물 작성/조회/삭제
- ✅ 댓글 작성 및 관리
- ✅ 좋아요 및 반응
- ✅ 팔로우/언팔로우
- ✅ 프로필 관리
- ✅ 실시간 메시징

### 개발자 특화 기능

- 🎨 **마크다운 & 코드 하이라이팅**: 코드 블록을 syntax highlighting과 함께 표시
- 🔧 **기술 스택 관리**: 프로필에 본인의 기술 스택 표시
- 📊 **GitHub 잔디 연동**: GitHub 활동 내역 시각화
- 🏷️ **게시물 카테고리**: 일반/개발/헬프/테크/프로젝트/학습으로 분류
- 🔍 **검색 기능**: 게시물 및 사용자 검색
- ♾️ **무한 스크롤**: 최적화된 게시물 로딩

---

## 🎯 개발 배경 및 목표

### 문제 인식

개발 실력은 꾸준한 반복 학습을 통해서만 유지되고 성장합니다. 하지만 혼자서 지속적으로 동기부여를 유지하기는 어렵습니다.

### 해결 방안

SNS 형태의 플랫폼을 통해 개발 습관을 일상에 자연스럽게 녹여내고, 다른 개발자들과 소통하며 동기부여를 얻을 수 있는 환경을 제공합니다.

### 프로젝트 목표

1. **풀사이클 경험**: 기획부터 배포까지 전체 개발 프로세스 경험
2. **실전 적용**: 부트캠프에서 학습한 내용을 실제 프로젝트에 적용
3. **협업 워크플로우**: Git Flow, 코드 리뷰 등 실무 개발 프로세스 체득
4. **문제 해결 능력**: 예상치 못한 문제를 스스로 해결하는 능력 향상

---

## 💡 주요 기술 의사결정

### 마크다운 & 코드 하이라이팅 구현

**문제 인식**

개발자 SNS에서 코드 공유는 핵심 기능이지만, 일반 텍스트로는 가독성이 떨어지고 전문성이 부족해 보입니다.

**선택지 비교**

| 구분        | 직접 구현        | 라이브러리 사용 |
| ----------- | ---------------- | --------------- |
| 개발 시간   | 🔴🔴🔴           | 🟢              |
| 코드 복잡도 | 매우 높음        | 낮음            |
| 언어 지원   | 제한적           | 180개+          |
| 유지보수    | 지속적 관리 필요 | 커뮤니티 지원   |

**최종 선택: react-markdown + react-syntax-highlighter**

```typescript
// 라이브러리가 제공하는 핵심 기능
- 마크다운 파싱: # → <h1>, ** → <strong> 등 자동 변환
- 180개+ 언어의 Syntax Highlighting
- 검증된 파싱 엔진 (보안, 성능)

// 우리가 집중한 부분
- 프로젝트 디자인 시스템 통합 (Tailwind)
- 언어별 커스텀 라벨 UI
- TypeScript 타입 안정성 확보
```

**구현 과정에서 해결한 기술적 과제**

1. **TypeScript 타입 호환성 문제**

   - 문제: react-markdown의 `Components` 타입이 `inline` 속성을 정의하지 않음
   - 해결: props 전체를 받아 TypeScript가 자동으로 타입 추론하도록 구현

2. **인라인 코드와 코드 블록 구분**

   - 문제: `inline` 속성 접근 불가
   - 해결: `className` 기반 조건부 렌더링으로 대체

3. **스타일 시스템 통합**
   - 문제: CSS 모듈과 Tailwind 혼재로 유지보수 어려움
   - 해결: Tailwind로 스타일 시스템 일원화

**결과**

180개 언어를 지원하는 코드 하이라이팅과 마크다운 기능을 단 100줄의 코드로 구현하면서도, 프로젝트 디자인 가이드에 완벽히 부합하는 UI를 제공합니다.

### 2. API 제약 조건 내에서의 데이터 확장

**문제 상황**

제공받은 API는 표준 SNS 스키마만 지원하며, 커스텀 필드 추가가 불가능했습니다. 하지만 개발자 특화 기능을 위해서는 추가 데이터가 필요했습니다:

- 프로필: 기술 스택 정보
- 게시물: 게시물 유형(일반/개발/헬프 등), 해시태그

**해결 방안: 데이터 인코딩 전략**

기존 텍스트 필드에 특수 구분자를 사용하여 메타데이터를 포함하는 방식을 설계했습니다.

```typescript
// 프로필 intro 필드
"자기소개 텍스트§$React,TypeScript,Python"
            └─ 구분자 ─┘└─── 기술 스택 ───┘

// 게시물 content 필드
"{본문}Φ$개발¶{React,코딩}"
  └본문┘└유형┘└해시태그┘
```

**구분자 선택 기준**

| 구분자 | 용도                   | 선택 이유                           |
| ------ | ---------------------- | ----------------------------------- |
| `§$`   | 자기소개/기술스택 분리 | 일반 텍스트에서 사용 빈도 극히 낮음 |
| `Φ$`   | 본문/메타데이터 분리   | 그리스 문자로 충돌 가능성 최소화    |
| `¶`    | 유형/해시태그 분리     | 문단 기호, 사용자 입력 확률 낮음    |

**파싱 로직 구현**

```typescript
// utils/profileStackLoad.ts
export const LoadIntroData = (intro: string) => {
  const [introduce, stackString] = intro.split('§$')
  const techStack = stackString ? stackString.split(',') : []
  return { introduce, techStack }
}

// PostCard.tsx
const parsePostContent = (content: string) => {
  const [mainContent, metaData] = content.split('Φ$')
  if (!metaData) return { content: mainContent, postType: null, hashtags: [] }

  const [postType, hashTagString] = metaData.split('¶')
  const hashtags = hashTagString
    ? hashTagString
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
    : []

  return { content: mainContent, postType, hashtags }
}
```

**트레이드오프**

| 장점                    | 단점                                      |
| ----------------------- | ----------------------------------------- |
| ✅ API 수정 불필요      | ❌ 사용자가 구분자 입력 시 파싱 오류 가능 |
| ✅ 빠른 구현            | ❌ 데이터베이스 쿼리 최적화 어려움        |
| ✅ 기존 API와 완전 호환 | ❌ 구분자 변경 시 마이그레이션 필요       |

**결과**

백엔드 수정 없이 개발자 특화 기능(기술 스택 표시, 게시물 카테고리, 해시태그)을 성공적으로 구현했습니다. 사용자 경험을 해치지 않으면서도 제약 조건을 극복한 사례입니다.

### 3. 성능 최적화 전략

**무한 스크롤 구현: Intersection Observer API**

**선택 배경**

전통적인 스크롤 이벤트 리스너 방식은 성능 이슈가 있습니다:

- 스크롤할 때마다 이벤트 발생 (초당 수십~수백 번)
- 매번 DOM 계산 필요
- 디바운싱/쓰로틀링으로 최적화해도 근본적 한계 존재

**Intersection Observer의 장점**

```typescript
// 커스텀 훅으로 구현
export function useInfinityScroll({ onLoadMore, hasMore, isLoading }) {
  const lastContentRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 마지막 요소가 화면에 보이면 다음 데이터 로드
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore()
        }
      },
      { threshold: 1.0 }
    )

    if (lastContentRef.current) {
      observer.observe(lastContentRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, onLoadMore])

  return { lastContent: lastContentRef }
}
```

**기술적 이점**

| 항목        | 스크롤 이벤트        | Intersection Observer |
| ----------- | -------------------- | --------------------- |
| 성능        | 매 스크롤마다 실행   | 교차 시점만 실행      |
| 최적화      | 수동 (디바운스 필요) | 브라우저 내장 최적화  |
| 정확도      | 계산 오차 가능       | 정확한 교차 감지      |
| 코드 복잡도 | 높음                 | 낮음                  |

**구현 결과**

- 게시물 10개씩 자동 로딩
- 스크롤 성능 저하 없음
- 메모리 효율적 관리 (observer 자동 정리)

---

**검색 기능: 클라이언트 사이드 필터링**

**현재 구현**

```typescript
// useMemo로 필터링 결과 캐싱
const filteredPosts = useMemo(() => {
  if (!inputValue.trim()) return posts

  const searchTerm = inputValue.toLowerCase().trim()
  return posts.filter((post) =>
    [post.content, post.author?.username, post.author?.accountname].some(
      (field) => field?.toLowerCase().includes(searchTerm)
    )
  )
}, [posts, inputValue])
```

**디바운스 미적용 이유**

1. **API 호출 없음**: 이미 로드된 데이터에서 필터링
2. **useMemo 캐싱**: 불필요한 재계산 방지
3. **즉각적 피드백**: 타이핑 즉시 결과 표시가 UX 측면에서 유리

**향후 개선 방향**

서버 사이드 검색 API 구현 시 디바운스 적용 예정:

```typescript
// 계획된 구조 (미구현)
const debouncedSearch = useDebounce(searchTerm, 500)

useEffect(() => {
  if (debouncedSearch) {
    api.get(`/post/search?q=${debouncedSearch}`)
  }
}, [debouncedSearch])
```

**결과**

필요한 곳에만 최적화를 적용하여 과도한 엔지니어링을 지양하고, 실질적 성능 개선에 집중했습니다.

---

## 🛠️ 기술 스택

### Frontend

- **Framework**: React 18.x + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Context API + Custom Hooks
- **Code Highlighting**: Highlight.js
- **Markdown**: React Markdown

### Backend

- **API**: 위니브 제공 REST API
- **Authentication**: JWT Token

### Deployment

- **Hosting**: Firebase Hosting
- **CI/CD**: Firebase CLI

---

## 📂 프로젝트 구조

```
Terminal/
├── public/                     # 정적 파일
│   ├── icons/                  # 아이콘 파일
│   └── images/                 # 이미지 파일
└── src/
    ├── assets/                 # 리소스 파일
    ├── components/             # 재사용 컴포넌트
    │   ├── common/             # 공통 컴포넌트
    │   └── layout/             # 레이아웃 컴포넌트
    ├── contexts/               # React Context
    │   └── AuthContext.tsx     # 인증 관리
    ├── hooks/                  # 커스텀 훅
    │   └── useInfinityScroll.tsx
    ├── pages/                  # 페이지 컴포넌트
    │   ├── home/               # 홈 피드
    │   ├── login/              # 로그인
    │   ├── signup/             # 회원가입
    │   ├── profile/            # 프로필
    │   ├── post-create/        # 게시물 작성
    │   ├── post-detail/        # 게시물 상세
    │   ├── messages/           # 메시지
    │   └── settings/           # 설정
    ├── services/               # API 서비스
    │   ├── apiWrapper.ts       # API 호출 래퍼
    │   └── tokenManager.ts     # 토큰 관리
    ├── types/                  # TypeScript 타입
    │   └── api.ts              # API 타입 정의
    └── utils/                  # 유틸리티
        ├── configs.ts          # 설정
        ├── validation.ts       # 유효성 검사
        ├── timeUtils.ts        # 시간 포맷
        └── getImageLayout.ts   # 이미지 레이아웃
```

---

## 📱 페이지 구성

| 페이지               | 설명                              | 스크린샷                                                                                                  |
| -------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **홈 피드**          | 전체 게시물 조회 및 검색          | <img width="500" src="https://github.com/user-attachments/assets/04698700-226b-4b8c-967e-d4327017c85d" /> |
| **팔로우 피드**      | 팔로우한 사용자의 게시물만 표시   | <img width="500" src="https://github.com/user-attachments/assets/af09fd4f-f0b9-4ab4-b6dc-54077f17b0f9" /> |
| **게시물 상세**      | 게시물 및 댓글 상세 보기          | <img width="500" src="https://github.com/user-attachments/assets/223e1aca-5735-4c04-b840-08170f47bd29" /> |
| **게시물 작성**      | 마크다운 지원 게시물 작성         | <img width="500" src="https://github.com/user-attachments/assets/df577862-b3d8-478f-8030-73041b7dc39c" /> |
| **내 프로필**        | 본인 프로필 및 게시물 관리        | <img width="500" src="https://github.com/user-attachments/assets/9d90afb1-1df5-46fa-9b99-5b68545984fb" /> |
| **프로필 수정**      | 기술 스택 및 프로필 정보 수정     | <img width="500" src="https://github.com/user-attachments/assets/b5ab5fa8-0b39-4cfa-985e-1456557ea84c" /> |
| **다른 유저 프로필** | 다른 사용자 프로필 조회 및 팔로우 | <img width="500" src="https://github.com/user-attachments/assets/46c3ba23-8fb8-492f-ac73-93cff79bdb4c" /> |
| **메시지**           | 1:1 메시지 목록 및 대화           | <img width="500" src="https://github.com/user-attachments/assets/775c2b60-4f6f-4a5f-aa04-dc6c77955077" /> |
| **설정**             | 로그아웃 및 회원 탈퇴             | <img width="500" src="https://github.com/user-attachments/assets/3a222b31-07a5-4c11-ac6f-78822a0f6c47" /> |

---

## 🚀 시작하기

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-team/Terminal.git

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
```

### 환경변수

`.env` 파일에 다음 값을 설정하세요:

```env
VITE_APP_BASE_URL=https://dev.wenivops.co.kr/services/mandarin
```

### 개발 서버 실행

```bash
npm run dev
```

http://localhost:5173 에서 확인 가능합니다.

### 빌드

```bash
npm run build
```

### 배포

```bash
firebase deploy --only hosting
```

---

## 🔌 API 명세

### Base URL

```
https://dev.wenivops.co.kr/services/mandarin
```

### 인증

JWT Bearer Token 방식 사용

```json
{
  "Authorization": "Bearer {token}",
  "Content-Type": "application/json"
}
```

### 주요 엔드포인트

#### 사용자 관리

| Method | Endpoint                 | 설명              |
| ------ | ------------------------ | ----------------- |
| POST   | `/user`                  | 회원가입          |
| POST   | `/user/login`            | 로그인            |
| GET    | `/user/myinfo`           | 내 프로필 조회    |
| PUT    | `/user`                  | 프로필 수정       |
| POST   | `/user/emailvalid`       | 이메일 중복 검사  |
| POST   | `/user/accountnamevalid` | 계정 ID 중복 검사 |

#### 프로필

| Method | Endpoint                         | 설명             |
| ------ | -------------------------------- | ---------------- |
| GET    | `/profile/:accountname`          | 유저 프로필 조회 |
| POST   | `/profile/:accountname/follow`   | 팔로우           |
| DELETE | `/profile/:accountname/unfollow` | 언팔로우         |

#### 게시물

| Method | Endpoint                      | 설명             |
| ------ | ----------------------------- | ---------------- |
| POST   | `/post`                       | 게시물 작성      |
| GET    | `/post`                       | 전체 게시물 조회 |
| GET    | `/post/feed`                  | 팔로잉 피드      |
| GET    | `/post/:accountname/userpost` | 유저별 게시물    |
| GET    | `/post/:post_id`              | 게시물 상세      |
| DELETE | `/post/:post_id`              | 게시물 삭제      |
| POST   | `/post/:post_id/heart`        | 좋아요           |
| DELETE | `/post/:post_id/unheart`      | 좋아요 취소      |

#### 댓글

| Method | Endpoint                              | 설명      |
| ------ | ------------------------------------- | --------- |
| POST   | `/post/:post_id/comments`             | 댓글 작성 |
| GET    | `/post/:post_id/comments`             | 댓글 목록 |
| DELETE | `/post/:post_id/comments/:comment_id` | 댓글 삭제 |

#### 이미지 업로드

| Method | Endpoint             | 설명                                  |
| ------ | -------------------- | ------------------------------------- |
| POST   | `/image/uploadfile`  | 단일 이미지 업로드 (프로필)           |
| POST   | `/image/uploadfiles` | 다중 이미지 업로드 (게시물, 최대 3개) |

### 페이지네이션

쿼리 파라미터를 사용한 페이지네이션 지원:

```
?limit={불러올 개수}&skip={건너뛸 개수}
```

예시:

```
/post/feed/?limit=10&skip=0  // 첫 10개
/post/feed/?limit=10&skip=10 // 11-20번째
```

### 이미지 처리

1. 이미지를 먼저 업로드 (`/image/uploadfile` 또는 `/image/uploadfiles`)
2. 응답으로 받은 filename을 저장
3. 다른 API 요청 시 filename을 문자열로 전송

**이미지 제약사항:**

- 최대 크기: 10MB
- 지원 형식: jpg, gif, png, jpeg, bmp, tif, heic
- 게시물: 최대 3개까지 업로드 가능

### 에러 응답 예시

```json
// 401 Unauthorized
{
  "message": "유효하지 않은 토큰입니다.",
  "status": 401
}

// 404 Not Found
{
  "message": "해당 계정이 존재하지 않습니다.",
  "status": 404
}

// 422 Unprocessable Entity
{
  "message": "필수 입력사항을 입력해주세요.",
  "status": 422
}
```

---

## 👥 팀원 소개

|                                                  최진호                                                   |                                                  고우리                                                   |                                                  이지언                                                   |
| :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| <img width="150" src="https://github.com/user-attachments/assets/01be9828-85bc-4cd6-a81f-aabb058689d5" /> | <img width="150" src="https://github.com/user-attachments/assets/8da9e43d-2ad3-46b6-a720-4303dcadc9d6" /> | <img width="150" src="https://github.com/user-attachments/assets/61ae2583-aeac-4802-a7cc-65697441a4ce" /> |
|                                            Frontend Developer                                             |                                            Frontend Developer                                             |                                            Frontend Developer                                             |
|                              [@chlwlsgh777](https://github.com/chlwlsgh777)                               |                                 [@naru0000](https://github.com/naru0000)                                  |                                [@jiunlee19](https://github.com/jiunlee19)                                 |

### 주요 기여

**최진호**

- 추가 예정

**고우리**

- 재사용 컴포넌트 설계 (게시글, 댓글, 프로필, 입력창 등)
- API 연동 (게시글 상세, 댓글 시스템, 프로필 수정)
- 커스텀 훅 및 유틸 함수 작성 (시간 처리, 기술스택 관리)

**이지언**

- 프로젝트 초기 설정 및 인프라 구축 (Firebase, GitHub, Vite/React/TS)
- 전체 레이아웃 시스템 및 공통 컴포넌트 설계 (Sidebar, Button, Markdown 등)
- 인증 시스템 및 게시물 작성 기능 구현 (회원가입/로그인, 포스팅 API 연동)

---

## 📚 참고 자료

- **UI/UX 디자인**: [Figma](https://www.figma.com/design/nraI7JDUDBz0fxH3Cy8f18/Terminal)
- **프로젝트 관리**: [Notion - ChoiGoLee Terminal](https://www.notion.so/ChoiGoLee-Terminal-2786ab0bae768009aba0c4b8d68ed5ed)
- **API 명세서**: [API Documentation](https://www.notion.so/oreumi/API-25eebaa8982b8001819bece8f093932d)

---

## 📝 회고

### 최진호

> 추가 예정

### 고우리

> 리액트의 동작 원리를 이해하고, 컴포넌트 설계 과정에서 타입스크립트의 엄격한 관리가 처음에는 어렵게 느껴졌습니다. 하지만 이를 통해 설계의 안전성을 보장받을 수 있다는 점에서 필요성을 다시 깨달을 수 있었습니다. 또한 시스템 구축 과정에서 문제 해결 접근 방식을 배우는 좋은 계기가 되었습니다.
>
> 다만 이번 프로젝트에서는 ‘무계획으로 코드를 짜는 습관’을 버리지 못한 점이 아쉬웠습니다. 앞으로는 혼자 오래 고민하기보다 팀원들과 적극적으로 의논하며 빠르게 해결책을 찾아가는 개발자가 되고 싶습니다.

### 이지언

> 이번 프로젝트는 체계적인 기획 단계 없이 개발에 들어간 첫 경험이었습니다. 초기 설계의 중요성을 알면서도 어떤 부분까지 기획해야 하는지 명확하지 않아, 팀원들에게 필요성을 충분히 설명하지 못했습니다. 그 결과 전역 상태 관리, 디자인 시스템 등 사전에 정의했어야 할 부분들이 개발 중에 드러났고, 이는 불필요한 리팩토링으로 이어졌습니다.
>
> 하지만 이 과정에서 중요한 교훈을 얻었습니다. 개발 전 최소한의 디자인 가이드(색상, 타이포그래피, 컴포넌트 규칙)를 정의하고, 전역으로 관리할 상태를 미리 식별하는 방법을 체득했습니다. 다음 프로젝트에서는 이 경험을 바탕으로 더 탄탄한 설계부터 시작할 수 있을 것 같습니다.
