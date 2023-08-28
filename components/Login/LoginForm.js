import { login, reset } from '@/features/auth/authSlice'
import { loginFormValidator } from '@/utils/functions'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function LoginForm() {
    const errorInitialState = {
        email: {
            message: "",
        },
        password: {
            message: "",
        },
    }
    const router = useRouter()
    const dispatch = useDispatch()
    const { isLoading, isError, isSuccess, user, Message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(Message)
        }
        if (isSuccess && user) {
            toast.success('login successful')

        } else if (isSuccess || user) {
            router.push("/dashboard");
        }
        return () => {
            dispatch(reset());
        };

    }, [isError, isSuccess, user, Message, dispatch, router])


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState(errorInitialState)
    const resetErrors = () => {
        setErrors(errorInitialState)

    }
    const onChangeSetter = (setter, value) => {
        setter(value);
        resetErrors()

    }


    const onSubmit = async (e) => {

        const formData = {
            email: email,
            password: password,
        }

        const { validated, error } = loginFormValidator(email, password, errors)
        if (!validated) {
            setErrors(error);
            return;
        }

        dispatch(login(formData))
    }
    return (
        <div className="flex md:w-1/2 w-full h-2/3 md:h-full  justify-center py-10 items-center bg-white">
            <form className="bg-white text-black">
                <h1 className="text-gray-800 font-bold text-2xl mb-4 ml-8">Login now!</h1>
                
                {errors?.lastName?.message ? <p className={`text-red-700 text-sm ml-6`}>{errors?.lastName?.message}</p> : ""}
                <div className={`flex items-center border-2 py-2 px-3 rounded-2xl mt-4 ${errors?.email?.message.length > 3 ? "border-red-700" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <input className="pl-2 outline-none border-none" type="email" name="" id="" placeholder="Email Address" value={email} onChange={(e) => onChangeSetter(setEmail, e.target.value)} />
                </div>
                {errors?.email?.message ? <p className={`text-red-700 text-sm ml-6`}>{errors?.email?.message}</p> : ""}
                <div className={`flex items-center border-2 py-2 px-3 rounded-2xl mt-4 ${errors?.password?.message.length > 3 ? "border-red-700" : ""}`}>
                    <svg onClick={() => setShowPassword((prev) => !prev)} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5  cursor-pointer ${showPassword ? "text-green-700" : "text-red-700"}`} viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clip-rule="evenodd" />
                    </svg>
                    <input className="pl-2 outline-none border-none " type={`${showPassword ? "text" : "password"}`} name="" id="" placeholder="Password" value={password} onChange={(e) => onChangeSetter(setPassword, e.target.value)} />
                </div>
                {errors?.password?.message ? <p className={`text-red-700 text-sm ml-6`}>{errors?.password?.message}</p> : ""}
                <button type="submit" onClick={(e) => { e.preventDefault(); onSubmit() }} className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Sign up</button>
                <a href='/'  className="text-sm ml-12 font-semibold text-blue-700 hover:text-blue-500 cursor-pointer">Don't have an account ?</a>
            </form>
        </div>
    )
}

export default LoginForm