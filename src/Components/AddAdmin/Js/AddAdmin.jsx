import cl from "../Style/AddAdmin.module.css"
import { useState } from "react"
import { registerAdmin, getUserInfo } from "../../../webFunctions"

const AddAdmin = () => {

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')

    async function addAdmin () {
        let usrAddress = sessionStorage.getItem("userAddress")
        let usr = await getUserInfo(usrAddress)

        if (name !== '' && address !== '' && password !== '') {  
            if (usr.role === 1n) {
                await registerAdmin(usrAddress, name, address, password)
            }
        } else {
            alert("Заполните пустые поля!")
        }
    }

    return (
        <div className={cl.main}>
            <h1>Добавить админа</h1>

            <label htmlFor="">Имя администратора:</label>
            <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Введите логин..." />

            <label htmlFor="">Адрес администратора:</label>
            <input onChange={e => setAddress(e.target.value)} value={address} type="text" placeholder="Введите адрес.." />

            <label htmlFor="">Пароль администратора:</label>
            <input onChange={e => setPassword(e.target.value)} value={password} type="text" placeholder="Введите пароль..." />

            <button onClick={addAdmin} className={cl.register}>
                <span className={cl.reg_text}>Зарегистрировать</span>
            </button>
        </div>
    )
}

export default AddAdmin