
import {IconType} from "react-icons";
import React from "react";

interface IconStar {
    icon: IconType;
    size?: number;
    color?: any;
}
const IconBasic: React.FC<IconStar> = (props:IconStar) => {
    const {icon,...other} = props;
    const Icon = icon
    // @ts-ignore
    return <Icon {...other} />;
};
// IconBasic.propTypes = {
//     icon: PropTypes.func.isRequired,
// };

export default IconBasic
