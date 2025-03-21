import {useEffect} from "react";

const useClickOut = (ref:any,keyState:boolean,callback:any,excludeId?:string)=> {
    useEffect(() => {

        function handleClickOutside(event:any) {

            if(!keyState) return;

            // console.log('event.target1',event.target)
            // console.log('event.target1',event.target.id)

            if (
                ref.current
                && !ref.current.contains(event.target)
                && (excludeId!==event.target.id)
            ) {
                    // alert("outside of me!");
                    if(callback)
                        callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // console.log("removeEventListener1")
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref,keyState]);
}

export default useClickOut;
