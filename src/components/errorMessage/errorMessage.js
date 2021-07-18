import React from 'react';
import img from './error.jpg';

const ErrorMessage = () => {
  return (
    <>
    <img src={img} alt='error'></img>
    <span>Somthing gone wrong</span>
    </>
  )
}

export default ErrorMessage