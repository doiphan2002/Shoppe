import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { login } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
import Input from 'src/components/Input/Input'


type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])

export default function Login() {
  const {
    register,
    setError,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => login(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
        onSuccess: (data) => {
          console.log('data', data)
        },
        onError: (error) => {
          if(isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
            const formError = error.response?.data.data
            if (formError) {
              Object.keys(formError).forEach(key => {
                setError(key as keyof FormData, {
                  message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                  type: 'Server'
                })
              })
            }
            // if (formError?.email) {
            //   setError('email', {
            //     message: formError.email,
            //     type: 'Server'
            //   })
            // }
            // if(formError?.password) {
            //   setError('password', {
            //     message: formError.password,
            //     type: 'Server'
            //   })

            // }
            
          }
        }
      })
    })
    const value = watch()
    console.log(value, errors)

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email/Số điện thoại/Tên đăng nhập'
                autoComplete='on'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full bg-red-500 text-center py-3 px-2 uppercase text-white text-sm hover:bg-red-600'
                >
                  Đăng Nhập
                </button>
              </div>
              <div className='flex items-center text-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link className='text-red-400 ml-1' to='/register'>
                  Đăng Ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
