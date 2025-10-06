import { useEffect, useRef } from 'react'
import { useLocation, Outlet } from 'react-router-dom'

import { SideBar } from '../common/SideBar'

interface Adfit {
  display: (unit: string) => void
  destroy: (unit: string) => void
  refresh: (unit: string) => void
}

declare global {
  interface Window {
    adfit?: Adfit
  }
}

function PageLayout(): React.JSX.Element {
  const location = useLocation()

  const basePath = location.pathname.split('/')[1]
    ? `/${location.pathname.split('/')[1]}`
    : '/'

  const adRef = useRef<HTMLDivElement>(null)
  const adUnit = 'DAN-gcnELnsihVdOaDpF'

  useEffect(() => {
    // ins 요소 생성
    const ins = document.createElement('ins')
    ins.className = 'kakao_ad_area'
    ins.setAttribute('data-ad-unit', adUnit)
    ins.setAttribute('data-ad-width', '160')
    ins.setAttribute('data-ad-height', '600')
    ins.style.display = 'none'

    // 스크립트 생성
    const script = document.createElement('script')
    script.setAttribute('src', '//t1.daumcdn.net/kas/static/ba.min.js')
    script.setAttribute('type', 'text/javascript')
    script.async = true

    // DOM에 추가
    if (adRef.current) {
      adRef.current.appendChild(ins)
      adRef.current.appendChild(script)
    }

    // 클린업
    return () => {
      const globalAdfit = window?.adfit
      if (globalAdfit) {
        globalAdfit.destroy(adUnit)
      }
    }
  }, [])

  return (
    <div className="flex h-screen">
      <div className="h-full top-0 sticky">
        <SideBar activeItem={basePath} />
      </div>
      <div className="flex-1 min-h-screen overflow-y-auto">
        <div className="min-h-full max-w-[769px] mx-auto border-r border-l border-background-border">
          <Outlet />
        </div>
      </div>
      {/* 광고 영역 */}
      <div
        ref={adRef}
        className="sticky top-0 h-screen flex items-center justify-center"
      />
    </div>
  )
}

export default PageLayout
