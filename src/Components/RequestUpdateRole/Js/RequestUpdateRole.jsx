import { useState, useEffect } from "react"
import cl from "../Style/RequestUpdateRole.module.css"
import {getUserInfo, requestToSeller, requestToUser} from "../../../webFunctions"

const RequestUpdateRole = () => {
    let urAddress = sessionStorage.getItem("userAddress")
    let urRole

    const [shop, setShop] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        async function ge() {
            if (urAddress !== null) {
                let user = await getUserInfo(urAddress)
                setRole(user.role)
            }
        }
        ge()
    }, [])

    async function getReq(shopAddress) {
        console.log(role);
        if (role === 0n) {
            if (shopAddress === '') {
                alert("Неккоректный адрес")
            } else {
                requestToSeller(urAddress, shopAddress)
            }
        } else if (role === 2n) {
            requestToUser(urAddress)
        }
    }

    return (
        <div className={cl.main}>
            <div style={role === 2n || role === 1n ? {display: "block"} : {display: "none"}} className={cl.to_user}>
                <h1>Стать покупателем:</h1>
                <button className={cl.to_user_btn}>
                    <span className={cl.to_user_text}>Подать заявление</span>
                </button>
            </div>

            <div style={role !== 0n ? {display: "none"} : {display: "block"}} className={cl.to_seller}>
                <h1>Стать продавцом:</h1>

                <input onChange={e => setShop(e.target.value)} value={shop} type="text" placeholder="Введите адрес магазина..." />

                <button onClick={() => getReq(shop)} className={cl.to_seller_btn}>
                    <span className={cl.to_seller_text}>Подать заявление</span>
                </button>
            </div>
        </div>
    )
}

export default RequestUpdateRole