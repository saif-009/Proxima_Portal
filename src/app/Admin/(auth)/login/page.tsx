'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Button } from '../../../../../components//ui/button'
import googleicon from '../../../../../public/google icon.png'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '../../../../../components/ui/input-otp'
import { Card, CardContent, CardFooter } from '../../../../../components/ui/card'
import { Label } from '../../../../../components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../components/ui/tabs'
import { Input } from '../../../../../components/ui/input'
import Axios from '../../../../../Axios/Axios'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { z } from 'zod'
import Image from 'next/image'

import { useToast } from '../../../../../hooks/use-toast'

const mobileSchema = z.object({
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
})

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function Login() {
  const [isOtpSend, setIsOtpSend] = useState(false)
  const [mobileNumber, setMobileNumber] = useState('')
  const [mobileError, setMobileError] = useState('')
  const [value, setValue] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [loadSendOTP, setLoadSendOTP] = useState(false)
  const [timer, setTimer] = useState(60)
  const [loadResendOtp, setLoadResendOtp] = useState(false)
  const [showResend, setShowResend] = useState(false)
  const [mobileApiError, setMobileApiError] = useState('')
  const [tabActive, setTabActive] = useState('mobile')
  const router = useRouter()
  const { toast } = useToast()

  const sendOTP = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setMobileError('')

    try {
      mobileSchema.parse({ mobileNumber })
      setIsOtpSend(false)
      setLoadSendOTP(true)
      const body = {
        username: mobileNumber,
      }

      try {
        const res = await Axios.post('/login-otp', body)
        if (res.status === 200 && res.data?.valid) {
          setIsOtpSend(true)
          setTimer(60)
          setShowResend(false)
          toast({
            title: 'Success',
            description: res?.data?.message ? res?.data?.message : '',
          })
        } else {
          setIsOtpSend(false)
          toast({
            title: 'Error',
            description: res?.data?.message ? res?.data?.message : '',
          })
        }
      } catch (error) {
        setIsOtpSend(false)
      } finally {
        setLoadSendOTP(false)
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMobileError(error.errors[0].message)
      }
    }
  }

  // resend otp
  const ResendOTP = async () => {
    setMobileError('')
    setLoadResendOtp(true)
    try {
      mobileSchema.parse({ mobileNumber })

      setLoadSendOTP(true)
      const body = {
        username: mobileNumber,
      }

      try {
        const res = await Axios.post('/login-otp', body)
        if (res.status === 200 && res?.data?.valid) {
          setIsOtpSend(true)
          setTimer(60)
          setShowResend(false)
          toast({
            title: 'Success',
            description: res?.data?.message
              ? res?.data?.message
              : 'OTP send Successfully',
          })
        } else {
          setIsOtpSend(false)
          toast({
            title: 'Success',
            description: res?.data?.message
              ? res?.data?.message
              : 'Failed, Try again later',
          })
          setIsOtpSend(true)
        }
      } catch (error) {
        setIsOtpSend(false)
        toast({ title: 'Success', description: 'Failed, Try again later' })
      } finally {
        setLoadSendOTP(false)
        setLoadResendOtp(false)
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMobileError(error.errors[0].message)
        setLoadResendOtp(false)
      }
    }
  }

  const onVerifyOtp = useCallback(
    async (otp: string) => {
      const body = {
        username: mobileNumber,
        code: otp,
      }
      try {
        const res = await Axios.post('/verify-login', body)
        if (res.status === 200 && res?.data?.valid) {
          const token = res.data.token
          Cookies.set('token', token, { expires: 7 })
          toast({
            title: 'Success',
            description: res?.data?.message,
          })

          window.location.reload()

          router.push('/Admin/dashboard')
        } else {
          toast({
            title: 'Error',
            description: res?.data?.message,
          })
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Server error',
        })
        console.error(error)
      }
    },
    [mobileNumber, router],
  )

  useEffect(() => {
    if (value?.length === 6) {
      onVerifyOtp(value)
    }
  }, [value, onVerifyOtp])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isOtpSend && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      setShowResend(true)
    }
    return () => clearInterval(interval)
  }, [isOtpSend, timer])

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNumber(e.target.value)
    setIsOtpSend(false)
    setValue('')
    setTimer(60)
    setShowResend(false)
  }

  useEffect(() => {
    if (mobileNumber?.length === 10) {
      sendOTP()
    } else {
      setIsOtpSend(false)
      setValue('')
      setTimer(60)
      setShowResend(false)
    }
  }, [mobileNumber])

  const handleResend = () => {
    ResendOTP()
  }

  const handleLoginByEmail = async (e: React.FormEvent) => {
    e.preventDefault()

    setEmailError('')
    setPasswordError('')
    setLoginLoading(true)

    try {
      emailSchema.parse({ email, password })
      try {
        const res = await Axios.post('/login-user', { email, password })
        console.log('email and password are valid', email, password)
        console.log('response', res)
        if (res.status === 200 && res?.data?.valid) {
          const token = res?.data?.token
          Cookies.set('token', token, { expires: 14 })
          console.log('toast will token', token)
          toast({
            title: 'Success',
            description: res?.data?.message,
          })
          router.push('/Admin/dashboard')
          
        } else {
          toast({ title: 'Error', description: res?.data?.message })
        }
      } catch (error) {
        ;('error')
        toast({ title: 'Error', description: 'Server error' })
      } finally {
        setLoginLoading(false)
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          setLoginLoading(true)
          if (err.path[0] === 'email') setEmailError(err.message)
          if (err.path[0] === 'password') setPasswordError(err.message)
        })
      }
    } finally {
      setLoginLoading(false)
    }
  }
 
  return (
    <div className="w-full px-12 bg-white md:px-14 md:mt-10 rounded-md  ">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Login</h2>
      </div>

      <div className="space-y-4 bg-white mt-6">
        <Tabs defaultValue="mobile" className="">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger
              className=" dark:bg-gray-100 dark:text-black active:bg-white active:text-black"
              value="mobile"
            >
              Mobile
            </TabsTrigger>
            <TabsTrigger
              className=" dark:bg-gray-100 dark:text-black active:bg-white active:text-black"
              value="email"
            >
              Email
            </TabsTrigger>
          </TabsList>
          <TabsContent value="mobile">
            <Card
              className="mt-4 p-0 bg-white shadow-none border-none"
              style={{ backgroundColor: 'white' }}
            >
              <CardContent className="p-0">
                <form onSubmit={sendOTP}>
                  <div className="space-y-1">
                    <Label className="text-black" htmlFor="mobileNumber">
                      Mobile Number
                    </Label>
                    <Input
                      id="mobileNumber"
                      placeholder="Enter Your Mobile Number"
                      type="tel"
                      className="text-black"
                      value={mobileNumber}
                      style={{ backgroundColor: 'white' }}
                      onChange={handleMobileChange}
                    />
                    {mobileError && (
                      <p className="text-red-500">{mobileError}</p>
                    )}
                  </div>
                  {isOtpSend && (
                    <div className="space-y-1 mt-4">
                      <Label className="text-black" htmlFor="otp">
                        Enter OTP
                      </Label>
                      <div className="space-y-2">
                        <InputOTP
                          maxLength={6}
                          value={value}
                          onChange={(value) => setValue(value)}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot
                              className="text-black bg-white"
                              style={{ backgroundColor: 'white' }}
                              index={0}
                            />
                            <InputOTPSlot
                              className="text-black bg-white"
                              style={{ backgroundColor: 'white' }}
                              index={1}
                            />
                            <InputOTPSlot
                              className="text-black bg-white"
                              style={{ backgroundColor: 'white' }}
                              index={2}
                            />
                            <InputOTPSlot
                              className="text-black bg-white"
                              style={{ backgroundColor: 'white' }}
                              index={3}
                            />
                            <InputOTPSlot
                              className="text-black bg-white"
                              style={{ backgroundColor: 'white' }}
                              index={4}
                            />
                            <InputOTPSlot
                              className="text-black bg-white"
                              style={{ backgroundColor: 'white' }}
                              index={5}
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <div className="text-start text-black text-[12px] font-semibold mt-2">
                        <span>
                          {timer > 0 ? `Resend OTP in ${timer}s` : ''}
                        </span>
                        {showResend && (
                          <Button
                            type="button"
                            className="text-[12px] text-black p-0 m-0 font-semibold"
                            variant="link"
                            onClick={handleResend}
                          >
                            Resend OTP
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                  {!isOtpSend && (
                    <Button
                      className="mt-4 bg-black text-white"
                      type="submit"
                      disabled={loadSendOTP}
                    >
                      {loadSendOTP ? 'Sending OTP...' : 'Send OTP'}
                    </Button>
                  )}
                </form>
              </CardContent>
              <CardFooter className="flex p-0 flex-col mt-5 items-start">
                {/* <p className="text-black mt-2">Don&apos;t have an account? <Link className="text-black font-bold" href="/signup">Sign Up</Link></p> */}
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="email">
            <Card
              className="mt-4 bg-white shadow-none border-none p-0"
              style={{ backgroundColor: 'white' }}
            >
              <CardContent className="space-y-2 p-0">
                <form onSubmit={handleLoginByEmail}>
                  <div className="space-y-1 ">
                    <Label className="text-black" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="Enter Email"
                      type="email"
                      value={email}
                      className="text-black bg-white"
                      style={{ backgroundColor: 'white' }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="text-red-500">{emailError}</p>}
                  </div>
                  <div className="space-y-1 relative mt-4">
                    <Label className="text-black" htmlFor="password">
                      Password
                    </Label>
                    <Input
                      id="password"
                      placeholder="Enter Password"
                      style={{ backgroundColor: 'white' }}
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-black bg-white"
                    />
                    {passwordError && (
                      <p className="text-red-500">{passwordError}</p>
                    )}
                    <button
                      type="button"
                      className="absolute text-white inset-y-0 right-0 pr-3 flex items-center "
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff size={20} className="mt-6 text-black" />
                      ) : (
                        <Eye size={20} className="mt-6 text-black" />
                      )}
                    </button>
                  </div>
                  <p className="text-end text-black text-sm mt-2">
                    <Link href="/forgot-password">Forgot Password</Link>
                  </p>
                  <Button
                    className="w-full bg-black hover:bg-black text-white mt-4"
                    type="submit"
                    disabled={loginLoading}
                  >
                    {loginLoading ? 'Submitting...' : 'Submit'}
                  </Button>
                </form>
              </CardContent>

              {/* <div className="flex items-center mt-3">
                <p
                  className="border"
                  style={{ height: '0.7px', width: '49%', overflow: 'hidden' }}
                ></p>
                <p style={{ fontSize: '14px' }} className="text-black">
                  OR
                </p>
                <p
                  className="border"
                  style={{ height: '0.7px', width: '49%', overflow: 'hidden' }}
                ></p>
              </div> */}

              {/* <div className="mt-3">
                <span className="submit-button-google">                   
                  <Button className="w-full text-black  bg-white hover:bg-white"  onClick={() => googleLogin()}>
                    <Image src={googleicon} width={20} height={20} alt="" className="mr-8"/> Sign in with Google &nbsp;
                  </Button>
                </span>
              </div> */}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
