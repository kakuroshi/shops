import cl from "../Style/Css/Main.module.css"
import { Routes, Route } from "react-router-dom"
import ChangeRole from "../../ChangeRole/Js/ChangeRole"
import AddAdmin from "../../AddAdmin/Js/AddAdmin"
import RequestUpdateRole from "../../RequestUpdateRole/Js/RequestUpdateRole"

const Main = () => {
    return (
        <main className={cl.main}>
            <Routes>
                <Route path="/changeRole" Component={ChangeRole} />
                <Route path="/addAdmin" Component={AddAdmin} />
                {/* <Route path="/magazine" Component={} /> */}
                <Route path="/changeRoleRequest" Component={RequestUpdateRole} />
                {/* <Route path="/comments" Component={} /> */}
            </Routes>
        </main>
    )
}

export default Main