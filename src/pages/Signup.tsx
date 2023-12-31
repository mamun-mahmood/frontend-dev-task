import { FC, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import { useCreateUserMutation } from '../services/user';
import { selectUser, setUser } from '../redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
interface SignInProps {
    // Define your component props here
}

const SignUp: FC<SignInProps> = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [
        mutateAsync,
        { isLoading: loading, isError, error, isSuccess },
    ] = useCreateUserMutation() as any
    const message = isError ? error?.data?.error : isSuccess ? "Signup Successful" : "";
    const { isLoggedIn } = useAppSelector(selectUser)
    const dispatch = useAppDispatch();
    const from = useLocation().state?.from;
    const navigate = useNavigate()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        emailRef.current?.classList.remove('border-red-500');
        passwordRef.current?.classList.remove('border-red-500');
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        if (!email) {
            emailRef.current?.classList.add('border-red-500');
            setEmailError('This field is required');
            return;
        }
        if (!password) {
            passwordRef.current?.classList.add('border-red-500');
            setPasswordError('This field is required');
            return;
        }
        mutateAsync({ email, password }).then((res: any) => {
            if (res?.data) {
                const { token = "ksjdfkaf23hd" } = res.data
                localStorage.setItem('stack-token',
                    JSON.stringify({ token, email, })
                )
                dispatch(
                    setUser({
                        isLoggedIn: true,
                        email,
                        id: 2,
                        token
                    })
                )
            }
        })
    }
    useEffect(() => {
        if (isLoggedIn) {
            navigate(from || '/')
        }
    }, [navigate, from, isLoggedIn])
    return (
        <div className='flex justify-center items-center h-full'>
            <div className="w-[444px] h-[576px] ">
                <div className="w-[444px] h-[576px] py-[54px] px-[62px] top-0 left-0 bg-white rounded-[16px] border border-solid border-[#eeeeee] shadow-[0px_8px_8px_-4px_#10182808,0px_20px_24px_-4px_#10182814]" >
                    <div className='flex gap-5 items-center'>
                        <img src="/stack.svg" alt="stack-logo" />
                        <p className="text-[#4E5D78] text-[28px] font-bold ">
                            Stack
                        </p>
                    </div>
                    <p className="text-[#404040] mt-[22px] text-xl font-semibold">Sign up to join with Stack</p>
                    <form className="mt-[52px]" onSubmit={handleSubmit}>
                        <div className=" ">
                            <EmailInput emailRef={emailRef} emailError={emailError} />
                        </div>
                        <div className="mt-5 mb-5">
                            <PasswordInput passwordRef={passwordRef} passwordError={passwordError} meter={true} />
                        </div>
                        {message && <p className=" text-sm my-[6px]">{message}</p>}
                        <div className="">
                            <button type="submit" className="w-full h-[40px] bg-[#2f80ed] rounded-[4px] text-white font-bold">{
                                loading ? "Loading..." : "Sign Up"}</button>
                        </div>
                        <div className="mt-[25px]">
                            <p className="text-[#B0B7C3]">Already have an account? <Link to={"/signin"} className="text-[#377DFF]">Sign In</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;