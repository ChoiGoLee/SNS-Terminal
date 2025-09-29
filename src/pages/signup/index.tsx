import React, { useState } from 'react'
import BaseButton from '../../components/common/BaseButton'
import TextInput from '../../components/common/TextInput'
import { api } from '../../services/apiWrapper'
import type { UserAPI } from '../../types/api'
import { useNavigate } from 'react-router-dom'
import {
  validateEmail,
  validateAccountID,
  validatePassword,
  validateUserName,
} from '../../utils/validation'
import { useTitle } from '../../hooks/usePageTitle'

interface ValidateErrors {
  email: string
  password: string
  accountName: string
  userName: string
  intro: string
}

function Signup(): React.JSX.Element {
  // 메타태그 타이틀
  useTitle('회원가입 | Terminal')

  const navigate = useNavigate()

  const [inputUserName, setInputUserName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [inputAccountName, setInputAccountName] = useState('')
  const [inputIntro, setInputIntro] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 에러상태
  const [apiError, setApiError] = useState<string>('')

  // 각 필드별 검증 에러 상태
  const [validationErrors, setValidationErrors] = useState<ValidateErrors>({
    userName: '',
    email: '',
    password: '',
    accountName: '',
    intro: '',
  })

  const handleInputUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUserName(e.target.value)
    setApiError('')
  }

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value)
    setApiError('')
  }

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value)
    setApiError('')
  }

  const handleInputAccountName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAccountName(e.target.value)
    setApiError('')
  }

  const handleInputIntro = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIntro(e.target.value)
    setApiError('')
  }

  const validateAllFields = (): boolean => {
    const newErrors: ValidateErrors = {
      userName: '',
      email: '',
      password: '',
      accountName: '',
      intro: '',
    }
    let isValid = true

    if (!inputUserName.trim()) {
      newErrors.userName = '사용자 이름을 입력해주세요'
      isValid = false
    } else {
      const userNameError = validateUserName(inputUserName)
      if (userNameError) {
        newErrors.userName = userNameError
        isValid = false
      }
    }

    if (!inputEmail.trim()) {
      newErrors.email = '이메일을 입력해주세요'
      isValid = false
    } else if (!validateEmail(inputEmail)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다'
      isValid = false
    }

    if (!inputPassword.trim()) {
      newErrors.password = '비밀번호를 입력해주세요'
      isValid = false
    } else if (!validatePassword(inputPassword)) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다'
      isValid = false
    }

    if (!inputAccountName.trim()) {
      newErrors.accountName = '계정명을 입력해주세요'
      isValid = false
    } else {
      const accountError = validateAccountID(inputAccountName)
      if (accountError) {
        newErrors.accountName = accountError
        isValid = false
      }
    }

    setValidationErrors(newErrors)
    return isValid
  }

  const handleSignup = async (): Promise<void> => {
    if (!validateAllFields()) {
      return // 검증 실패시 여기서 중단
    }

    setIsLoading(true)
    setApiError('')

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
        setApiError(errorMessage)
      } else {
        setApiError(
          error.message || '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.'
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-col justify-center content-center w-screen min-h-screen bg-black px-4">
      <div className="flex justify-center pb-10">
        <span className="font-BoldRound text-primary  text-9xl">Terminal</span>
      </div>
      <div className="flex justify-center ">
        <div className=" flex-col px-6 pt-8 space-y-4 border pb-10 border-background-border rounded-3xl max-w-[768px] w-full">
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
              onchange={handleInputPassword}
              value={inputPassword}
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
            {/* 비밀번호 길이 힌트 */}
            {inputPassword && (
              <p
                className={`text-sm mt-1 px-4 ${
                  inputPassword.length >= 6
                    ? 'text-green-500'
                    : 'text-yellow-500'
                }`}
              >
                현재 {inputPassword.length}자{' '}
                {inputPassword.length >= 6 ? '✓' : '(6자 이상 필요)'}
              </p>
            )}
          </div>

          {/* 사용자 이름 입력 */}
          <div>
            <label htmlFor="username" className="flex px-3 py-2">
              사용자 이름
            </label>
            <TextInput
              onchange={handleInputUserName}
              value={inputUserName}
              placeholder="사용자 이름을 입력하세요"
              size="md"
              border="fullRound"
              id="username"
              type="text"
            />
            {validationErrors.userName && (
              <p className="text-red-500 text-sm mt-1 px-4">
                {validationErrors.userName}
              </p>
            )}
          </div>

          {/* 소개글 입력 (선택사항) */}
          <div>
            <label htmlFor="intro" className="flex px-3 py-2">
              소개글
            </label>
            <TextInput
              onchange={handleInputIntro}
              value={inputIntro}
              placeholder="소개글을 입력하세요 (선택사항)"
              size="md"
              border="fullRound"
              id="intro"
              type="text"
            />
          </div>

          {/* 계정명 입력 */}
          <div>
            <label htmlFor="accountname" className="flex px-3 py-2">
              계정명
            </label>
            <TextInput
              onchange={handleInputAccountName}
              value={inputAccountName}
              placeholder="계정명을 입력하세요 (영어, 숫자, ., _만)"
              size="md"
              border="fullRound"
              id="accountname"
              type="text"
            />
            {validationErrors.accountName && (
              <p className="text-red-500 text-sm mt-1 px-4">
                {validationErrors.accountName}
              </p>
            )}
          </div>

          {/* API 에러 메시지 */}
          {apiError && (
            <div className="p-4 mt-4">
              <p className="text-red-600 text-lg text-center">{apiError}</p>
            </div>
          )}

          {/* 회원가입 버튼 */}
          <div className="pt-6">
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
        </div>
      </div>
      <div className="flex justify-center">
        <div className="text-center pt-4">
          <p className="text-text-secondary text-sm">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary hover:underline font-medium"
            >
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
