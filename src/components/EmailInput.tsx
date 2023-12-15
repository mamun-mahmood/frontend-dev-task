import { FC } from 'react';

interface EmailInputProps {
    emailRef: React.RefObject<HTMLInputElement>;
    emailError: string;
}

const EmailInput: FC<EmailInputProps> = ({
    emailRef,
    emailError
}) => {
    return (
        <>
            <label htmlFor="email" className="text-[#344054] text-sm">Email</label>
            <input ref={emailRef} type="text" name="email" id="email" className="w-full  border-[1px] border-solid rounded-[8px] px-[12px] py-[8px] mt-[8px]
            focus:outline-[#D6BBFB] transition-all" placeholder='Enter Email' />
            {emailError && <p className="text-[#F04438] text-sm mt-[6px]">{emailError}</p>}
            
        </>
    );
};

export default EmailInput;