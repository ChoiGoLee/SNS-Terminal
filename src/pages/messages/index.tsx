import { Header } from '../../components/common/header'

function Messages() {
  return (
    <>
      <Header
        title="메시지"
        rightButton={{ text: '+', onClick: () => console.log('+클릭') }}
      />
      <div>Messages Page</div>
    </>
  )
}
export default Messages
