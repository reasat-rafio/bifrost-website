import React from 'react'

export const Logo: React.FC<{}> = () => {
  return (
    <img
      style={{ height: '100%', width: '100%', objectFit: 'contain' }}
      src="../static/bifrost-logo.png"
      alt="logo"
    />
  )
}
