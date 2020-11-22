import React from 'react'
import Header from './Header'
import Nav from './Nav'

export const Layout = ({ user, children }: {user: firebase.User | undefined, children: React.ReactNode}) => {
  return (
    <>
      <Nav />
        <div className="content">
        <div className="content__block">
          <Header userInfo={user?.providerData[0]} />
          {children}
        </div>
      </div>
    </>
  )
}
