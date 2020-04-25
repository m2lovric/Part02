import React from 'react';

export default function Notification({message}) {
  return (
    <div>
      <p className="notification">{message}</p>
    </div>
  )
}

