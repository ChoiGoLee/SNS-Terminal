import React from 'react'
import '../../assets/css/btns.css'

interface ButtonsProps {
  content?: string
  img?: string
  style: string
}

// 매개변수를 객체로 받도록 수정
function Btns({ content, img, style }: ButtonsProps): React.JSX.Element {
  return (
    <>
      <button className={style} type="button">
        {img && <img className="mr-12" src={img} alt="" />}
        {content && content}
      </button>
    </>
  )
}

export default Btns
