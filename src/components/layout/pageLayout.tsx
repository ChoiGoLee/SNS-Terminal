import { useLocation, Outlet } from 'react-router-dom'

import { SideBar } from '../common/SideBar'

function PageLayout(): React.JSX.Element {
  const location = useLocation()

  const basePath = location.pathname.split('/')[1]
    ? `/${location.pathname.split('/')[1]}`
    : '/'

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
    </div>
  )
}

export default PageLayout
