import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import Avatar from '../../components/common/Avatar'
import BaseButton from '../../components/common/BaseButton'
import TextInput from '../../components/common/TextInput'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/apiWrapper'
import type { UserAPI, ProfileAPI } from '../../types/api'
import { API_BASE_URL } from '../../utils/configs'
import { TECH_STACK } from '../../utils/profileStack'
import {
  validateImageExtend,
  validateImageSize,
  validateUserName,
} from '../../utils/validation'
import { LoadIntroData } from '../../utils/profileStackLoad'

function ProfileSetting(): React.JSX.Element {
  const navigate = useNavigate()

  // 유저 정보 및 프로필 이미지 상태 관리
  const [inputNameValue, setInputNameValue] = useState('')
  const [inputIntroValue, setInputIntroValue] = useState('')
  const [inputStackValue, setInputStackValue] = useState('')
  const [selectedStack, setSelectedStack] = useState<string[]>([])
  const [userAcountName, setUserAcountName] = useState('')
  const [nameError, setNameError] = useState<string>('')
  const [introError, setIntroError] = useState<string>('')
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [textCount, setTextCount] = useState(0)

  // 프로필 이미지 관련 상태

  // 서버에서 받은 이미지 URL
  const [userImage, setUserImage] = useState('')
  // 업로드할 이미지 파일
  const [image, setImage] = useState<File | null>(null)
  // 미리보기용 이미지 URL
  const [previewUrl, setpriviewUrl] = useState('')

  // 입력값 및 폼 이벤트 핸들러
  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(e.target.value)
    setNameError('')
  }

  const handleInputIntro = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputIntroValue(e.target.value)
    setTextCount(e.target.value.length)
    setIntroError('')
  }

  const handleInputStack = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputStackValue(e.target.value)
  }

  const handleStackReset = () => {
    setInputStackValue('')
  }

  // 기술스택 필터링
  const stackFilter = TECH_STACK.filter(
    (stack: string) =>
      stack.toLowerCase().includes(inputStackValue.toLowerCase()) &&
      !selectedStack.includes(stack)
  )

  // 기술스택 추가
  const stackAdd = (stack: string) => {
    setSelectedStack([...selectedStack, stack])
    setInputStackValue('')
  }

  // 기술스택 삭제
  const stackDelete = (stack: string) => {
    setSelectedStack(selectedStack.filter((item) => item !== stack))
  }

  // 프로필 정보 불러오기 함수
  const handleProfileLoad = async (): Promise<void> => {
    try {
      const response: UserAPI.MyInfo.Res = await api.get('/user/myinfo')

      setInputNameValue(response.user.username)
      setInputIntroValue(response.user.intro)
      setUserImage(response.user.image)
      setUserAcountName(response.user.accountname)

      const serverIntroData = response.user.intro

      // 기술스택 불러오기 함수 사용(자기소개 텍스트,기술스택 나누기)
      const { finalIntroduce, finalStack } = LoadIntroData(serverIntroData)

      setInputIntroValue(finalIntroduce)
      setSelectedStack(finalStack)

      console.log('프로필 불러오기를 성공했습니다.', response)
    } catch (error) {
      console.error('프로필 불러오기 실패:', error)
      alert('프로필 불러오기를 실패했습니다.')
    }
  }

  // 마운트 시 1회만 실행
  useEffect(() => {
    // 로그인 하지 않을시 로그인페이지로 이동
    const token = sessionStorage.getItem('token')
    if (!token) {
      alert('로그인이 필요합니다.')
      navigate('/login')
      return
    }
    handleProfileLoad()
  }, [navigate])

  // 프로필 수정 함수

  const handleProfileUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    let imageUrl = userImage

    e.preventDefault()

    // 기존 이미지와 업로드된 이미지 중 표시할 이미지를 선택

    async function checkImage() {
      console.log(image)

      if (image) {
        const formdata = new FormData()
        formdata.append('image', image)
        try {
          const response = await fetch(API_BASE_URL + '/image/uploadfile', {
            method: 'POST',
            body: formdata,
          })

          if (!response.ok) {
            throw new Error('프로필 이미지 표시 에러가 발생했습니다.')
          }

          const data = await response.json()

          return (imageUrl = data.info.filename)
        } catch (error) {
          console.error(error)
          alert(error)
        }
      }
    }
    console.log('imageurl:', imageUrl)

    await checkImage()

    // 기술스택 저장
    const stackToString = selectedStack.join(',')
    const stackToSave = `${inputIntroValue}§$${stackToString}`

    // 요청 데이터
    const userUpdateData: ProfileAPI.UpdateProfile.Req = {
      user: {
        username: inputNameValue,
        accountname: userAcountName,
        intro: stackToSave,
        image: imageUrl,
      },
    }

    console.log('요청 데이터:', userUpdateData)

    // 유저네임 검증
    if (!validateUserName(inputNameValue)) {
      setNameError('이름을 입력해주세요.')
      return
    }

    //자기소개 검증
    if (!inputIntroValue) {
      setIntroError('introduce를 입력해주세요.')
      return
    }

    setIsUploadLoading(true)
    setNameError('')
    setIntroError('')

    try {
      const response: ProfileAPI.UpdateProfile.Res = await api.put(
        '/user',
        userUpdateData
      )

      console.log('프로필 수정 성공:', response)
      navigate('/profile')
    } catch (error) {
      console.error('프로필 수정 실패', error)
    } finally {
      setIsUploadLoading(false)
    }
  }

  // 프로필 이미지 미리보기 함수

  const handleUserImagepriview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0]
      if (file) {
        // 이미지 확장자 검증
        if (!validateImageExtend(file)) {
          alert('jpg,gif,png,jpeg,bmp,tif,heic 확장자만 업로드 가능합니다.')
          return
        }

        // 이미지 크기 검증
        if (!validateImageSize(file)) {
          alert('이미지 크기는 10mb를 초과할 수 없습니다.')
          return
        }

        const url = window.URL.createObjectURL(file)
        setpriviewUrl(url)
        setImage(file)
      }
    }
  }

  // 프로필 이미지 삭제 함수

  const handleUserImageDelete = () => {
    window.URL.revokeObjectURL(previewUrl)
    setpriviewUrl('')
    setImage(null)
  }

  return (
    <>
      <div className="flex min-h-screen">
        <div>
          <SideBar isAuthenticated={true} activeItem="/settings" />
        </div>
        <div className="mx-auto border-x min-w-[769px] border-background-border border-r border-l">
          <Header title="프로필 편집" buttons={{ back: { show: true } }} />
          <form
            className="p-6"
            onSubmit={handleProfileUpdate}
            encType="multipart/form-data"
          >
            <p className="text-lg font-bold mb-4">프로필 사진</p>
            <section className="flex gap-8 mb-8">
              <Avatar
                userImage={
                  previewUrl
                    ? previewUrl
                    : userImage.includes('Ellipse')
                    ? undefined
                    : API_BASE_URL + '/' + userImage
                }
                userName={inputNameValue}
                size="lg"
              />
              <div className="flex flex-col items-start gap-2">
                <div className="flex gap-4">
                  <label
                    htmlFor="useImageUpload"
                    className="flex text-center items-center bg-primary border-background-border text-black hover:bg-primary-dark disabled:opacity-30  rounded-full cursor-pointer justify-center px-4 py-2 text-[14px] gap-2"
                    aria-label="프로필 이미지 업로드"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="useImageUpload"
                      className="hidden"
                      name="프로필 이미지 업로드"
                      onChange={handleUserImagepriview}
                    />
                    프로필 이미지 업로드
                  </label>
                  <BaseButton
                    content="삭제하기"
                    fontWeight="normal"
                    ariaLabel="프로필 업로드 이미지 삭제"
                    width="flexWidth"
                    color="surface"
                    size="sm"
                    onClick={() => handleUserImageDelete()}
                  />
                </div>
                <p className="text-sm text-text-secondary">
                  이미지는 10mb이하의 jpg,gif,png,jpeg,bmp,tif,heic 확장자로
                  올려주세요.
                </p>
              </div>
            </section>
            <section className="mb-8">
              <p className="text-lg font-bold mb-4">이름</p>
              <TextInput
                size="lg"
                placeholder="이름을 입력하세요."
                label="profileName"
                value={inputNameValue}
                border="lgRound"
                onchange={handleInputName}
                hasIcon={false}
                id="profileName"
                type="text"
              />
              {nameError && (
                <p className="text-red-500 text-sm text-left mt-2">
                  {nameError}
                </p>
              )}
            </section>

            <section className="mb-8">
              <p className="text-lg font-bold mb-4">introduce</p>
              <textarea
                className="h-[10rem] bg-background-surface placeholder-text-secondary border border-background-border rounded-lg focus:border-primary focus:outline-none transition-colors
              w-full px-8 lg:p-10 py-2.5 lg:py-3 text-[18px] gap-3"
                placeholder="introduce를 입력해주세요."
                name="introduce"
                id="profileIntroduce"
                onChange={handleInputIntro}
                value={inputIntroValue}
                maxLength={500}
              ></textarea>
              <span>{textCount}</span>
              <span>/500</span>
              {introError && (
                <p className="text-red-500 text-sm text-left mt-2">
                  {introError}
                </p>
              )}
            </section>

            <section className="mb-8">
              <p className="text-lg font-bold mb-4">기술 스택</p>
              <TextInput
                onchange={handleInputStack}
                value={inputStackValue}
                placeholder="기술 스택 검색"
                size="lg"
                border={'lgRound'}
                hasIcon={true}
                id="searchStack"
                label="searchStack"
                onclick={handleStackReset}
                type="text"
              />
              <section className="mt-4">
                <p className="text-sm lg:text-base font-bold mb-3">
                  선택된 기술 스택
                </p>
                <div className="grid grid-cols-4 gap-4">
                  {selectedStack.map((stack) => (
                    <BaseButton
                      key={stack}
                      content={stack}
                      ariaLabel={stack}
                      onClick={() => stackDelete(stack)}
                      fontWeight="normal"
                      width="flexWidth"
                      color="primary"
                      size="sm"
                      icon="/src/assets/icons/close-b-sm.svg"
                      isLeft={false}
                    />
                  ))}
                </div>
              </section>
              <section className=" mt-4 border-b border-background-border mb-8">
                <p className="text-sm lg:text-base font-bold mb-3">
                  사용 가능한 기술 스택
                </p>
                <div className="grid grid-cols-4 gap-4 max-h-60 overflow-y-auto pb-8">
                  {stackFilter.map((stack) => (
                    <div className="flex border-2 border-background-border rounded-full">
                      <BaseButton
                        key={stack}
                        content={stack}
                        ariaLabel={stack}
                        onClick={() => stackAdd(stack)}
                        fontWeight="normal"
                        width="flexWidth"
                        color="surface"
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </section>
              <div className="flex gap-4">
                <BaseButton
                  content="취소"
                  ariaLabel="취소"
                  fontWeight="bold"
                  width="fullWidth"
                  color="surface"
                  size="md"
                />
                <BaseButton
                  content={isUploadLoading ? '저장 중..' : '저장하기'}
                  ariaLabel="저장하기"
                  fontWeight="bold"
                  width="fullWidth"
                  color="primary"
                  size="md"
                  btnType="submit"
                />
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  )
}

export default ProfileSetting
