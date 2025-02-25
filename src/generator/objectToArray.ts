export const objectToArray = (p:any) => {
    var obj1:any = p
    var result1:any[] = Object.keys(obj1).map((key) => [{key:parseInt(key),...obj1[key]}]);
    return result1
}
