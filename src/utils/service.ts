// 공통 타입 정의
export namespace Common {
  export interface User {
    _id: string
    username: string
    email: string
    accountname: string
    intro: string
    image: string
    isfollow: boolean
    following: string[]
    follower: string[]
    followerCount: number
    followingCount: number
  }

  export interface Post {
    id: string
    content: string
    image: string
    createdAt: string
    updatedAt: string
    hearted: boolean
    heartCount: number
    comments: Comment[]
    commentCount: number
    author: User
  }

  export interface Comment {
    id: string
    content: string
    createdAt: string
    author: User
  }

  export interface Product {
    id: string
    itemName: string
    price: number
    link: string
    itemImage: string
    createdAt: string
    updatedAt: string
    author: User
  }

  export interface ApiError {
    message: string
    status: number
    error?: string
    statusCode?: number
  }

  export interface AuthHeaders {
    Authorization: string
    'Content-Type': 'application/json'
  }

  export interface MultipartHeaders {
    'Content-Type': 'multipart/form-data'
  }

  export interface PaginationQuery {
    limit?: number
    skip?: number
  }
}

// 이미지 관련 API
namespace ImageAPI {
  export namespace UploadSingle {
    export interface Req extends FormData {
      image: File
    }

    export interface Res {
      message: string
      info: {
        fieldname: string
        originalname: string
        encoding: string
        mimetype: string
        destination: string
        filename: string
        path: string
        size: number
      }
    }

    export interface Error {
      message: '이미지 파일만 업로드가 가능합니다.'
    }
  }

  export namespace UploadMultiple {
    export interface Req extends FormData {
      image: File[]
    }

    export interface Res {
      message: string
      info: Array<{
        fieldname: string
        originalname: string
        encoding: string
        mimetype: string
        destination: string
        filename: string
        path: string
        size: number
      }>
    }

    export interface Error {
      message:
        | '이미지 파일만 업로드가 가능합니다.'
        | '최대 3개까지만 업로드 가능합니다'
    }
  }
}

// 유저 관련 API
namespace UserAPI {
  export namespace SignUp {
    export interface Req {
      user: {
        username: string
        email: string
        password: string
        accountname: string
        intro?: string
        image?: string
      }
    }

    export interface Res {
      message: string
      user: {
        accountname: string
        email: string
        image: string
        intro: string
        username: string
        _id: string
      }
    }

    export interface Error {
      message:
        | '필수 입력사항을 입력해주세요.'
        | '비밀번호는 6자 이상이어야 합니다.'
        | '잘못된 이메일 형식입니다.'
        | '이미 가입된 이메일 주소입니다.'
        | '영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.'
        | '이미 사용중인 계정 ID입니다.'
    }
  }

  export namespace Login {
    export interface Req {
      user: {
        email: string
        password: string
      }
    }

    export interface Res {
      _id: string
      username: string
      email: string
      accountname: string
      intro: string
      image: string
      refreshToken: string
      token: string
    }

    export interface Error {
      message:
        | '이메일 또는 비밀번호를 입력해주세요.'
        | '이메일을 입력해주세요.'
        | '비밀번호를 입력해주세요.'
        | '이메일 또는 비밀번호가 일치하지 않습니다.'
      status: 422
    }
  }

  export namespace MyInfo {
    export interface Res {
      user: Common.User
    }

    export interface Error extends Common.ApiError {}
  }

  export namespace EmailValidation {
    export interface Req {
      user: {
        email: string
      }
    }

    export interface Res {
      message:
        | '사용 가능한 이메일 입니다.'
        | '이미 가입된 이메일 주소 입니다.'
        | '잘못된 접근입니다.'
    }

    export interface Error {
      message: '잘못된 이메일 형식입니다.'
      status: 422
    }
  }

  export namespace AccountValidation {
    export interface Req {
      user: {
        accountname: string
      }
    }

    export interface Res {
      message: '사용 가능한 계정ID 입니다.' | '이미 가입된 계정ID 입니다.'
    }

    export interface Error {
      message: '잘못된 접근입니다.'
    }
  }

  export namespace CheckToken {
    export interface Res {
      isValid: boolean
    }

    export interface Error {
      message: '유효하지 않은 토큰입니다.' | '토큰이 없습니다.'
      status: 401
    }
  }
}

// 프로필 관련 API
namespace ProfileAPI {
  export namespace UpdateProfile {
    export interface Req {
      user: {
        username: string
        accountname: string
        intro: string
        image: string
      }
    }

    export interface Res {
      user: Common.User
    }

