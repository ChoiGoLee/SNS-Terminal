import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import Avatar from '../../components/common/Avatar'
import BaseButton from '../../components/common/BaseButton'
import PostTypeButton from './components/PostTypeButton'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'
import { validateImageExtend, validateImageSize } from '../../utils/validation'
import { getImageClass, getImageLayout } from '../../utils/getImageLayout'
import { useNavigate } from 'react-router-dom'

const POST_TYPE = [
  { text: '일반', icon: '/icons/daily.svg' },
  { text: '개발', icon: '/icons/tag.svg' },
  { text: '헬프', icon: '/icons/question.svg' },
  { text: '테크', icon: '/icons/stack.svg' },
  { text: '프로젝트', icon: '/icons/folder.svg' },
  { text: '학습', icon: '/icons/study.svg' },
]

function PostCreate() {
  const { user } = useAuth()
  const [postContent, setPostContent] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [hashTags, setHashTags] = useState<string[]>([])
  const [hashTagInput, setHashTagInput] = useState('')
  const [isUploadLoading, setIsUploadLoading] = useState(false)

  // 글자수 제한 (코드 공유 고려하여 5000자)
  const MAX_CONTENT_LENGTH = 5000

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!postContent.trim()) {
      alert('게시물 내용을 입력해주세요.')
      return
    }

    setIsUploadLoading(true)

    try {
      // 1. 이미지 업로드 처리 (1~3개)
      const uploadedUrls: string[] = []

      for (const image of images) {
        const formData = new FormData()
        formData.append('image', image)

        const uploadResponse = await fetch('/api/image/uploadfiles', {
          method: 'POST',
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error('이미지 업로드 실패')
        }

        const uploadData = await uploadResponse.json()
        // API 응답에서 filename 추출 (배열로 반환됨)
        if (uploadData.info && uploadData.info.length > 0) {
          uploadedUrls.push(uploadData.info[0].filename)
        }
      }

      // 2. 게시물 데이터 생성
      // {postContent}Φ${postType}¶{hashTags} 형식
      const formattedContent = `${postContent}Φ$${
        selectedType || ''
      }¶$${hashTags.join(',')}`

      // 3. 게시물 작성 API 호출
      const token = sessionStorage.getItem('token')

      const postData = {
        post: {
          content: formattedContent,
          image: uploadedUrls.join(','), // 여러 이미지는 쉼표로 구분
        },
      }

      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        throw new Error('게시물 작성 실패')
      }

      console.log('게시물 작성 성공:', await response.json())

      // 성공 후 폼 초기화
      setPostContent('')
      setSelectedType(null)
      setHashTags([])
      setImages([])
      // URL 메모리 해제
      previewUrls.forEach((url) => window.URL.revokeObjectURL(url))
      setPreviewUrls([])

      alert('게시물이 성공적으로 작성되었습니다!')
      navigate('/')
    } catch (error) {
      console.error('게시물 작성 실패:', error)
      alert('게시물 작성에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsUploadLoading(false)
    }
  }

  const handleUserImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const newFiles = Array.from(e.target.files)

      if (images.length + newFiles.length > 3) {
        alert('이미지는 최대 3개까지 업로드 가능합니다.')
        return
      }

      for (const file of newFiles) {
        if (!validateImageExtend(file)) {
          alert('jpg,gif,png,jpeg,bmp 확장자만 업로드 가능합니다.')
          return
        }

        if (!validateImageSize(file)) {
          alert('이미지 크기는 10mb를 초과할 수 없습니다.')
          return
        }
      }

      const newPreviewUrls = newFiles.map((file) =>
        window.URL.createObjectURL(file)
      )

      setImages((prev) => [...prev, ...newFiles])
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls])
    }
  }

  const handleRemoveImage = (index: number) => {
    window.URL.revokeObjectURL(previewUrls[index])
    setImages((prev) => prev.filter((_, i) => i !== index))
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handlePostContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostContent(e.target.value)
  }

  const handleHashTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashTagInput(e.target.value)
  }

  const handleAddHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter 키로 해시태그 추가
    if (e.key === 'Enter' && hashTagInput.trim()) {
      e.preventDefault()

      // IME 조합 중인지 확인 (한국어, 일본어, 중국어 등)
      if (e.nativeEvent.isComposing) {
        return
      }

      // 해시태그 개수 제한 체크 (최대 7개)
      if (hashTags.length >= 7) {
        alert('해시태그는 최대 7개까지 추가할 수 있습니다.')
        return
      }

      // 중복 체크
      if (!hashTags.includes(hashTagInput.trim())) {
        setHashTags([...hashTags, hashTagInput.trim()])
        setHashTagInput('')
      } else {
        alert('이미 추가된 해시태그입니다.')
      }
    }
  }

  const handleRemoveHashTag = (tagToRemove: string) => {
    setHashTags(hashTags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="h-full top-0 sticky">
        <SideBar activeItem="/post-create" />
      </div>
      <div className="mx-auto w-[796px]">
        <Header title="새 포스트 작성" buttons={{ cancel: { show: true } }} />
        <form
          onSubmit={handleSubmit}
          className="flex w-full gap-4 h-full border border-background-border p-3"
        >
          <div className="flex-[2] overflow-y-scroll mb-10">
            <section className="flex mt-6">
              <Avatar
                userImage={user?.image}
                userName={user?.username}
                size="md"
              />
              <span className="ml-4 text-base text-[#E7E9EA]">
                {user?.username}
              </span>
              <span className="ml-2 text-base text-text-secondary">
                @{user?.accountname}
              </span>
            </section>
            <section>
              <div className="-mt-3 ml-16">
                <textarea
                  name="post-content"
                  id="post-content"
                  className="rounded-lg bg-background-surface border-background-border border p-4 w-full h-[300px] text-text-primary resize-none focus:outline-none focus:border-primary"
                  placeholder="무슨 생각을 하고 계신가요?"
                  value={postContent}
                  onChange={handlePostContentChange}
                  maxLength={MAX_CONTENT_LENGTH}
                />
                <p className="text-end p-3 text-text-secondary text-sm">
                  <span
                    className={
                      postContent.length > MAX_CONTENT_LENGTH * 0.9
                        ? 'text-yellow-500'
                        : ''
                    }
                  >
                    {postContent.length}
                  </span>
                  <span className="text-text-secondary">
                    /{MAX_CONTENT_LENGTH}
                  </span>
                </p>
              </div>
              <div className="ml-16 mt-3">
                <div className="bg-background-surface border-background-border border p-3 rounded-lg mb-4">
                  <button
                    type="button"
                    className="py-2 px-3 bg-background rounded-lg cursor-pointer hover:bg-background-hover transition-colors"
                    disabled={images.length >= 3}
                  >
                    <label
                      htmlFor="file"
                      className={`flex gap-2 items-center ${
                        images.length >= 3
                          ? 'cursor-not-allowed opacity-50'
                          : 'cursor-pointer'
                      }`}
                    >
                      <img src="/icons/image.svg" alt="사진" />
                      <span className="text-text-primary">
                        이미지 ({images.length}/3)
                      </span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      id="file"
                      className="hidden"
                      name="게시물 이미지 업로드"
                      placeholder="이미지 업로드"
                      onChange={handleUserImagePreview}
                      disabled={images.length >= 3}
                    />
                  </button>
                </div>

                {previewUrls.length > 0 && (
                  <div
                    className={`grid gap-2 mb-4 ${getImageLayout(
                      previewUrls.join(',')
                    )}`}
                  >
                    {previewUrls.map((url, index) => (
                      <div
                        key={index}
                        className="relative rounded-lg overflow-hidden border border-background-border"
                      >
                        <img
                          src={url}
                          alt={`게시물 이미지 미리보기 ${index + 1}`}
                          className={getImageClass(
                            index,
                            previewUrls.join(',')
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full w-6 h-6 flex items-center justify-center transition-all"
                          aria-label={`이미지 ${index + 1} 삭제`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
          <div className="flex-[1] pt-6 border-l pl-4 border-background-border h-full">
            <h3 className="text-text-primary font-medium mb-3">게시물 유형</h3>

            {POST_TYPE.map((type, i) => (
              <PostTypeButton
                key={i}
                text={type.text}
                icon={type.icon}
                isSelected={selectedType === type.text}
                onClick={() => setSelectedType(type.text)}
              />
            ))}
            <h3 className="text-text-primary font-medium mb-3 mt-5">
              해시태그
            </h3>
            {/* 선택된 해시태그 표시 */}
            {hashTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {hashTags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-primary text-black px-3 py-1 rounded-full text-sm"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHashTag(tag)}
                      className="hover:opacity-70"
                      aria-label={`${tag} 해시태그 삭제`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center bg-background-surface p-3 mb-6 rounded-lg border border-background-border">
              <img src="src/assets/icons/hash.svg" alt="" />
              <input
                type="text"
                className="text-text-primary bg-background-surface focus:outline-none flex-1 ml-2"
                placeholder={
                  hashTags.length >= 7
                    ? '최대 7개까지 추가 가능'
                    : '태그 입력 후 Enter'
                }
                name="post-hash-tag"
                aria-label="게시물 해시태그 입력"
                value={hashTagInput}
                onChange={handleHashTagInput}
                onKeyDown={handleAddHashTag}
                disabled={hashTags.length >= 7}
              />
            </div>

            <BaseButton
              content={isUploadLoading ? '게시 중...' : '게시하기'}
              width="fullWidth"
              ariaLabel="게시 버튼"
              color="primary"
              size="md"
              fontWeight="medium"
              btnType="submit"
              disabled={isUploadLoading}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostCreate
