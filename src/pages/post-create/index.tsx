import type React from 'react'
import { Header } from '../../components/common/Header'

function PostCreate(): React.JSX.Element {
  return (
    <>
      <Header title="새 포스트 작성" buttons={{ cancel: { show: true } }} />
      <div>Post Create Page</div>
    </>
  )
}
export default PostCreate
