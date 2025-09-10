import { Header } from '../../components/common/Header'
import Close from '/public/icons/close.svg'

function PostCreate() {
  return (
    <>
      <Header
        title="새 게시물 작성"
        leftButton={{
          icon: <img src={Close} />,
          onClick: () => {
            console.log('뒤로가기')
          },
        }}
      />
      <div>Post Create Page</div>
    </>
  )
}
export default PostCreate
