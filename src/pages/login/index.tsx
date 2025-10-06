import React, { useState } from 'react'
import BaseButton from '../../components/common/BaseButton'
import TextInput from '../../components/common/TextInput'
import { api } from '../../services/apiWrapper'
import type { UserAPI } from '../../types/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { validateEmail, validatePassword } from '../../utils/validation'
import { useTitle } from '../../hooks/usePageTitle'
interface ValidateErrors {
  email: string
  password: string
}

function Login(): React.JSX.Element {
  // 메타태그 타이틀
  useTitle('로그인 | Terminal')

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [inputEmail, setInputEmail] = useState('')
  const [inputPw, setInputPw] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const [validationErrors, setValidationErrors] = useState<ValidateErrors>({
    email: '',
    password: '',
  })

  const sessionExpiredMessage = location.state?.message
  const fromPath = location.state?.from || '/'

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value)
    setError('') // 입력 시 에러 메시지 초기화

    // 실시간 검증
    if (e.target.value && !validateEmail(e.target.value)) {
      setValidationErrors((prev) => ({
        ...prev,
        email: '올바른 이메일 형식을 입력해주세요.',
      }))
    } else {
      setValidationErrors((prev) => ({ ...prev, email: '' }))
    }
  }

  const handleInputPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPw(e.target.value)
    setError('') // 입력 시 에러 메시지 초기화

    // 실시간 검증
    if (e.target.value && !validatePassword(e.target.value)) {
      setValidationErrors((prev) => ({
        ...prev,
        password: '비밀번호는 6자 이상이어야 합니다.',
      }))
    } else {
      setValidationErrors((prev) => ({ ...prev, password: '' }))
    }
  }

  // 로그인 전 검증 함수
  const validateLoginFields = (): boolean => {
    const newErrors: ValidateErrors = {
      email: '',
      password: '',
    }
    let isValid = true

    // 이메일 검증
    if (!inputEmail.trim()) {
      newErrors.email = '이메일을 입력해주세요.'
      isValid = false
    } else if (!validateEmail(inputEmail)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.'
      isValid = false
    }

    // 비밀번호 검증
    if (!inputPw.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.'
      isValid = false
    } else if (!validatePassword(inputPw)) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.'
      isValid = false
    }

    setValidationErrors(newErrors)
    return isValid
  }

  const handleLogin = async (): Promise<void> => {
    // 프론트 검증 먼저
    if (!validateLoginFields()) {
      return // 검증 실패시 API 호출 중단
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

      // 토큰 저장 (AuthContext에서 처리하므로 중복이지만 안전장치로 유지)
      sessionStorage.setItem('token', response.token)

      // AuthContext의 login 함수 호출
      login(response.token, response)

      // 토큰 만료로 인해 로그인 페이지에 온 경우 원래 페이지로, 아니면 홈으로
      navigate(fromPath, { replace: true })
    } catch (error: any) {
      console.error('로그인 실패:', error)

      // 서버 에러 처리
      if (error.response?.data?.message) {
        const errorMessage = error.response.data
          .message as UserAPI.Login.Error['message']
        setError(errorMessage)
      } else {
        setError(
          error.message || '로그인 중 오류가 발생했습니다. 다시 시도해주세요.'
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-col justify-center content-center w-screen min-h-screen bg-black px-4">
      <div className="flex flex-col items-center justify-center pb-10">
        <span className="text-text-primary text-2xl mt-4 font-BoldRound">
          코드로 소통하는 개발자 전용 SNS
        </span>
        <span className="font-BoldRound text-primary  text-9xl">Terminal</span>
      </div>

      <div className="flex justify-center ">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
          }}
          className=" flex-col px-6 pt-8 space-y-4 border pb-10 border-background-border rounded-3xl max-w-[768px] w-full"
        >
          {/* 세션 만료 메시지 표시 */}
          {sessionExpiredMessage && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{sessionExpiredMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* 이메일 입력 */}
          <div>
            <label htmlFor="email" className="flex px-3 py-2">
              이메일
            </label>
            <TextInput
              onchange={handleInputEmail}
              value={inputEmail}
              placeholder="이메일을 입력하세요"
              size="md"
              border="fullRound"
              id="email"
              type="email"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1 px-4">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label htmlFor="password" className="flex px-3 py-2">
              비밀번호
            </label>
            <TextInput
              onchange={handleInputPw}
              value={inputPw}
              placeholder="비밀번호를 입력하세요 (6자 이상)"
              size="md"
              border="fullRound"
              id="password"
              type="password"
            />
            {validationErrors.password && (
              <p className="text-red-500 text-sm mt-1 px-4">
                {validationErrors.password}
              </p>
            )}
            {/* 비밀번호 길이 힌트 (입력 중일 때만) */}
            {inputPw && inputPw.length > 0 && inputPw.length < 6 && (
              <p className="text-yellow-500 text-sm mt-1 px-4">
                현재 {inputPw.length}자 (6자 이상 필요)
              </p>
            )}
          </div>

          {/* API 에러 메시지 */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* 로그인 버튼 */}
          <div className="pt-4">
            <BaseButton
              content={isLoading ? '로그인 중...' : '로그인'}
              ariaLabel="로그인 버튼"
              size="lg"
              color="primary"
              width="fullWidth"
              fontWeight="medium"
              onClick={handleLogin}
            />
          </div>

          {/* 회원가입 링크 */}
          <div className="text-center pt-4">
            <p className="text-text-secondary text-sm">
              계정이 없으신가요?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-primary hover:underline font-medium"
              >
                회원가입
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
