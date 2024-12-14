"use client"
import React, { useState, useEffect } from 'react';
// import { Button, CircularProgress } from '@shadcn';
import { Button } from '@/components/ui/button';
import { Input as TextField } from '@/components/ui/input';
import { ArrowBigLeft as ArrowBack } from 'lucide-react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Axios from '@/Axios/Axios';
// import { InputOTP, InputOTPGroup, InputOTPSlot } from '@shadcn/ui';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useRouter } from 'next/navigation';
import GenerateNewPassword from './components/GenerateNewPassword';

function ForgotPasswordPage() {
  const [loadButton, setLoadButton] = useState(false);
  const [isForgotPasswordSend, setIsForgotPasswordSend] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [apiError, setApiError] = useState("")


  const initialEmail = "";

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const handleForgotPassword = async (values:any) => {
    setLoadButton(true);
    try {
      const res = await Axios.post("/forget-password", { email: values.email });
      if (res.status === 200) {
        const value = res.data;
        if (value.valid) {
          setEmail(values.email);
          setIsForgotPasswordSend(true);
          setApiError("")
        } else {
          setIsForgotPasswordSend(false);
          setApiError(res?.data?.message)
        }
      }
    } catch (error) {
      setIsForgotPasswordSend(false);
      setApiError("Server Error, Try Again")
    } finally {
      setLoadButton(false);
    }
  };

  const onVerifyOtp = async (otp:any) => {
    try {
      const res = await Axios.post("/verify-email-otp", { email: email, code: otp });
      if (res.status === 200) {
        if (res.data.valid) {
          setIsOtpValid(true);
          setVerifyToken(res?.data?.token || "");
          setApiError("")
        } else {
          setIsOtpValid(false);
          setVerifyToken("");
          setApiError(res?.data?.message)
        }
      }
    } catch (error) {
      setVerifyToken("");
      setApiError("Server Error, Try Again")
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      onVerifyOtp(otp);
    }
  }, [otp]);

  const handleEmailChange = () => {
    setIsForgotPasswordSend(false);
    setOtp('');
    setIsOtpValid(false);
    setApiError("")
    setVerifyToken("");
  };

  const OnCheckVerifyOtp = () => {
    // Implement any additional logic here
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-3">
        {!isForgotPasswordSend ? 
          <Link href="/login">
          
              <ArrowBack className="text-black" />
         
          </Link> 
          : 
          <Button className="p-0" onClick={handleEmailChange}>
            <ArrowBack className="text-black" />
          </Button>
        }
      </div>
      {!isOtpValid ? 
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold text-black mb-4">Forgot Password</h3>
            <Formik
              initialValues={{ email: initialEmail }}
              validationSchema={emailValidationSchema}
              onSubmit={handleForgotPassword}
            >
              {({ values, handleChange, handleBlur, touched, errors }) => (
                <Form>
                  <div className="mb-4">
                    <TextField
                      id="email"
                      name="email"

                      value={values.email}
                      onChange={(e) => {
                        handleChange(e);
                        handleEmailChange();
                      }}
                      onBlur={handleBlur}
                      type="email"
                      className="w-full text-gray-700 "
                      style={{backgroundColor:'white'}}
                      placeholder="Enter Your Email"
                    
                      required
                    
                     
                    />
                  </div>

                  {/* OTP Section */}
                  {isForgotPasswordSend && (
                    <div className="mb-4">
                      <div className="">
                        <label className='text-gray-700'>Enter OTP</label>
                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={setOtp}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot  style={{backgroundColor:'white'}} className='text-black' index={0} />
                            <InputOTPSlot  style={{backgroundColor:'white'}} className='text-black' index={1} />
                            <InputOTPSlot  style={{backgroundColor:'white'}} className='text-black' index={2} />
                            <InputOTPSlot  style={{backgroundColor:'white'}} className='text-black' index={3} />
                            <InputOTPSlot  style={{backgroundColor:'white'}} className='text-black' index={4} />
                            <InputOTPSlot  style={{backgroundColor:'white'}} className='text-black' index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-black">OTP expires in 5 minutes</p>
                        <Button
                          type="button"
                          className=" text-xs font-semibold hover:text-black text-black"
                          onClick={() => handleForgotPassword({ email })}
                        >
                          Resend OTP
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="mb-4 pt-3">
                    {!isForgotPasswordSend ? 
                      <Button
                        className="w-full bg-black hover:bg-black text-white "
                        type="submit"
                        disabled={loadButton}
                      >
                        {loadButton ? 'Submit...' : 'Submit'}
                      </Button>
                      :
                      <Button
                        className="w-full bg-gray-700 hover:bg-gray-700  text-white"
                        onClick={OnCheckVerifyOtp}
                        type="button"
                        disabled={loadButton}
                      >
                        {loadButton ? 'Submit...' : 'Verify'}
                      </Button>
                    }

                    {apiError?.length>0 && <p className='mt-3 text-sm text-red-500'>{apiError}</p>}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        : 
        <div className="w-full max-w-md mx-auto">
          <GenerateNewPassword emailData={email} token={verifyToken} />
        </div>
      }
    </div>
  );
}

export default ForgotPasswordPage;
