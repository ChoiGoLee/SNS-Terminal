import React, { useState } from 'react'
import { Header } from '../../components/common/Header'
import { SideBar } from '../../components/common/SideBar'
import { useNavigate } from 'react-router-dom'

import Description from '../../components/common/Description'

function Settings(): React.JSX.Element {
  const navigate = useNavigate()

  // 상태관리(로그아웃 or 회원탈퇴 페이지만 나오게,기본 페이지는 로그아웃)
  const [activeMenu, setActiveMenu] = useState<'logout' | 'resign'>('logout')

  // 이벤트 핸들러
  const handleLogout = () => {
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  const handleResign = () => {
    // 회원탈퇴는 따로 명시된 내용이 없어 removeItem으로 대체
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <section className="flex h-screen overflow-hidden">
        <div className="sticky top-0 h-screen">
          <SideBar isAuthenticated={true} activeItem="/settings" />
        </div>
        <div className="w-full min-h-screen flex max-w-4xl mx-auto border-background-border border-x">
          <aside className="w-full lg:w-80 border-r border-background-border hidden lg:flex flex-col">
            <Header title="설정" />
            {/* 왼쪽 사이드 메뉴 */}
            <nav className="p-4 flex-1 overflow-y-auto">
              <button
                onClick={() => setActiveMenu('logout')}
                className={`w-full flex items-center rounded-xl cursor-pointer text-left p-3 mb-2 transition-colors font-bold ${
                  activeMenu === 'logout'
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-primary hover:bg-background-surface'
                }`}
              >
                로그아웃
              </button>
              <button
                onClick={() => setActiveMenu('resign')}
                className={`w-full flex items-center rounded-xl cursor-pointer text-left p-3 mb-2 transition-colors font-bold ${
                  activeMenu === 'resign'
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-primary hover:bg-background-surface'
                }`}
              >
                계정 탈퇴
              </button>
            </nav>
          </aside>
          {/* 오른쪽 컨텐츠 */}
          <section className="flex-1 flex flex-col">
            <div className="sticky top-0 border-b border-background-border p-4">
              <h2 className="text-base lg:text-lg font-bold text-text-primary ">
                {activeMenu === 'logout' ? '로그아웃' : '회원탈퇴'}
              </h2>
            </div>
            <div className="p-4 lg:p-6 flex-1 overflow-y-auto">
              {activeMenu === 'logout' && (
                <Description
                  iconType="logout"
                  title="정말 로그아웃 하시겠습니까?"
                  description="로그아웃 후 로그인 페이지로 이동합니다."
                  showCard={false}
                  buttons={[
                    {
                      text: '취소',
                      onClick: () => {
                        navigate('/')
                      },
                      variant: 'surface',
                    },
                    {
                      text: '로그아웃',
                      onClick: handleLogout,
                      variant: 'primary',
                    },
                  ]}
                />
              )}
              {activeMenu === 'resign' && (
                <Description
                  iconType="resign"
                  title="정말 탈퇴 하시겠습니까?"
                  description="탈퇴 버튼 선택시 계정은 삭제되며, 복구되지 않습니다."
                  showCard={true}
                  buttons={[
                    {
                      text: '취소',
                      onClick: () => {
                        navigate('/')
                      },
                      variant: 'surface',
                    },
                    {
                      text: '회원탈퇴',
                      onClick: handleResign,
                      variant: 'danger',
                    },
                  ]}
                />
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  )
}
export default Settings
