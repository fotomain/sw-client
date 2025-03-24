import {css} from "@emotion/react";
import IconMaterial from "../../core/lib/IconMaterial";
import {CiGlobe} from "react-icons/ci";
import React from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

const Logo = () => {

    const uiState = useSelector((state: any) => state.uiState);
    const navigate = useNavigate()

    return <div css={css`
        background-color: transparent;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    `}>
        <IconMaterial color={uiState.colorPrimary} size={32} icon={CiGlobe}
                      onClick={() => {
                          navigate(`/home`)
                      }}
        />
    </div>
}
export default Logo;
