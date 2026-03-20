import React from 'react'

function Alert(props) {

  return (
    <div style={{marginTop:"50px",height:"40px"}}>
        {props && <div className={`alert alert-${props.alert.type}`} role="alert">
            {props.alert.message}
        </div>}
    </div>
  )
}

export default Alert