    export interface Error {
      message: '이미 사용중인 계정 ID입니다.' | '유효하지 않은 토큰입니다.'
      error?: 'Conflict'
      statusCode?: 409
      status?: 401
    }
  }

  export namespace GetProfile {
    export interface Res {
      profile: Common.User
    }

    export interface Error {
      message: '해당 계정이 존재하지 않습니다.'
    }
  }

  export namespace Follow {
    export interface Res {
      profile: Common.User
    }

    export interface Error {
      message:
        | '해당 계정이 존재하지 않습니다.'
        | '자기 자신을 팔로우 할 수 없습니다.'
        | '유효하지 않은 토큰입니다.'
      error?: 'Not Found'
      statusCode?: 404
      status?: 401
    }
  }

  export namespace Unfollow {
    export interface Res {
      profile: Common.User
    }

    export interface Error {
      message: '해당 계정이 존재하지 않습니다.' | '유효하지 않은 토큰입니다.'
      error?: 'Not Found'
      statusCode?: 404
      status?: 401
    }
  }

  export namespace FollowingList {
    export interface Res extends Array<Common.User> {}

    export interface Error {
      message:
        | '팔로잉 목록이 존재하지 않습니다.'
        | '해당 계정이 존재하지 않습니다.'
        | '유효하지 않은 토큰입니다.'
      error?: 'Not Found'
      statusCode?: 404
      status?: 404 | 401
    }
  }

  export namespace FollowerList {
    export interface Res extends Array<Common.User> {}

    export interface Error {
      message:
        | '팔로워 목록이 존재하지 않습니다.'
        | '해당 계정이 존재하지 않습니다.'
        | '유효하지 않은 토큰입니다.'
      error?: 'Not Found'
      statusCode?: 404
      status?: 404 | 401
    }
  }
}

// 검색 관련 API
namespace SearchAPI {
  export namespace SearchUser {
    export interface Res extends Array<Common.User> {}

    export interface Error {
      message:
        | '사용자를 찾을 수 없습니다.'
        | '검색어를 입력해주세요.'
        | '유효하지 않은 토큰입니다.'
      error?: 'Not Found' | 'Bad Request'
      statusCode?: 404 | 400
      status?: 401
    }
  }
}

// 게시글 관련 API
namespace PostAPI {
  export namespace CreatePost {
    export interface Req {
      post: {
        content: string
        image?: string
      }
    }

    export interface Res {
      post: Common.Post[]
    }

    export interface Error {
      message: '내용 또는 이미지를 입력해주세요.' | '유효하지 않은 토큰입니다.'
      status: 422 | 401
    }
  }

  export namespace GetFeed {
    export interface Res {
      posts: Common.Post[]
    }

    export interface Error {
      message: '유효하지 않은 토큰입니다.'
      status: 401
    }
  }

  export namespace GetUserPosts {
    export interface Res {
      post: Common.Post[]
    }

    export interface Error {
      message: '해당 계정이 존재하지 않습니다.' | '유효하지 않은 토큰입니다.'
      status: 404 | 401
    }
  }

  export namespace GetPostDetail {
    export interface Res {
      post: Common.Post
    }

    export interface Error {
      message: '유효하지 않은 게시글 ID입니다.' | '유효하지 않은 토큰입니다.'
      status: 404 | 401
    }
  }

  export namespace UpdatePost {
    export interface Req {
      post: {
        content: string
        image?: string
      }
    }

    export interface Res {
      post: Common.Post
    }

    export interface Error {
      message:
        | '유효하지 않은 게시글 ID입니다.'
        | '잘못된 요청입니다. 로그인 정보를 확인하세요'
        | '유효하지 않은 토큰입니다.'
      status: 404 | 403 | 401
    }
  }

  export namespace DeletePost {
    export interface Res {
      message: '삭제되었습니다.'
      status: 200
    }

    export interface Error {
      message:
        | '유효하지 않은 게시글 ID입니다.'
        | '잘못된 요청입니다. 로그인 정보를 확인하세요'
        | '유효하지 않은 토큰입니다.'
      status: 404 | 403 | 401
    }
  }

  export namespace ReportPost {
    export interface Res {
      report: {
        post: string
        createdAt: string
      }
    }

    export interface Error {
      message: '유효하지 않은 게시글 ID입니다.' | '유효하지 않은 토큰입니다.'
      status: 404 | 401
    }
  }

  export namespace GetAllPosts {
    export interface Res {
      posts: Common.Post[]
    }

    export interface Error extends Common.ApiError {}
  }
}

