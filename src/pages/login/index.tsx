import React from 'react'
import BaseButton from '../../components/common/BaseButton'
import styles from '../../assets/css/login.module.css'

function Login(): React.JSX.Element {
  const provider = ['google', 'github']

  return (
    <div className="w-screen h-screen bg-black">
      <div>
        <div className={styles['login-btn-container']}>
          {provider.map((p, i) => {
            return (
              <BaseButton
                key={i}
                content={`Continue with ${
                  p.charAt(0).toUpperCase() + p.slice(1)
                }`}
                icon={`public/icons/${p}.svg`}
                ariaLabel={`login with ${p} button`}
                size="lg"
                color="primary"
                width="fullWidth"
                fontWeight="medium"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Login
