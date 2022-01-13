/**
 * (success:1000) (err:3000) (auth:2000)
 *
 */
const codes = {
    success:200,
    auth:401,
    error:400,
}

const handCode = {
    success(data:any){
        return {
            code:codes.success,
            data
        }
    },
    error(msg:string){
        return {
            code:codes.error,
            msg
        }
    }
}
export default handCode
