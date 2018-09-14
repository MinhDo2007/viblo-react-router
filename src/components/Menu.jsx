import React from 'react';
import {Route, Link} from 'react-router-dom';

const menus = [
  { name: "Home", to: "/" },
  { name: "Login", to: "/login" }
]
const MenuLink = ({label, to}) =>{
  return (
    <Route
      path={to} exact children={({match})=>{
        let active = match ? 'nav-item active' : 'nav-item';
        return (
          <li className={active}>
            <Link to={to} className="nav-link">{label}</Link>
          </li>
        )
      }}
    />
  )
}

const showMenu = (menus) => {
  let result = null;
  if(menus.length > 0){
    result = menus.map((menu, index) => {
      return <MenuLink key={index} label={menu.name} to={menu.to} />
    })
  }
  return result;
}

const Menu = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="collapse navbar-collapse"  id="navbarNav">
      <ul className="navbar-nav">
        {showMenu(menus)}
      </ul>
    </div>
  </nav>
)

export default Menu;
