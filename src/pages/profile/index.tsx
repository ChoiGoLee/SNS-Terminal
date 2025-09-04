import { Header } from '../../components/common/header'
import BackArrow from '../../assets/icons/back-arrow.svg'

function Profile() {
  return (
    <>
      <Header
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
