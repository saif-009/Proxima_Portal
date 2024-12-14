import Link from 'next/link'
import bg from '../../public/login_img_2.png'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black ">
      <div className='flex items-center justify-center w-1/2'>
        <Image
        src={bg}
        alt="Background"
        className="object-cover z-0"
        quality={100}
      />
      </div>
      
      <div className="flex flex-col items-center justify-center w-1/2">
        <h1 className="text-4xl font-bold mb-8 text-white">
          Welcome 
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/Seller/login"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Seller Login
          </Link>
          <Link
            href="/Admin/login"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  )
}
