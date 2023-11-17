import cl from "../Style/Css/Header.module.css"
import { useEffect, useState } from "react"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { getUsers } from "../../../webFunctions";
import { getUserInfo } from "../../../webFunctions";
import { registerUser } from "../../../webFunctions";
import { web3 } from "../../../webFunctions"

const Header = () => {
    const [flagName, setFlName] = useState(0)

    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')
    const [address, setAddress] = useState('')

    const [flagPassword, setFlag] = useState(0)
    const [flagEnter, setEnter] = useState(0)
    const [flagPas, setFlagPas] = useState(0)
    const [flagConfirmationPas, setConfirmation] = useState(0)
    const [flagRegister, setRegister] = useState(0)

    const [passwordReg, setRegPas] = useState('')
    const [passwordRegAcpt, setAcptPas] = useState('')
    const [loginReg, setRegLog] = useState('')
    const [addressReg, setAddressReg] = useState('')


    async function authorization() {
        let flag = false

        const accountsAddresses = await getUsers()

        for (let i = 0; i < accountsAddresses.length; i++) {
            if (accountsAddresses[i] === address) {
                flag = true
            }
        }

        if (!flag) {
            alert("Нет такого пользователя")
            return
        }

        const userInf = await getUserInfo(address)

        if (login === userInf.login && web3.utils.sha3(password) === userInf.password) {
            setLogin(userInf.login)

            sessionStorage.setItem("userLogin", userInf.login)
            sessionStorage.setItem("userAddress", address)

            setEnter(0)
            setFlName(1)
        } else {
            alert("Неверно введеные данные!")
        }
    }

    async function register() {
        const accountsAddresses = await getUsers()
        console.log(accountsAddresses);

        for (let i = 0; i < accountsAddresses.length; i++) {
            if (accountsAddresses[i] === addressReg) {
                alert("Такой адрес уже зарегестрирован!")
                return
            }
        }

        if (passwordReg === passwordRegAcpt) {
            registerUser(loginReg, passwordReg, addressReg)
            setRegister(1)
        } else {
            alert("Неверные данные!");
        }

        setRegister(0)
    }

    useEffect(() => {
        if (sessionStorage.getItem("userLogin") !== null) {
            setFlName(1)
            setLogin(sessionStorage.getItem("userLogin"))
        }
    }, [])


    return (
        <header className={cl.header}>
            <div className={cl.user_information}>
                <p className={cl.address}>Профиль: {flagName !== 0 ? login : ''} </p>
            </div>

            <div className={cl.btns_header}>
                <button style={login === '' ? { display: "block" } : { display: "none" }} onClick={flagEnter === 0 ? () => setEnter(1) : () => setEnter(0)} disabled={flagRegister === 1 ? true : false} className={cl.enter_btn}>
                    <span className={cl.enter_text}>Войти</span>
                </button>

                <button style={login === '' ? { display: "block" } : { display: "none" }} onClick={flagRegister === 0 ? () => setRegister(1) : () => setRegister(0)} disabled={flagEnter === 1 ? true : false} className={cl.register_btn}>
                    <span className={cl.register_text}>Регистрация</span>
                </button>

                <button onClick={() => {
                    sessionStorage.removeItem("userLogin")
                    sessionStorage.removeItem("userAddress")
                    window.location.reload()
                }} style={login !== '' ? { display: "block" } : { display: "none" }} className={cl.exit_btn}>
                    <span className={cl.exit_text}>Выйти</span>
                </button>
            </div>

            <div style={flagEnter === 0 || (flagEnter === 0 && login === '') ? { display: "none" } : { display: "flex" }} className={cl.enter_modal}>
                <h1 className={cl.enter_text_modal}>Вход:</h1>

                <div className={cl.inputs_modal}>
                    <div className={cl.input_help_modal}>
                        <label className={cl.login_text_modal}>Логин:</label>
                        <input onChange={e => setLogin(e.target.value)} value={login} className={cl.input_login_modal} type="text" placeholder="Введите логин..." />
                    </div>

                    <div className={cl.input_help_modal}>
                        <label className={cl.address_text_modal} htmlFor="">Адрес:</label>
                        <input onChange={e => setAddress(e.target.value)} value={address} className={cl.input_address_modal} type="text" placeholder="Введите адрес..." />
                    </div>

                    <div className={cl.input_help_modal}>
                        <label className={cl.password_text_modal}>Пароль:</label>
                        <input onChange={e => setPassword(e.target.value)} value={password} type={flagPassword === 0 ? "password" : "text"} className={cl.password_input_modal} placeholder="Введите пароль... " />
                        <button onClick={flagPassword === 0 ? () => { setFlag(1) } : () => { setFlag(0) }} className={cl.show_password}>
                            <RemoveRedEyeIcon style={flagPassword === 1 ? { display: "none" } : { display: "block" }} />
                            <VisibilityOffIcon style={flagPassword === 0 ? { display: "none" } : { display: "block" }} />
                        </button>
                    </div>

                    <button onClick={authorization} className={cl.enter_btn_modal}>
                        <span className={cl.enter_text_btn_modal}>Вход</span>
                    </button>
                </div>

                <div className={cl.overlay}></div>
            </div>

            <div style={flagRegister === 0 ? { display: "none" } : { display: "flex" }} className={cl.register_modal}>
                <h1 className={cl.register_text_modal}>Регистрация:</h1>

                <div className={cl.register_inputs}>
                    <div className={cl.register_help_div}>
                        <label htmlFor="">Логин:</label>
                        <input onChange={e => setRegLog(e.target.value)} value={loginReg} type="text" placeholder="Введите логин..." />
                    </div>

                    <div className={cl.register_help_div}>
                        <label htmlFor="">Адрес:</label>
                        <input onChange={e => setAddressReg(e.target.value)} value={addressReg} type="text" placeholder="Введите адрес..." />
                    </div>

                    <div className={cl.register_help_div}>
                        <label htmlFor="">Пароль:</label>
                        <div>
                            <input onChange={e => setRegPas(e.target.value)} value={passwordReg} type={flagPas === 0 ? "password" : "text"} placeholder="Введите пароль..." />
                            <button onClick={flagPas === 0 ? () => { setFlagPas(1) } : () => { setFlagPas(0) }} className={cl.show_password}>
                                <RemoveRedEyeIcon style={flagPas === 1 ? { display: "none" } : { display: "block" }} />
                                <VisibilityOffIcon style={flagPas === 0 ? { display: "none" } : { display: "block" }} />
                            </button>
                        </div>
                    </div>

                    <div className={cl.register_help_div}>
                        <label htmlFor="">Подтвердите пароль:</label>
                        <div>
                            <input onChange={e => setAcptPas(e.target.value)} value={passwordRegAcpt} type={flagConfirmationPas === 0 ? "password" : "text"} placeholder="Введите пароль повторно..." />
                            <button onClick={flagConfirmationPas === 0 ? () => { setConfirmation(1) } : () => { setConfirmation(0) }} className={cl.show_password}>
                                <RemoveRedEyeIcon style={flagConfirmationPas === 1 ? { display: "none" } : { display: "block" }} />
                                <VisibilityOffIcon style={flagConfirmationPas === 0 ? { display: "none" } : { display: "block" }} />
                            </button>
                        </div>
                    </div>
                </div>
                <button className={cl.register_btn_modal}>
                    <span onClick={register} className={cl.register_btn_text}>Регистрация</span>
                </button>
            </div>
        </header>
    )
}

export default Header