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
| **홈 피드**          | 전체 게시물 조회 및 검색          | <img width="300" src="https://github.com/user-attachments/assets/04698700-226b-4b8c-967e-d4327017c85d" /> |
| **팔로우 피드**      | 팔로우한 사용자의 게시물만 표시   | <img width="300" src="https://github.com/user-attachments/assets/af09fd4f-f0b9-4ab4-b6dc-54077f17b0f9" /> |
| **게시물 상세**      | 게시물 및 댓글 상세 보기          | <img width="300" src="https://github.com/user-attachments/assets/223e1aca-5735-4c04-b840-08170f47bd29" /> |
| **게시물 작성**      | 마크다운 지원 게시물 작성         | <img width="300" src="https://github.com/user-attachments/assets/df577862-b3d8-478f-8030-73041b7dc39c" /> |
| **내 프로필**        | 본인 프로필 및 게시물 관리        | <img width="300" src="https://github.com/user-attachments/assets/9d90afb1-1df5-46fa-9b99-5b68545984fb" /> |
| **프로필 수정**      | 기술 스택 및 프로필 정보 수정     | <img width="300" src="https://github.com/user-attachments/assets/7e1296a4-bf17-4998-99a9-fe542fb537f5" /> |
| **다른 유저 프로필** | 다른 사용자 프로필 조회 및 팔로우 | <img width="300" src="https://github.com/user-attachments/assets/46c3ba23-8fb8-492f-ac73-93cff79bdb4c" /> |
| **메시지**           | 1:1 메시지 목록 및 대화           | <img width="300" src="https://github.com/user-attachments/assets/775c2b60-4f6f-4a5f-aa04-dc6c77955077" /> |
| **설정**             | 로그아웃 및 회원 탈퇴             | <img width="300" src="https://github.com/user-attachments/assets/3a222b31-07a5-4c11-ac6f-78822a0f6c47" /> |

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
|                                         게시물 CRUD, 프로필 관리                                          |                                         인증/인가, 레이아웃 설계                                          |                                          댓글 기능, 메시지 구현                                           |

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

> 추가 예정

### 이지언

> 추가 예정

---

## 📄 라이선스

This project is licensed under the MIT License.

---

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면 Pull Request를 보내주세요.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
