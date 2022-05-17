import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/auth_reducer";

import { Transition } from "react-transition-group";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Modal from "../UI/Modal/Modal";
import Container from "../UI/Container/Container";

import classes from "./Header.module.css";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "All Products",
    path: "/products",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const [showMenu, setshowMenu] = useState(false);
  const [userSetting, setUserSetting] = useState(false);

  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.data.totalQuantity);
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(authActions.onLoggedOut());
  };

  const closeMenu = () => setshowMenu(false);

  const MenuLinks = (props) => (
    <ul className={props.className}>
      {links.map((link) => (
        <li key={link.name}>
          <NavLink
            to={link.path}
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  const AccountMenu = () => (
    <ul className={classes.account_menu}>
      <li onClick={() => setUserSetting(false)}>
        {!token && <Link to="/login">Sign In</Link>}
      </li>
      <li onClick={() => setUserSetting(false)}>
        {!token && <Link to="/register">Register</Link>}
      </li>
      {token && (
        <li onClick={() => setUserSetting(false)}>
          <button onClick={handleLogout}>Log Out</button>
        </li>
      )}
    </ul>
  );

  return (
    <>
      <Transition in={showMenu} timeout={600} mountOnEnter unmountOnExit>
        {(state) => (
          <Modal show={state} content={<MenuLinks />} closed={closeMenu} />
        )}
      </Transition>
      <div className={classes.wrapper}>
        <Container>
          <header className={classes.header}>
            <div className={classes.menuIcon}>
              {!showMenu && <MenuIcon onClick={() => setshowMenu(true)} />}
              {showMenu && <CloseIcon onClick={closeMenu} />}
            </div>
            <div className={classes.logo}>
              <Link to="/" className={classes.logo_link}>
                <h2>Logo </h2>
              </Link>
            </div>
            <MenuLinks className={classes.menu} />
            <div className={classes.user}>
              <div className={classes.account}>
                <AccountCircleIcon
                  onClick={() => setUserSetting(!userSetting)}
                />
                {userSetting && <AccountMenu />}
              </div>
              <Link to="/cart" className={classes.cart}>
                <ShoppingCartOutlinedIcon />
                <span>{totalQuantity}</span>
              </Link>
            </div>
          </header>
        </Container>
      </div>
    </>
  );
};

export default Header;
