import { ui } from "./LayoutPage"
import {useEffect, useState} from "react";

const SpinnerFast = (props:any) => {

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

  return <>
      <svg
          width={80}
          height={80}
          view-box="-10 -10 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
              transform: "rotate(-90deg)",
          }}
          {...props}
      >
          <circle
              r={25}
              cx={40}
              cy={40}
              fill="transparent"
              stroke="#e0e0e0"
              strokeWidth={10}

              strokeDasharray="188.4px"
              strokeDashoffset={0}
          />
          <circle
              r={25}
              cx={40}
              cy={40}
              fill="transparent"
              stroke={ui.colorMain}
              strokeWidth={10}

              strokeLinecap="round"

              strokeDasharray="188.4px"
              strokeDashoffset={(50 - state.nSeconds * 30) + "px"}

          />
      </svg>
  </>
}

export default SpinnerFast
