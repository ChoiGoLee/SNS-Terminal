import ShareLine from '../../assets/icons/share-line.svg?react'

interface ShareButtonProps {
  onShare: () => void
}

function ShareButton({ onShare }: ShareButtonProps) {
  return (
    <button
      onClick={onShare}
      className="flex items-center gap-2 p-2 rounded group"
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-primary/10 transition-colors">
        <ShareLine className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors" />
      </div>
    </button>
  )
}

export default ShareButton
