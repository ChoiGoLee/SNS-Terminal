import React from 'react'
import BaseButton from '../../components/common/BaseButton'
import styles from '../../assets/css/login.module.css'

function Login(): React.JSX.Element {
  const navigate = useNavigate()

  const [inputEmail, setInputEmail] = useState('')
  const [inputPw, setInputPw] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value)
    setError('') // 입력 시 에러 메시지 초기화
  }

  const handleInputPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPw(e.target.value)
    setError('') // 입력 시 에러 메시지 초기화
  }

  const handleLogin = async (): Promise<void> => {
    // 입력값 검증
    if (!inputEmail || !inputPw) {
      setError('이메일과 비밀번호를 모두 입력해주세요.')
      return
    }

    setIsLoading(true)
    setError('')

    // api.ts의 타입 정의를 사용한 요청 데이터
    const loginData: UserAPI.Login.Req = {
      user: {
        email: inputEmail,
        password: inputPw,
      },
    }

    try {
      const response: UserAPI.Login.Res = await api.post(
        '/user/login',
        loginData,
        {
          requiresAuth: false,
        }
      )

      console.log('로그인 성공:', response)

      // 토큰 저장 세션 스토리지에 저장
      sessionStorage.setItem('token', response.token)

      // 홈 페이지로 이동
      navigate('/')
    } catch (error: any) {
      console.error('로그인 실패:', error)

      // api.ts에 정의된 에러 타입에 따른 에러 처리
      if (error.response?.data?.message) {
        const errorMessage = error.response.data
          .message as UserAPI.Login.Error['message']
        setError(errorMessage)
      } else {
        setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen bg-black">
      <div>
        <div className={styles['login-btn-container']}>
          {provider.map((p, i) => {
            return (
              <BaseButton
                key={i}
                content={`Continue with ${
                  p.charAt(0).toUpperCase() + p.slice(1)
                }`}
                icon={`public/icons/${p}.svg`}
                ariaLabel={`login with ${p} button`}
                size="lg"
                color="primary"
                width="fullWidth"
                fontWeight="medium"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Login
