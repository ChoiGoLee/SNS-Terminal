import React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import TextInput from '../../components/common/TextInput'

function Home(): React.JSX.Element {
  return (
    <div className="flex min-h-screen">
      <div className="h-full">
        <SideBar isAuthenticated={true} activeItem="/" />
      </div>
      <div className="mx-auto border-x border-background-border border-r border-l">
        <Header title="홈" />
        <TextInput
          fontWeight="normal"
          border="fullRound"
          type="text"
          placeholder="test"
          size="sm"
          label="test"
          icon="/src/assets/icons/hash.svg"
        ></TextInput>
      </div>
    </div>
  )
}
export default Home
