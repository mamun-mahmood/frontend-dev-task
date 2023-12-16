import { FC } from "react";

interface IconButtonProps {
    icon: string;
    onClick: () => void;
}
const IconButton: FC<IconButtonProps> = ({
    icon,
    onClick,
}) => {
    return (
        <button onClick={onClick} className={`w-[33px] h-[33px] rounded-[6px]   flex items-center justify-center hover:opacity-80 hover:border-[1px] transition-opacity`}>
            <img src={icon} alt={icon} />
        </button>
    );
};

export default IconButton;