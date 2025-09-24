import React, { useState } from 'react'
import BaseButton from '../../components/common/BaseButton'
import TextInput from '../../components/common/TextInput'
import { api } from '../../services/apiWrapper'
import { Header } from '../../components/common/Header'
import type { UserAPI } from '../../types/api'
import { useNavigate } from 'react-router-dom'

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

      // 토큰 저장
      localStorage.setItem('token', response.token)

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
      <Header title="로그인" buttons={{ back: { show: true } }} />

      <div className="px-6 pt-8 space-y-4">
        <TextInput
          onchange={handleInputEmail}
          value={inputEmail}
          placeholder="이메일을 입력하세요"
          size="md"
          border="fullRound"
          id="email"
          label="email"
          type="email"
        />

        <TextInput
          onchange={handleInputPw}
          value={inputPw}
          placeholder="비밀번호를 입력하세요"
          size="md"
          border="fullRound"
          id="password"
          label="password"
          type="password"
        />

        {error && (
          <div className="text-red-500 text-sm text-center mt-2">{error}</div>
        )}

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
      </div>
    </div>
  )
}

export default Login
