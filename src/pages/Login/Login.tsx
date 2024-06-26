import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-s *:m'>
              <div className='text-2xl'>Đăng Nhập</div>
              <div className='mt-8'>
              <input
              type='email'
              name='email'
              className='w-full p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm'
              placeholder='Email/Số điện thoại/Tên đăng nhập' />
              <div className="mt-1 text-red-600 text-sm min-h-[1rem]"></div>
              </div>
              <div className='mt-3'>
              <input
              type='password'
              name='password'
              className='w-full p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm'
              placeholder='Password' />
              <div className="mt-1 text-red-600 text-sm min-h-[1rem]"></div>
              </div>
              <div className='mt-3'>
                <button className='w-full bg-red-500 text-center py-3 px-2 uppercase text-white text-sm hover:bg-red-600'>Đăng Nhập</button>
              </div>
              <div className='flex items-center text-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link className='text-red-400 ml-1' to='/register'>Đăng Ký</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
  )
}
