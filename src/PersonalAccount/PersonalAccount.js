import './PersonalAccount.css'
import React from 'react'
import Button from '@mui/material/Button'
import { signOut, getUser } from '../authentication'

function PersonalAccount({ onReRender } = () => {}) {
  const handleSignOut = () => {
    signOut(onReRender)
  }

  return (
    <div className="PersonalAccount">
      <h2>{getUser().displayName}</h2>
      <img src={getUser().photoURL} alt="user icon" />
      <Button
        className="signOutButton"
        variant="outlined"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  )
}

export default PersonalAccount
