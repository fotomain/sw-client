/** @jsxImportSource @emotion/react */

import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {css} from "@emotion/react";

const SpinnerBasic = (props:any) => {

    const {radius,...other} = props;

    let r=25
    if(radius) r=radius

    const [state, set_state] = useState({
        nSeconds:0
    });

    useEffect(() => {

        setInterval(()=>{
            set_state((prev_state: any) => {return {...prev_state,
                nSeconds:prev_state.nSeconds + 1,
            }})

        },80)

        return () => {

        };
    }, []);

    const uiState = useSelector((state:any) => state.uiState );

  return <div css={css` background-color: transparent`}>
      <svg
          width={r*2+30}
          height={r*2+30}
          view-box={"-10 -10 "+(r*4)+" "+(r*4)+""}
          xmlns="http://www.w3.org/2000/svg"
          style={{
              transform: "rotate(-90deg)",
          }}
          {...other}
      >
          <circle
              r={r}
              cx={40}
              cy={40}
              fill="transparent"
              stroke="#e0e0e0"
              strokeWidth={10}

              strokeDasharray="188.4px"
              strokeDashoffset={0}
          />
          <circle
              r={r}
              cx={40}
              cy={40}
              fill="transparent"
              stroke={uiState.colorPrimary}
              strokeWidth={10}

              strokeLinecap="round"

              strokeDasharray="188.4px"
              strokeDashoffset={(50 - state.nSeconds * 30) + "px"}

          />
      </svg>
  </div>
}

export default SpinnerBasic
