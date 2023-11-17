import cl from "..//Style/Css/ChangeRole.module.css"
import { changeRole, getUserInfo } from "../../../webFunctions"
import { useEffect, useState } from "react"

const ChangeRole = () => {
    let usrAddress = sessionStorage.getItem("userAddress")

    const [address, setAdr] = useState('')
    const [shop, setShop] = useState('')
    const [usrRole, setRoleUser] = useState('')
    const [role, setRole] = useState("0")

    useEffect(() => {
        async function ge() {
            if (usrAddress !== null) {
                let user = await getUserInfo(usrAddress)
                setRoleUser(user.role)
            }
        }
        ge()
    }, [])

    async function update() {
        let usr = await getUserInfo(usrAddress)

        if (role === '2') {
            if (shop === '') {
                alert(`Заполните поле "адрес магазина"`)
            } else {
                if (usr.role !== 1n) {
                    alert("Вы не админ")
                } else {
                    changeRole(usrAddress, address, 2, shop)
                    alert("готово")
                }
            }
        } else if (role === "0") {
            console.log(1);
            if (usr.role !== 1n) {
                console.log(usr.role);
                alert("Вы не админ")
            } else {
                alert("готово")
                changeRole(usrAddress, address, 0, "0x0000000000000000000000000000000000000000")
            }
        }
        console.log(role);
    }

    return (
        <div style={usrRole === 1n ? {display: "block"} : {display: "none"}} className={cl.change_role}>
            <h1 className={cl.head_text}>Изменение ролей</h1>

            <div className={cl.inpAdress}>
                <label htmlFor="">Адрес:</label>
                <input onChange={ev => setAdr(ev.target.value)} value={address} type="text" placeholder="Введите адрес..." />
            </div>

            <div className={cl.magazine}>
                <label htmlFor="">Адрес магазина(если требуется)</label>
                <input onChange={ev => setShop(ev.target.value)} value={shop} type="text" placeholder="Введите адрес магазина..." />
            </div>

            <div className={cl.role}>
                <select onChange={ev => setRole(ev.target.value)} value={role} className={cl.select_role}>
                    <option value="0">Пользователь</option>
                    <option value="2">Продавец</option>
                </select>
            </div>

            <button onClick={update} className={cl.change_btn}>
                <span>Обновить роль</span>
            </button>

            <div className={cl.requests_div}>
                <h1>Заявки на изменение роли</h1>

                <button className={cl.generate}>
                    <span>Сгенерировать запросы</span>
                </button>

                <div className={cl.requests}>
                    {}
                </div>
            </div>
        </div>
    )
}

export default ChangeRole