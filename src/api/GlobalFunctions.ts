

// const myObj: {[index: string]:any} = {}


let fake_array:any[]=[]
for (let i = 0; i < 500; i++) {
    fake_array.push(i)
}

export const list_all_events = () => {

    Object.keys(window).forEach(key => {
        if(/./.test(key)){
            window.addEventListener(key.slice(2), event => {
                console.log('=== addEventListener',key, event)
            })
        }
    })

}

export const round2 = (xx:number) =>{
    return Math.round(( xx * 100) ) / 100
}

export const color_hex_to_rgba = (p:any)=>{
    const {hex, opacity} = p
    var c:any;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+((opacity)?opacity:'1')+')';
    }
    throw new Error('Bad Hex');
}

export const mui_width_in=(s:string,mui_width:any)=>{
    const v=mui_width
    return -1!==s.indexOf(v)
}

export const muiWidth = (p:any) => {
    const useMediaQuery = p.useMediaQuery
    const theme = p.theme
    // const theme: Theme = useTheme();
    const Breakpoint:any[] = [...theme.breakpoints.keys].reverse();
    const keys:any = Breakpoint
    return (
        keys.reduce((output: any, key: any) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) || 'xs'
    );
}

export const rectIsInsideRect = (who:any,where:any) => {
    let is_inside=false
    if(
        (where.left <= who.left) && ((who.left+who.width) <= (where.left+where.width))
        &&
        (where.top <= who.top) && ((who.top+who.height) <= (where.top+where.height))
    ){
        is_inside=true
    }

    // console.log('=== isMouseOverRef e.clientX  ',e.clientX);
    // console.log('=== isMouseOverRef e.clientY  ',e.clientY);
    // console.log('=== isMouseOverRef eleBounds  ',eleBounds);
    console.log('=== xy_last_click is_inside rectIsInsideRect ',is_inside);
    return is_inside
};
export const isMouseOverRef = (e:any,box_ref:any) => {
    const eleBounds = box_ref.current.getBoundingClientRect();
    let ret = false;
    if (
        ( (eleBounds.left <= e.clientX) && (e.clientX <= eleBounds.right))
        &&
        ( (eleBounds.bottom >= e.clientY) && (e.clientY >= eleBounds.top))
    ) {
        ret = true;
        // console.log('=== isMouseOverRef !!!!!!!!!  ');
    } else {
        ret = false;
    }
    // console.log('=== isMouseOverRef e.clientX  ',e.clientX);
    // console.log('=== isMouseOverRef e.clientY  ',e.clientY);
    // console.log('=== isMouseOverRef eleBounds  ',eleBounds);
    // console.log('=== isMouseOverRef ',ret);
    return ret
};

export const toHHMMSS = (p:any) => {
    var sec_num = parseInt(p as string, 10); // don't forget the second param
    let hours   = Math.floor(sec_num / 3600)
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
    let seconds = (sec_num - (hours * 3600) - (minutes * 60))

    let hours1=hours.toString()
    let minutes1=minutes.toString()
    let seconds1=seconds.toString()

    if (1==hours1.length)   hours1   = "0"+hours1
    if (1==minutes1.length) minutes1 = "0"+minutes1
    if (1==seconds1.length) seconds1 = "0"+seconds1

    if(Number(this)<3600)
        return minutes1+':'+seconds1;
    else
        return hours1+':'+minutes1+':'+seconds1;
}


export function isCyclic (obj:any) {
    var seenObjects:any = [];

    function detect (obj:any) {
        if (obj && typeof obj === 'object') {
            if (seenObjects.indexOf(obj) !== -1) {
                return true;
            }
            seenObjects.push(obj);
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && detect(obj[key])) {
                    console.log('************** global_props.navigation user_settings_crud_update cycle at key ', key);
                    console.log('************** obj ' ,obj);
                    return true;
                }
            }
        }
        return false;
    }

    return detect(obj);
}

export const add_zeros = (n:number,main:string) => {
    return (new Array(n).join('0').slice((n || 2) * -1) + main) as string;
}

export function delayms  (milliseconds:number) {
    // promisify
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });

}

export function JSON_stringify(obj:any) {
    let cache:any = [];
    let str = JSON.stringify(obj, function(key, value) {
        if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null; // reset the cache
    return str;
}

export function stringify_clear (obj:any) {
    return JSON.stringify(obj,function(key, value){
        return (typeof value === 'function' ) ? 'function0' : value;
        // return (typeof value === 'function' ) ? value.toString() : value;
    });
}

export const get_theme_now = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches?'theme_now_dark':'theme_now_light'
}
export function random_key(){
    return '_'+(Math.round(Math.random()*1000000)).toString()
}

export function _px2int(param:string){
    console.log('=== param1  ',param)
    if(!param) return parseInt(param)
    const ret = param.toString()
    return parseInt(ret.replace('px',''))
}

const gl_duplicate_quotes = (p_str:string) => {

    let tArr:string[] = p_str.split('')
    tArr = tArr.map((el:any)=>{
        if(el!=="'") { return el }
        else        { return  "''" }
    })
    return tArr.join('')

}


const asyncLocal_Storage = {
    setItem: function (key:string, value:string) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem: function (key:string) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    }
};



export const is_correct = (t:string,v:string) => {
    if(t==="email") {
        const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        // console.log('=== is_correct email ',emailPattern.test(v))
        return emailPattern.test(v)
    }
    if(t==="password") {
        const p1 = (v.length>=8)
        // console.log('=== is_correct password ',p1)
        return p1
    }

    return true
}

export const is_empty = (p:any,n?:any) => {

    // console.log('=== is_empty n ',n,p,typeof p)
    // console.log('=== is_empty n ',n,typeof p)

    // if('string' === typeof p){
    //     if(p==='' )
    //     return true
    // }

    if(undefined === p){return true}
    if(null === p){return true}

    if(typeof p === 'object'){
        return 0===Object.keys(p).length
    }
    if(typeof p === 'undefined'){
        return true
    }

    if('not_defined' === p){return true}
    if(null===p) {return true}
    const str_ =p.toString()
    if(""===str_) { return true}


    let ret_=null;
    if(p){
        if(('<empty string>'===str_) || ('undefined'===str_)){
            // console.log('=== do_label_focused is_empty 2 ' )
            ret_= true
        }else {
            // console.log('=== do_label_focused is_empty 3 ',str_ )
            // ret_ = false
        }
    } else {
        // console.log('=== do_label_focused is_empty 1 ' )
        ret_= true;
    }

    // console.log('=== do_label_focused is_empy',str_,ret_)

    return false

}


