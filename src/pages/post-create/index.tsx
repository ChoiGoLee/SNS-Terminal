import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import Avatar from '../../components/common/Avatar'
import BaseButton from '../../components/common/BaseButton'
import PostTypeButton from './components/PostTypeButton'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

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
  const [selectedType, setSelectedType] = useState<string | null>(null)
  // const [postContent, setPostContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('선택된 게시물 타입:', selectedType)
    // console.log('게시물 내용:', postContent)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="h-full top-0 sticky">
        <SideBar isAuthenticated={true} activeItem="/post-create" />
      </div>
      <div className="mx-auto w-[796px]">
        <Header title="새 포스트 작성" buttons={{ cancel: { show: true } }} />
        <form
          onSubmit={handleSubmit}
          className="flex w-full gap-4 h-full border border-background-border p-3"
        >
          <div className="flex-[2] overflow-y-scroll">
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
                />
                <p className="text-end p-3 text-text-secondary text-sm">0</p>
              </div>
              <div className="bg-background-surface border-background-border border p-3 rounded-lg ml-16 mt-3">
                <button
                  type="button"
                  className="py-2 px-3 bg-background rounded-lg cursor-pointer hover:bg-background-hover transition-colors"
                >
                  <label
                    htmlFor="file"
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <img src="/icons/image.svg" alt="사진" />
                    <span className="text-text-primary">이미지</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="file"
                    className="hidden"
                    name="게시물 이미지 업로드"
                    placeholder="이미지 업로드"
                  />
                </button>
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
            <div className="flex items-center bg-background-surface p-3 mb-6 rounded-lg border border-background-border">
              <img src="src/assets/icons/hash.svg" alt="" />
              <input
                type="text"
                className=" text-text-primary bg-background-surface  focus:outline-none "
                placeholder="태그"
                name="post-hash-tag"
                aria-label="게시물 해시태그 입력"
              />
            </div>

            <BaseButton
              content="게시하기"
              width="fullWidth"
              ariaLabel="게시 버튼"
              color="primary"
              size="md"
              fontWeight="medium"
              btnType="submit"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostCreate
