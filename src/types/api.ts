// 로그인 요청
export interface LoginRequest {
  user: {
    email: string
    password: string
  }
}

// 사용자 정보 타입
export interface User {
  _id: string
  username: string
  email: string
  accountname: string
  image: string
  token: string // token이 user 객체 안에 있음
}

// 로그인 응답 타입
export interface LoginResponse {
  user: User
}
