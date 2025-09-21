import React, { useEffect } from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import Avatar from '../../components/common/Avatar'
import BaseButton from '../../components/common/BaseButton'
import TextInput from '../../components/common/TextInput'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/apiWrapper'
import type { UserAPI, ProfileAPI } from '../../types/api'

function ProfileSetting(): React.JSX.Element {
  const navigate = useNavigate()

  // 상태관리(유저정보,프로필 이미지 업로드)
  const [inputNameValue, setInputNameValue] = useState('')
  const [inputIntroValue, setInputIntroValue] = useState('')
  const [inputStackValue, setInputStackValue] = useState('')
  const [userAcountName, setUserAcountName] = useState('')
  const [error, setError] = useState<string>('')
  const [isUploadLoading, setIsUploadLoading] = useState(false)

  const [userImage, setUserImage] = useState('')
  const [image, setImage] = useState<File[]>([])
  const [previewUrl, setPreviewUrl] = useState('')

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(e.target.value)
    setError('')
  }

  const handleInputIntro = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputIntroValue(e.target.value)
    setError('')
  }

  const handleInputStack = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputStackValue(e.target.value)
  }

  //프로필 불러오기
  const handleProfileLoad = async (): Promise<void> => {
    try {
      const response: UserAPI.MyInfo.Res = await api.get('/user/myinfo')

      setInputNameValue(response.user.username)
      setInputIntroValue(response.user.intro)
      setUserImage(response.user.image)
      setUserAcountName(response.user.accountname)

      console.log('프로필 불러오기를 성공했습니다.', response)
    } catch (error: any) {
      console.error('프로필 불러오기 실패:', error)
    }
  }

  // 마이프로필 수정

  const handleProfileUpdate = async (): Promise<void> => {
    // 요청 데이터
    const userUpdateData: ProfileAPI.UpdateProfile.Req = {
      user: {
        username: inputNameValue,
        accountname: userAcountName,
        intro: inputIntroValue,
        image: userImage,
      },
    }

    // 이름 입력하지 않았을 때 에러메세지(필수)
    if (!inputNameValue) {
      setError('이름을 입력해주세요.')
    }

    setIsUploadLoading(true)
    setError('')

    try {
      const response: ProfileAPI.UpdateProfile.Res = await api.put(
        '/user',
        userUpdateData
      )

      console.log('프로필 수정 성공:', response)
      navigate('/profile')
    } catch (error: any) {
      console.error('프로필 수정 실패', error)
    } finally {
      setIsUploadLoading(false)
    }
  }

  useEffect(() => {
    handleProfileLoad()
    handleProfileUpdate()
  }, [])

  // async function handleProfileUpdate() {
  //   try {
  //     const response = await fetch(url + '/user', {
  //       method: 'PUT',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         user: {
  //           username: inputNameValue,
  //           accountname: userAcountName,
  //           intro: inputIntroValue,
  //           image: userImage,
  //         },
  //       }),
  //     })

  //     navigate('/profile')

  //     if (!response.ok) {
  //       throw new Error('으악! 에러 발생!')
  //     }

  //     const data = await response.json()
  //     console.log('수정된 프로필 데이터:', data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // 이미지 업로드 fetch

  // async function postImage() {
  //   const formData = new FormData()
  //   formData.append('image', userImage)

  //   try {
  //     const res = fetch(url + '/image/uploadfile', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'multipart/form-data',
  //       },
  //       body: {},
  //     })
  //   } catch (error) {}
  // }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      const selectedFiles = Array.from(e.target.files)
      setImage(selectedFiles)
      console.log('업로드한 이미지:', selectedFiles[0])
    }
  }

  return (
    <>
      <div className="min-h-30">
        <Header title="프로필 편집" buttons={{ back: { show: true } }} />
      </div>
      <div className="flex">
        <SideBar isAuthenticated={true} activeItem="/settings" />
        <section className="mx-auto bg-background border-background-border w-full p-4 transition-colors flex flex-col gap-8">
          <p className="text-lg font-bold mb-4">프로필 사진</p>
          <section className="flex gap-4">
            <Avatar userImage="" userName="고우리" size="lg" />
            <div className="flex flex-col justify-between gap-2">
              <BaseButton
                content="사진 업로드"
                ariaLabel="사진 업로드"
                fontWeight="normal"
                width="flexWidth"
                color="surface"
                size="sm"
              />
              <input type="file" onChange={handleFileChange} />
              <p>JPG,PNG 파일을 업로드하세요</p>
            </div>
          </section>
          <section>
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
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </section>

          <section>
            <p className="text-lg font-bold mb-4">자기소개</p>
            <textarea
              className="h-[10rem] bg-background-surface placeholder-text-secondary border border-background-border rounded-lg focus:border-primary focus:outline-none transition-colors
              w-full px-8 lg:p-10 py-2.5 lg:py-3 text-[18px] gap-3"
              placeholder="자기소개를 입력해주세요."
              name="자기소개"
              id="profileIntroduce"
              onChange={handleInputIntro}
              value={inputIntroValue}
            ></textarea>
          </section>

          <section>
            <p className="text-lg font-bold mb-4">기술 스택</p>
            <TextInput
              onchange={handleInputStack}
              value={inputStackValue}
              placeholder="기술 스택 검색"
              size="lg"
              border={'lgRound'}
              hasIcon={true}
              id=""
              label=""
              type="text"
            ></TextInput>
            <section className="mt-4">
              <p className="text-sm lg:text-base font-bold mb-3">
                선택된 기술 스택
              </p>
              <BaseButton
                content="JavaScript"
                ariaLabel="JavaScript"
                fontWeight="normal"
                width="flexWidth"
                color="primary"
                size="sm"
                icon="/src/assets/icons/close-b-sm.svg"
                isLeft={false}
              />
            </section>
            <section className="mt-4 border-b border-background-border pb-8 mb-8">
              <p className="text-sm lg:text-base font-bold mb-3">
                사용 가능한 기술 스택
              </p>
              <BaseButton
                content="JavaScript"
                ariaLabel="JavaScript"
                fontWeight="normal"
                width="flexWidth"
                color="surface"
                size="sm"
              />
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
                onClick={handleProfileUpdate}
              />
            </div>
          </section>
        </section>
      </div>
    </>
  )
}
export default ProfileSetting
