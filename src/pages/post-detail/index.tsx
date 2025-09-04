import { Header } from '../../components/common/header'
import BackArrow from '../../assets/icons/back-arrow.svg'
function PostDetail() {
  return (
    <>
      <Header
        title="포스트"
        leftButton={{
          icon: <img src={BackArrow} />,
          onClick: () => {
            console.log('뒤로가기')
          },
        }}
      />
      <div>Post Detail Page</div>
    </>
  )
}
export default PostDetail
