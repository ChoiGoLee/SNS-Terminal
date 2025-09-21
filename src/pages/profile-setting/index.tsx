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

function ProfileSetting(): React.JSX.Element {
  const navigate = useNavigate()

  // 상태관리(유저정보,프로필 이미지 업로드)
  const [inputNameValue, setInputNameValue] = useState('')
  const [inputIntroValue, setInputIntroValue] = useState('')
  const [inputStackValue, setInputStackValue] = useState('')
  const [userAcountName, setUserAcountName] = useState('')
  const [nameError, setNameError] = useState<string>('')
  const [introError, setIntroError] = useState<string>('')
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [textCount, setTextCount] = useState(0)

  // 유저 이미지 관리
  // 이미지 URL 경로
  const [userImage, setUserImage] = useState('')
  // 이미지 파일
  const [image, setImage] = useState<File | null>(null)
  // 이미지 미리보기
  const [previewUrl, setPrivewUrl] = useState('')

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

  useEffect(() => {
    handleProfileLoad()
  }, [])

  // 프로필 수정

  const handleProfileUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    // todo
    // 1. 이미지파일 여부 확인하기
    let imageUrl = userImage

    e.preventDefault()

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
            throw new Error('으악 에러났다!')
          }

          const data = await response.json()

          return (imageUrl = data.info.filename)

          // console.log('유저이미지 확인용', imageUrl)
        } catch (error) {
          console.error(error)
        }
      }
    }
    console.log('imageurl:', imageUrl)

    // 2. 이미지파일이 있다면 서버에 이미지 업로드 요청
    // 3. 요청해서 받아온 response에 파일 네임 가져오기
    // 4. 가져온 파일네임을 변수에 저장하기(userImage에 넣기)
    // 5. 요청데이터 이미지에 넣기

    await checkImage()

    // 요청 데이터
    const userUpdateData: ProfileAPI.UpdateProfile.Req = {
      user: {
        username: inputNameValue,
        accountname: userAcountName,
        intro: inputIntroValue,
        image: imageUrl,
      },
    }

    console.log('요청 데이터:', userUpdateData)
    console.log('username:', userAcountName)

    // 이름 입력하지 않을 때 에러메세지
    if (!inputNameValue) {
      setNameError('이름을 입력해주세요.')
      return
    }

    //자기소개 입력하지 않을 때 에러메세지
    if (!inputIntroValue) {
      setIntroError('자기소개를 입력해주세요.')
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
    } catch (error: any) {
      console.error('프로필 수정 실패', error)
    } finally {
      setIsUploadLoading(false)
    }
  }

  // 프로필 업데이트

  // 이미지 미리보기

  const handleUserImagePrivew = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0]
      if (file) {
        const url = window.URL.createObjectURL(file)
        setPrivewUrl(url)
        setImage(file)
      }
      // const selectedFiles = Array.from(e.target.files)
      // setImage(selectedFiles)
      // console.log('업로드한 이미지:', selectedFiles[0])
    }
  }

  // 이미지 삭제

  const handleUserImageDelete = () => {
    window.URL.revokeObjectURL(previewUrl)
    setPrivewUrl('')
    setImage(null)
  }

  // 이미지 저장

  return (
    <>
      <div className="min-h-30">
        <Header title="프로필 편집" buttons={{ back: { show: true } }} />
      </div>
      <div className="flex">
        <SideBar isAuthenticated={true} activeItem="/settings" />
        <form
          encType="multipart/form-data"
          className="mx-auto bg-background border-background-border w-full p-4 transition-colors flex flex-col gap-8"
        >
          <p className="text-lg font-bold mb-4">프로필 사진</p>
          <section className="flex gap-4">
            <Avatar
              userImage={
                previewUrl ? previewUrl : API_BASE_URL + '/' + userImage
              }
              userName={inputNameValue}
              size="lg"
            />
            <div className="flex flex-col justify-between gap-2">
              <div>
                <label
                  htmlFor="useImageUpload"
                  className="flex-1 flex bg-background-surface border-background-border rounded-lg border text-white hover:bg-background-border disabled:opacity-30 cursor-pointer px-4 py-3 text-4 gap-2"
                  aria-label="프로필 사진 업로드"
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="useImageUpload"
                    className="hidden"
                    name="프로필 사진 업로드"
                    onChange={handleUserImagePrivew}
                  />
                  프로필 이미지 업로드
                </label>
              </div>
              <p>JPG,PNG 파일을 업로드하세요</p>

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
            {nameError && (
              <p className="text-red-500 text-sm text-left mt-2">{nameError}</p>
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
                btnType="submit"
                onClick={handleProfileUpdate}
              />
            </div>
          </section>
        </form>
      </div>
    </>
  )
}

export default ProfileSetting
