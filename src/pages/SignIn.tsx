import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import { selectUser, setUser } from '../redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useLoginMutation } from '../services/user';


const SignIn = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [
        login,
        { isLoading: loading, isError, error, isSuccess },
    ] = useLoginMutation() as any;
    const message = isError ? error?.data?.error : isSuccess ? "Signin Successful" : "";
    const { isLoggedIn } = useAppSelector(selectUser)
    const dispatch = useAppDispatch();
    const from = useLocation().state?.from;
    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEmailError("");
        setPasswordError("");
        emailRef.current?.classList.remove('border-red-500');
        passwordRef.current?.classList.remove('border-red-500');
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        if (!email) {
            emailRef.current?.classList.add('border-red-500');
            setEmailError('This field is required');
            return
        }
        if (!password) {
            passwordRef.current?.classList.add('border-red-500');
            setPasswordError('This field is required');
            return
        }
        login({ email, password }).then((res: any) => {
            if (res?.data?.token) {
                dispatch(
                    setUser({ token: res.data.token, isLoggedIn: true, email: res.data.email, id: res.data.id })
                )
            }
        })
        dispatch(
            setUser({
                isLoggedIn: true,
            })
        )

    }
    useEffect(() => {
        if (isLoggedIn) {
            navigate(from || '/')
        }
    }, [isLoggedIn, navigate, from])

    return (
        <div className='flex justify-center items-center h-full w-full'>
            <div className="w-[444px] h-[576px] ">
                <div className="w-[444px] h-[576px] py-[54px] px-[62px] top-0 left-0 bg-white rounded-[16px] border border-solid border-[#eeeeee] shadow-[0px_8px_8px_-4px_#10182808,0px_20px_24px_-4px_#10182814]" >

                    <div className='flex gap-5 items-center'>
                        <img src="/stack.svg" alt="stack-logo" />
                        <p className="text-[#4E5D78] text-[28px] font-bold ">
                            Stack
                        </p>
                    </div>
                    <p className="text-[#404040] mt-[22px] text-xl font-semibold">Sign in to join with Stack</p>
                    <form onSubmit={handleSubmit} className="mt-[52px]">
                        <div className=" ">
                            <EmailInput emailRef={emailRef} emailError={emailError} />
                        </div>
                        <div className="mt-5 mb-5">
                            <PasswordInput passwordRef={passwordRef} passwordError={passwordError} meter={false} />
                        </div>
                        <div className="">
                            {message && <p className=" text-sm my-[6px]">{message}</p>}
                            <button type="submit"
                                disabled={loading}
                                className="w-full h-[40px] bg-[#2f80ed] rounded-[4px] text-white font-bold">{
                                    loading ? "Loading..." : "Sign In"
                                }</button>
                        </div>
                        <div className="mt-[25px]">
                            <p className="text-[#B0B7C3]">Already have an account? <Link to={"/signup"} className="text-[#377DFF]">Sign Up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;