import React from 'react'
import { useParams } from 'react-router-dom';
import OtpVerificationForm from '../Components/UserOtpVerify/OtpVerificationForm';

function OtpVerify() {
    const { email } = useParams();
  
  return (
    <div>
      <OtpVerificationForm email={email}/>
    </div>
  )
}

export default OtpVerify
