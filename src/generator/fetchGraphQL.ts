
export const fetchGraphQL= (params:any) =>{

    // const mode='local'
    const mode:any="global"

    let fetchPath=''
    const pathLocal = 'http://localhost:8088/graphql.php'
    // const pathGlobal = 'https://sw-server-przw.onrender.com/graphql.php'
    const pathGlobal = 'https://site555.antinedoebit.com/app1/html/graphql.php'

    switch (mode){
        case "local": fetchPath=pathLocal; break;
        default: fetchPath=pathGlobal;
    }
    console.log("mode1 pathLocal1 === ",mode, pathGlobal)
    return fetch(fetchPath, {
        method: 'post',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: params.gqlRequest})
    }).then((responseData) => {
        console.log("=== responseData1",responseData)
        responseData.json().then((d:any) => {
            console.log("=== responseData ",params.entityName,d)
            params.setDataCallback(d)
        })
    }).catch((e) => {
        console.log('=== setError countries ',e)
        console.log(e)
    })
}

