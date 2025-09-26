import React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import PostCard from '../../components/common/PostCard'

function PostDetail(): React.JSX.Element {
  return (
    <>
      <div className="min-h-30">
        <Header title="포스트" buttons={{ back: { show: true } }} />
      </div>
      <div className="flex">
        <SideBar activeItem="/" />
        <div>Post Detail Page</div>
        {/* <PostCard
          isDetail={true}
          comment="fsdffsdfdsfsdfsdfsdffsdfdsfsdfsdfsdffsdfdsfsdfsdfsdffsdfdsfsdfsdfsdffsdfdsfsdfsdfsdffsdfdsfsdfsdfsdffsdfdsfsdfsdfsdffsdfdsfsdfsdfsdffsdfdsfsdfsd"
          onClick={() => {}}
        /> */}
      </div>
    </>
  )
}
export default PostDetail
