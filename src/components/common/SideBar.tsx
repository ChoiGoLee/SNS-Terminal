import React from 'react'

interface SideItem {
  path: string
  img?: string
  text: string
  requireAuth?: boolean
  href: string
}

interface SideProps {
  items: SideItem[]
  isAuthenticated?: boolean
  activeItem?: string
}

export const SideBar: React.FC<SideProps> = ({
  items,
  isAuthenticated = false,
  activeItem,
}): React.JSX.Element => {
  const isItemVisible = (item: SideItem): boolean => {
    if (item.requireAuth && !isAuthenticated) {
      return false
    }
    return true
  }

  const visibleItems = items.filter(isItemVisible)

  const renderSideItem = (item: SideItem) => {
    const isActive = activeItem === item.path
    const style = `w-full flex items-center px-4 py-2 text-left transition-colors group ${
      isActive
        ? 'bg-primary/10 text-primary'
        : 'text-text-primary hover:text-primary hover:bg-primary/10'
    }`

    return (
      <li key={item.path} className="w-full">
        <button className={style}>
          {item.img && (
            <div className="relative w-5 h-5 mr-3 flex-shrink-0">
              <img
                src={item.img}
                alt=""
                className={`absolute inset-0 w-full h-full transition-opacity duration-200 `}
              />
            </div>
          )}
          <span className="font-medium">{item.text}</span>
        </button>
      </li>
    )
  }

  return (
    <aside className="w-64 bg-background-surface border-r border-background-border">
      <ul className="p-4 space-y-1">{visibleItems.map(renderSideItem)}</ul>
    </aside>
  )
}
