import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import Avatar from '../../components/common/Avatar'
import { useAuth } from '../../contexts/AuthContext'

function PostCreate() {
  const user = useAuth()
  console.log(user.user)

  return (
    <div className="flex">
      <div className="h-full top-0 sticky">
        <SideBar isAuthenticated={true} activeItem="/post-create" />
      </div>
      <div className="mx-auto max-w-[796px]">
        <Header title="새 포스트 작성" buttons={{ cancel: { show: true } }} />
        <section className="flex mt-6">
          <Avatar
            userImage={user?.user?.image}
            userName={user?.user?.username}
            size="md"
          />
          <span className="ml-4 text-base text-[#E7E9EA]">
            {user?.user?.username}
          </span>
          <span className="ml-2 text-base text-text-secondary">
            @{user?.user?.accountname}
          </span>
        </section>
        <div className="-mt-3 ml-16">
          <textarea
            name="post-content"
            id="post-content"
            className="rounded-lg bg-background-surface border-background-border border p-4"
            cols={30}
            rows={10}
          ></textarea>
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            id="useImageUpload"
            // className="hidden"
            name="게시물 이미지 업로드"
          />
        </div>
      </div>
    </div>
  )
}
export default PostCreate
