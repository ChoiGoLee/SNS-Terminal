import React from 'react'
import Btns from '../../components/common/Btns'
import styles from '../../assets/css/login.module.css'

function Login(): React.JSX.Element {
  const provider = ['google', 'github']
  return (
    <div className="w-screen h-screen bg-black">
      <div>
        <div className={styles['login-btn-container']}>
          {provider.map((p, i) => {
            return (
              <Btns
                key={i}
                content={`Continue with ${p}`}
                img={`/public/icons/${p}.svg`}
                style={`btn full-width-btn primary-btn medium-font`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default Login
