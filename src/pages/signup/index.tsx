import React, { useState } from 'react'
import BaseButton from '../../components/common/BaseButton'
import TextInput from '../../components/common/TextInput'
import { Header } from '../../components/common/Header'
import { api } from '../../services/apiWrapper'
import type { UserAPI } from '../../types/api'
import { useNavigate } from 'react-router-dom'

function Signup(): React.JSX.Element {
  const navigate = useNavigate()

  const [inputUserName, setInputUserName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [inputAccountName, setInputAccountName] = useState('')
  const [inputIntro, setInputIntro] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleInputUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUserName(e.target.value)
    setError('')
  }
  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value)
    setError('')
  }
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value)
    setError('')
  }
  const handleInputAccountName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAccountName(e.target.value)
    setError('')
  }
  const handleInputIntro = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIntro(e.target.value)
    setError('')
  }

  const handleSignup = async (): Promise<void> => {
    if (!inputUserName || !inputEmail || !inputPassword || !inputAccountName) {
      setError('모든 내용을 입력해주세요')
      return
    }

    setIsLoading(true)
    setError('')

    // api.ts의 타입 정의를 사용한 요청 데이터
    const signupData: UserAPI.SignUp.Req = {
      user: {
        username: inputUserName,
        email: inputEmail,
        password: inputPassword,
        accountname: inputAccountName,
        intro: inputIntro,
      },
    }

    try {
      const response: UserAPI.SignUp.Res = await api.post('/user', signupData, {
        requiresAuth: false,
      })

      console.log('회원가입 성공:', response)
      navigate('/')
    } catch (error: any) {
      console.error('회원가입 실패:', error)

      // api.ts에 정의된 에러 타입에 따른 에러 처리
      if (error.response?.data?.message) {
        const errorMessage = error.response.data
          .message as UserAPI.SignUp.Error['message']
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
      <TextInput
        onchange={handleInputUserName}
        value={inputUserName}
        placeholder="유저 이름을 입력하세요"
        size="md"
        border="fullRound"
        id="username"
        type="text"
      />
      <TextInput
        onchange={handleInputEmail}
        value={inputEmail}
        placeholder="이메일을 입력하세요"
        size="md"
        border="fullRound"
        id="email"
        type="email"
      />
      <TextInput
        onchange={handleInputPassword}
        value={inputPassword}
        placeholder="비밀번호를 입력하세요"
        size="md"
        border="fullRound"
        id="password"
        type="password"
      />
      <TextInput
        onchange={handleInputAccountName}
        value={inputAccountName}
        placeholder="계정명을 입력하세요"
        size="md"
        border="fullRound"
        id="accountname"
        type="accountname"
      />
      <TextInput
        onchange={handleInputIntro}
        value={inputIntro}
        placeholder="소개글을 입력하세요"
        size="md"
        border="fullRound"
        id="intro"
        type="intro"
      />
      {error && (
        <div className="text-red-500 text-sm text-center mt-2">{error}</div>
      )}
      <BaseButton
        content={isLoading ? '회원가입 중...' : '회원가입'}
        ariaLabel="회원가입 버튼"
        size="lg"
        color="primary"
        width="fullWidth"
        fontWeight="medium"
        onClick={handleSignup}
      />
    </div>
  )
}
export default Signup
