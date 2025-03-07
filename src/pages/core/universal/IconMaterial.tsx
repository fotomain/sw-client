
import {IconType} from "react-icons";
import React from "react";

interface IconStar {
    icon: IconType;
    size?: number;
    color?: any;
}
const IconMaterial: React.FC<IconStar> = (props:IconStar) => {
    const {icon,...other} = props;
    const Icon = icon
    // @ts-ignore
    return <Icon {...other} />;
};
// IconMaterial.propTypes = {
//     icon: PropTypes.func.isRequired,
// };

export default IconMaterial
