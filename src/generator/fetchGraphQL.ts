
export const fetchGraphQL= (params:any) =>{

    // const mode='local'
    const mode:any="globalDocker"
    // const mode:any="globalPHP"

    let fetchPath=''

    switch (mode){
        case "local": fetchPath='http://localhost:8088/graphql.php'; break;
        case "globalPHP": fetchPath='https://midnightblue-newt-595842.hostingersite.com/app1/html/graphql.php'; break;
        case "globalDocker": fetchPath='https://sw-server-przw.onrender.com/graphql.php'; break;
        default: fetchPath="http://localhost:8088/graphql.php";
    }

    console.log("=== ▄▄▄▄ fetchPath1 ",mode,fetchPath)

    return fetch(fetchPath, {
        method: 'post',
        mode:'cors',
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

