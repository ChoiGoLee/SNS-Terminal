import { Header } from '../../components/common/Header'
import BackArrow from '/icons/back-arrow.svg'
function ProfileSetting() {
  return (
    <>
      <Header
        title="프로필 편집"
        leftButton={{
          icon: <img src={BackArrow} />,
          onClick: () => {
            console.log('뒤로가기')
          },
        }}
      />
      <div>Profile Setting Page</div>
    </>
  )
}
export default ProfileSetting
