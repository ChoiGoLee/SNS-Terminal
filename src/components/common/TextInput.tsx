import SearchIcon from '../../assets/icons/search-g.svg?react'
import HashIcon from '../../assets/icons/hash.svg?react'

interface InputProps {
  variant:
    | 'userSearch'
    | 'hashtag'
    | 'globalSearch'
    | 'message'
    | 'profile'
    | 'textarea'
  value?: string
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  icon?: 'search' | 'hash'
  rows?: number
}

function Input({ variant, icon, rows, className = '', ...props }) {}
