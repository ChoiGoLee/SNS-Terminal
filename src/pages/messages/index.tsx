import { Header } from '../../components/common/Header'
import AddIcon from '/icons/add.svg'

function Messages() {
  return (
    <>
      <Header
        title="메시지"
        rightButton={{
          icon: <img src={AddIcon} />,
          onClick: () => console.log('+클릭'),
        }}
      />
      <div>Messages Page</div>
    </>
  )
}
export default Messages
