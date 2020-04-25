import React from 'react';

export default function Notification({message, err}) {
  return (
    <div>
      <p className="notification">{message}</p>
      <p className="err">{err}</p>
    </div>
  )
}

