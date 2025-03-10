
import {IconType} from "react-icons";
import React from "react";

export interface IconProps {
    icon: IconType;
    size?: number;
    color?: any;
}
const IconMaterial: React.FC<IconProps> = (props:IconProps) => {
    const {icon,...other} = props;
    const Icon = icon
    // @ts-ignore
    return <Icon {...other} />;
};
// IconMaterial.propTypes = {
//     icon: PropTypes.func.isRequired,
// };

export default IconMaterial
