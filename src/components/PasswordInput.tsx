import { ChangeEvent, FC, useState } from 'react';

interface PasswordInputProps {
    passwordRef: React.RefObject<HTMLInputElement>;
    passwordError: string;
    meter: boolean;
}

const PasswordInput: FC<PasswordInputProps> = ({
    passwordRef,
    passwordError,
    meter
}) => {
    const [passwordStrength, setPasswordStrength] = useState("");
    const checkPasswordStrength = (password: string) => {
        if (!password) {
            setPasswordStrength("");
            return;
        }
        // Strong password: 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
        // Medium password: 6 characters, 1 uppercase, 1 lowercase, 1 number
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (strongRegex.test(password)) {
            setPasswordStrength("strong");
        } else if (mediumRegex.test(password)) {
            setPasswordStrength("medium");
        } else {
            setPasswordStrength("weak");
        }

    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>
    ) => {
        checkPasswordStrength(e.target.value);
    }

    const passwordStrengthMeter = () => {
        if (passwordStrength === "weak") return (
            <>
                {Array.from(Array(2).keys()).map((_, index) => (
                    <div key={index} className={`w-[33.33%] h-[4px] rounded-[4px] bg-red-500 `}></div>
                ))}
                {Array.from(Array(4).keys()).map((_, index) => (
                    <div key={index} className={`w-[33.33%] h-[4px] rounded-[4px] bg-gray-300`}></div>
                ))}
            </>
        )
        else if (passwordStrength === "medium") return (
            <>
                {Array.from(Array(4).keys()).map((_, index) => (
                    <div key={index} className={`w-[33.33%] h-[4px] rounded-[4px] bg-yellow-500`}></div>
                ))}
                {Array.from(Array(2).keys()).map((_, index) => (
                    <div key={index} className={`w-[33.33%] h-[4px] rounded-[4px] bg-gray-300`}></div>
                ))}
            </>
        )
        else if (passwordStrength === "strong") return (
            <>
                {Array.from(Array(6).keys()).map((_, index) => (
                    <div key={index} className={`w-[33.33%] h-[4px] rounded-[4px] bg-green-500`}></div>
                ))}
            </>
        )
        else return (
            <>
                {Array.from(Array(6).keys()).map((_, index) => (
                    <div key={index} className={`w-[33.33%] h-[4px] rounded-[4px] bg-gray-300`}></div>
                ))}
            </>
        )
    }
    return (
        <>
            <label htmlFor="password" className="text-[#344054] text-sm">Password</label>
            <input ref={passwordRef} type="password" onChange={handleChange} name="password" id="password" className="w-full h-[40px] border border-[#eeeeee] rounded-[8px] px-[12px] py-[8px] mt-[8px] focus:outline-[#D6BBFB] transition-all" placeholder='Password' />
            <div className="error  ">
                {passwordError && <p className="text-[#F04438] text-sm mt-[6px]">{passwordError}</p>}
                {/* password stregth meter */}
                <div className="flex gap-3 mt-5">             {meter && passwordStrengthMeter()}
                </div>
            </div>
        </>
    );
};

export default PasswordInput;