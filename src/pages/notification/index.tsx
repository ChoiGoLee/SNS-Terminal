import { Header } from '../../components/common/Header'

function Notification() {
  return (
    <>
      <Header
        title="알림"
        rightButton={{
          text: '모두 읽음',
          onClick: () => console.log('모두읽음클릭'),
        }}
      />
      <div>Notification Page</div>
    </>
  )
}
export default Notification
