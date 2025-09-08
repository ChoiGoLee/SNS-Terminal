import React from 'react'
import Btns from '../../components/common/Btns'
import styles from '../../assets/css/login.module.css'

function Login(): React.JSX.Element {
<<<<<<< HEAD
  const provider = ['google', 'github']
=======
  const provider = ['Google', 'Github']
>>>>>>> 69404aedb8cfa2e6c4f356a1458a8a2008e2816e
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
