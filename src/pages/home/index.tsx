import React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import Markdown from '../../components/common/Markdown'
import Avatar from '../../components/common/Avatar'
import CommentButton from '../../components/common/CommentButton'
import CommentInput from '../../components/common/CommentInput'
import CommentItem from '../../components/common/CommentItem'
import LikeButton from '../../components/common/LikeButton'
import UserLevel from '../../components/common/UserLevel'
import Description from '../../components/common/Description'
import {
  MessageBubble,
  sampleMessages,
} from '../../components/common/MessageBubble'

function Home(): React.JSX.Element {
  return (
    <div className="flex min-h-screen">
      <div className="h-full">
        <SideBar isAuthenticated={true} activeItem="/" />
      </div>
      <div className="mx-auto border-x border-background-border border-r border-l">
        <Header title="홈" />
        <div className="w-auto">
          {/* 메세지가 없을때 */}
          {sampleMessages.length === 0 ? (
            <Description
              iconType="post"
              title="아직 포스트가 없습니다"
              description="첫 번째 포스트를 작성해보세요"
            />
          ) : (
            <>
              {/* 메세지가 있을때 */}
              {sampleMessages.map((msg) => (
                <MessageBubble
                  type={msg.type}
                  text={msg.text}
                  userName={msg.userName} // 없으면 기본값 사용
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default Home
