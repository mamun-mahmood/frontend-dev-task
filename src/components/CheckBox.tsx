import { FC } from "react";

interface CheckBoxProps {
    value: string;
    checked: boolean;
    onChange: (e: any) => void;
}
const CheckBox: FC<CheckBoxProps> = ({ value, checked, onChange }) => {
    return (
        <label className="checkbox-container">
            <input onChange={onChange} className="custom-checkbox" checked={checked} value={value} type="checkbox" />
            <span className="checkmark"></span>
        </label>
    );
};

export default CheckBox;