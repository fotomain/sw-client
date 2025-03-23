
// === TEST URL
// https://sw-client.netlify.app/product
// https://sw-client-rf5w1cpw1-fotomains-projects.vercel.app/

export const fetchGraphQL= async (params:any) =>{

    const mode:any='localDocker'
    // const mode:any="globalDocker"
    // const mode:any="globalPHP"

    let fetchPath=''

    switch (mode){
        case "localDocker": fetchPath='http://localhost:8088/graphql.php'; break;
        case "globalDocker": fetchPath='https://sw-server-przw.onrender.com/graphql.php'; break;
        case "globalPHP": fetchPath='https://site-sw.antinedoebit.com/app1/html/graphql.php'; break;
        default: {
            const warning = "▄▄▄▄▄▄▄▄ ERROR 1001 bad fetchPath";
            throw new Error(warning);
        }
    }

    console.log("=== ▄▄▄▄ fetchPath1 ",mode,fetchPath)

    if(!params.setDataCallback) {
        return fetch(fetchPath, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: params.gqlRequest})
        })
    }
    else{
        fetch(fetchPath, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: params.gqlRequest})
        }).then((responseData) => {
                // console.log("=== responseData1",responseData)
                responseData.json().then((d:any) => {
                    console.log("▄▄▄▄▄▄▄▄=== responseData ",params.entityName,d)
                    params.setDataCallback(d)
                })

            }).catch((e) => {
            console.log('=== setError countries ',e)
            console.log(e)
        })
    }
}
// ==== MODE setDataCallback
// setDataCallback:(d)=>{
//     console.log('=== READ_PRODUCTS_QUERY response ',d?.data)//
//     // setData((prevState) => { return{ ...prevState,
//     //     cartItems: d?.data?.cart?.items
//     // }})
// },
