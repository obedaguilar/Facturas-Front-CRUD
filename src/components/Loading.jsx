import React from 'react'
import { Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loading = () => {
  return (
    <div
        style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,

        }}
    >

        <Spinner color='primary'/></div>
  )
}

export default Loading