import React, { useState } from 'react'
import { Header } from '../../components/common/Header'
import { useNavigate } from 'react-router-dom'
import Description from '../../components/common/Description'
import LogoutIcon from '../../assets/icons/logout.svg?react'
import TrashIcon from '../../assets/icons/trash.svg?react'
import { useAuth } from '../../contexts/AuthContext'

function Settings(): React.JSX.Element {
  const navigate = useNavigate()
  const { logout } = useAuth()

  // 상태관리(로그아웃 or 회원탈퇴 페이지만 나오게,기본 페이지는 로그아웃)
  const [activeMenu, setActiveMenu] = useState<'logout' | 'resign'>('logout')

  // 이벤트 핸들러
  const handleLogout = () => {
    logout()
  }

  const handleResign = () => {
    alert('짜잔! 열심히 개발 준비 중이에요. 조금만 기다려 주세요.')
  }

  return (
    <>
      <section className="h-screen overflow-y-hidden">
        <Header title="설정" />
        {/* 왼쪽 사이드 메뉴 */}
        <div className="flex min-h-screen">
          <aside className="w-full lg:w-80 border-r border-background-border hidden lg:flex flex-col">
            <nav className="p-4 flex-1 overflow-y-auto">
              <button
                onClick={() => setActiveMenu('logout')}
                className={`w-full flex items-center rounded-xl cursor-pointer text-left p-3 mb-2 transition-colors font-bold ${
                  activeMenu === 'logout'
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-primary hover:bg-background-surface'
                }`}
              >
                <LogoutIcon className="w-4 h-4 mr-3" />
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
                <TrashIcon className="w-4 h-4 mr-3" />
                계정 탈퇴
              </button>
            </nav>
          </aside>
          {/* 오른쪽 컨텐츠 */}
          <section className="flex-1 flex flex-col">
            <div className="sticky top-0 border-b border-background-border p-4">
              <h2 className="text-base lg:text-lg font-bold text-text-primary">
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
