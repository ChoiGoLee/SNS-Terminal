import React from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import TextInput from '../../components/common/TextInput'
import { useState } from 'react'

function Home(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div className="flex min-h-screen">
      <div className="h-full">
        <SideBar isAuthenticated={true} activeItem="/" />
      </div>
      <div className="mx-auto border-x border-background-border border-r border-l">
        <Header title="홈" />
        <TextInput
          onchange={handleChange}
          value={inputValue}
          placeholder="기술 스택 검색"
          size="md"
          border={'fullRound'}
          hasIcon={true}
          id="password"
          label="라벨"
          type="text"
        ></TextInput>
      </div>
    </div>
  )
}
export default Home
