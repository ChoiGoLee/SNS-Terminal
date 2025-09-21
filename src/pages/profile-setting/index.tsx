import React, { useEffect } from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import Avatar from '../../components/common/Avatar'
import BaseButton from '../../components/common/BaseButton'
import TextInput from '../../components/common/TextInput'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/apiWrapper'
import { UserAPI } from '../../types/api'

function ProfileSetting() {
  const [inputNameValue, setInputNameValue] = useState('')
  const [inputIntroValue, setInputIntroValue] = useState('')
  const [inputStackValue, setInputStackValue] = useState('')
  const [userAcountName, setUserAcountName] = useState('')
  //유저 이미지 관리(url) - 실제 업로드용
  const [userImage, setUserImage] = useState('')
  //이미지 파일 관리
  const [image, setImage] = useState<File[]>([])
  //이미지 미리보기 url - base64용
  const [previewUrl, setPreviewUrl] = useState('')

  const navigate = useNavigate()

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(e.target.value)
  }

  const handleInputIntro = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputIntroValue(e.target.value)
  }

  const handleInputStack = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputStackValue(e.target.value)
  }

  async function handleProfileLoad() {
    try {
      const response: UserAPI.MyInfo.Res = await api.get('/user/myinfo')
      const userName = await response.username
      setInputNameValue(userName)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    handleProfileLoad()
  }, [])

  // 마이 프로필 불러오기
  // const url = 'https://dev.wenivops.co.kr/services/mandarin'

  // const token = localStorage.getItem('token')

  // async function handleProfileLoad() {
  //   try {
  //     const response = await fetch(url + '/user/myinfo', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })

  //     if (!response.ok) {
  //       throw new Error('으악! 에러 발생!')
  //     }

  //     const data = await response.json()

  //     setInputNameValue(data.user.username)
  //     setInputIntroValue(data.user.intro)
  //     setUserImage(data.user.image)
  //     setUserAcountName(data.user.accountname)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // 마이프로필 수정

  async function handleProfileUpdate() {
    try {
      const response = await fetch(url + '/user', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: inputNameValue,
            accountname: userAcountName,
            intro: inputIntroValue,
            image: userImage,
          },
        }),
      })

      navigate('/profile')

      if (!response.ok) {
        throw new Error('으악! 에러 발생!')
      }

      const data = await response.json()
      console.log('수정된 프로필 데이터:', data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleProfileLoad()
  }, [])

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
                content="저장하기"
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
