import {useEffect} from "react";

const useClickOut = (
    ref:any,
    keyState:boolean,
    callback:any,
    excludeId?:string[],
)=> {
    useEffect(() => {

        function handleClickOutside(event:any) {

            if(!keyState) return;


            let exclussivePressed=false
            if(excludeId){
                exclussivePressed = (-1!==excludeId.indexOf(event.target.id))
            }

            if (
                ref.current
                && !ref.current.contains(event.target)
                && !exclussivePressed
            ) {
                    // alert("outside of me!");
                    if(callback)
                        callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref,keyState,callback,excludeId]);
}

export default useClickOut;
