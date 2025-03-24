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

            console.log('v1-3 event.target1',event.target)
            console.log('v1-3 event.target1',event.target.id)

            let exclussivePressed=false
            if(excludeId){
                exclussivePressed = (-1!==excludeId.indexOf(event.target.id))
            }
            console.log('v1-4 exclussivePressed',exclussivePressed)

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
            // console.log("removeEventListener1")
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref,keyState]);
}

export default useClickOut;
