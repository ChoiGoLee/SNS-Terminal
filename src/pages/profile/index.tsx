import { Header } from '../../components/common/Header'
import BackArrow from '/icons/back-arrow.svg'

function Profile() {
  return (
    <>
      <Header
        title="프로필"
        leftButton={{
          icon: <img src={BackArrow} />,
          onClick: () => {
            console.log('뒤로가기')
          },
        }}
      />
      <div>Profile Page</div>
    </>
  )
}
export default Profile
