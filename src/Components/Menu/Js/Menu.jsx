import cl from "../Style/Menu.module.css"
import { NavLink } from "react-router-dom"

const Menu = () => {

    let menuBtns = [
        {
            id: 0,
            path: "/changeRole",
            name: "Изменение ролей"
        },
        {
            id: 1,
            path: "addAdmin",
            name: "Добавить администратора"
        },
        {
            id: 2,
            path: "magazine",
            name: "Управление магазинами"
        },
        {
            id: 3,
            path: "changeRoleRequest",
            name: "Запрос на изменение роли"
        },
        {
            id: 4,
            path: "comments",
            name: "Оставить комментарий"
        }
    ]

    return (
        <div className={cl.menu}>
            {menuBtns.map(el => (
                <NavLink key={el.id} className={cl.button_menu_navl} to={el.path}>
                    <button className={cl.button_menu}>
                        <label className={cl.button_name} htmlFor="">{el.name}</label>
                    </button>
                </NavLink>
            ))}
        </div>
    )
}

export default Menu