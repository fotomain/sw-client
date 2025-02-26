export const objectToArray = (p:any) => {
    var obj1:any = p.array
    var keys:any[] = Object.keys(obj1)
    const result1:any[]=[]
    for (let i = 0; i < keys.length; i++) {
        result1.push({key:keys[i],value:obj1[keys[i]]})
    }

    if(p.keyInteger){
        for (let i = 0; i < result1.length; i++) {
            result1[i].key = parseInt(result1[i].key)
        }
    }

    return result1
}
