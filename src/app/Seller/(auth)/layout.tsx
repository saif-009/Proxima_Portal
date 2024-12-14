import Image from 'next/image'
import signup_login_image from '../../../../public/login_img_1.png'
import brandlogo from '../../../../public/meta_login.svg'
import leapxLogo from '../../../../public/extractimages_8312024_71455.png'
// import brandlogo from '../../../public/'

import './auth.css'

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="md:flex h-screen w-full  signup-container p-3 m-0 overflow-y-auto  md:bg-inherit md:overflow-y-hidden ">
      {/* Left Side: Image */}
      <div className="flex-1 hidden  md:flex justify-center items-center bg-cover bg-center bg-no-repeat">
        <div className="text-center w-full flex justify-center bg-red-black ">
          <Image
            src={signup_login_image}
            alt="Login"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className=" md:w-[357px] rounded-sm  md:pe-[15px] md:pb-[5px] overflow-y-auto bg-white  md:ps-[0px] lg:w-[525px]  h-[97vh] w-[-webkit-fill-available]  md:bg-inherit" style={{backgroundColor:'white'}}>
        <div className=" mx-auto flex flex-col justify-start md:block rounded-sm  mb-12  bg-white w-[100%]">
          <div className="  w-full px-12 md:px-14  ">
            <div className="flex justify-between text-center w-full mt-24 md:mt-4  items-center">
              <Image
                src={leapxLogo}
                alt="Brand Logo"
                className="max-w-[120px] max-h-[100px]"
                // layout="fill"
                objectFit="contain"
              />
              <Image
                src={brandlogo}
                alt="Brand Logo"
                className="max-w-[150px] max-h-[75px]"
                // layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          {children}
          
        </div>
      </div>
    </div>
  )
}
