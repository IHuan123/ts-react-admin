import { BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"
import Login from "@/views/Login/Login"
import Layout from "@/layout/Index"


const mapStateToProps = (state:any)=>({
    token:state.user.token,
})
interface IProps {
    token:string|null;
    [propName:string]:any
}
function AppRouter({ token }:IProps) {
    if (!token || token==="null" || token==="undefined") {
        return <Login/>
    }
    return (
        <Router>
            <Layout/>
        </Router>
    )
}


export default connect(mapStateToProps,null)(AppRouter);
