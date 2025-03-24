
const show_arrays=()=>{
    const matrix2d:any[] = []
    matrix2d[1] = [3,2,4]


    const matrix3d = new Array()
    var Object3d:any = new Object()

    for (let i = 0; i < 3; i++) {
        matrix3d[i] = new Array()
        Object3d['x'+i] = new Object()
        for (let j = 0; j < 3; j++) {
            matrix3d[i][j] = new Array()
            Object3d['x'+i]['y'+j] = new Object()
            for (let k = 0; k < 3; k++) {
                Object3d['x'+i]['y'+j]['z'+k] = i+'-'+j+'-'+k
                // matrix3d['x'+i.toString()]['y'+j.toString()]['z'+k.toString()] = i+'-'+j+'-'+k
                // matrix3d[i][j][k] = i+'-'+j+'-'+k
                // Object3d['x-'+i.toString()] = ['y-'+j]
            }
        }
    }

    const addElement = ( obj:any, params:any, val:any )=>{
        obj[params.x] = new Object()
        obj[params.x][params.y] = new Object()
        obj[params.x][params.y][params.z] = val
        return obj
    }

    const el88:any = addElement(Object3d, {x:'x88', y:'y88', z:'z88'},"55555555555")
    console.log("=== el88",el88)

    Object3d.x99 = new Object()
    Object3d.x99.y99 = new Object()
    Object3d.x99.y99.z99 = "999999999999"


    console.log("=== Object3d.x99.y99.z99",Object3d.x99.y99.z99)
    console.log("=== Object3d.x1.y1.z1",Object3d.x1.y1.z1)
    Object3d.x1.y1.z1 = "RRRRRRRRRRRR"
    console.log("=== Object3d.x1.y1.z1",Object3d.x1.y1.z1)
    console.log("=== Object3d",Object3d)

}

export default show_arrays