// 좋아요 관련 API
namespace HeartAPI {
  export namespace AddHeart {
    export interface Res {
      post: Common.Post
    }

    export interface Error {
      message: '유효하지 않은 게시글 ID입니다.' | '유효하지 않은 토큰입니다.'
      status: 404 | 401
    }
  }

  export namespace RemoveHeart {
    export interface Res {
      post: Common.Post
    }

    export interface Error {
      message: '유효하지 않은 게시글 ID입니다.' | '유효하지 않은 토큰입니다.'
      status: 404 | 401
    }
  }
}

// 댓글 관련 API
namespace CommentAPI {
  export namespace CreateComment {
    export interface Req {
      comment: {
        content: string
      }
    }

    export interface Res {
      comment: Common.Comment
    }

    export interface Error {
      message: '유효하지 않은 게시글 ID입니다.' | '유효하지 않은 토큰입니다.'
      status: 404 | 401
    }
  }

  export namespace GetComments {
    export interface Res {
      comment: Common.Comment[]
    }

    export interface Error {
      message: '유효하지 않은 게시글 ID입니다.'
      status: 404
    }
  }

  export namespace DeleteComment {
    export interface Res {
      message: '댓글이 삭제되었습니다.'
      status: 200
    }

    export interface Error {
      message:
        | '유효하지 않은 게시글 ID입니다.'
        | '댓글이 존재하지 않습니다.'
        | '댓글 작성자만 댓글을 삭제할 수 있습니다.'
        | '유효하지 않은 토큰입니다.'
      status: 404 | 403 | 401
    }
  }

  export namespace ReportComment {
    export interface Res {
      report: {
        comment: string
        createdAt: string
      }
    }

    export interface Error {
      message: '유효하지 않은 게시글 ID입니다.' | '유효하지 않은 토큰입니다.'
      status: 404 | 401
    }
  }
}

// 상품 관련 API
namespace ProductAPI {
  export namespace CreateProduct {
    export interface Req {
      product: {
        itemName: string
        price: number
        link: string
        itemImage: string
      }
    }

    export interface Res {
      product: Common.Product
    }

    export interface Error {
      message:
        | '필수 입력사항을 입력해주세요.'
        | '가격은 숫자로 입력하셔야 합니다.'
        | '유효하지 않은 토큰입니다.'
      status: 422 | 401
    }
  }

  export namespace GetProducts {
    export interface Res {
      data: number
      product: Common.Product[]
    }

    export interface Error {
      message: '해당 계정이 존재하지 않습니다.' | '유효하지 않은 토큰입니다.'
      status: 404 | 401
    }
  }

  export namespace GetProductDetail {
    export interface Res {
      product: Common.Product
    }

    export interface Error {
      message: '유효하지 않은 상품 ID입니다.' | '유효하지 않은 토큰입니다.'
      status: 404 | 401
    }
  }

  export namespace UpdateProduct {
    export interface Req {
      product: {
        itemName: string
        price: number
        link: string
        itemImage: string
      }
    }

    export interface Res {
      product: Common.Product
    }

    export interface Error {
      message:
        | '유효하지 않은 상품 ID입니다.'
        | '잘못된 요청입니다. 로그인 정보를 확인하세요'
        | '유효하지 않은 토큰입니다.'
      status: 404 | 403 | 401
    }
  }

  export namespace DeleteProduct {
    export interface Res {
      message: '삭제되었습니다.'
      status: 200
    }

    export interface Error {
      message:
        | '유효하지 않은 상품 ID입니다.'
        | '잘못된 요청입니다. 로그인 정보를 확인하세요'
        | '유효하지 않은 토큰입니다.'
      status: 404 | 403 | 401
    }
  }
}

// API 함수 타입 정의 예시
namespace APIFunctions {
  export type APICall<TReq, TRes, TError = Common.ApiError> = (
    params: TReq,
    options?: {
      headers?: Record<string, string>
      signal?: AbortSignal
    }
  ) => Promise<TRes>

  // 사용 예시 타입들
  export type LoginAPI = APICall<
    UserAPI.Login.Req,
    UserAPI.Login.Res,
    UserAPI.Login.Error
  >
  export type CreatePostAPI = APICall<
    PostAPI.CreatePost.Req,
    PostAPI.CreatePost.Res,
    PostAPI.CreatePost.Error
  >
  export type GetFeedAPI = APICall<
    Common.PaginationQuery,
    PostAPI.GetFeed.Res,
    PostAPI.GetFeed.Error
  >
}
