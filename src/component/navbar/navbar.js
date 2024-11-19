import { NavLink, Outlet } from "react-router-dom";
import styles from "../../styles/navbar.module.css";
import { useAuthValue } from "../../authContext";
import { useProductContext } from "../../productContext";


export default function Navbar() {

    const { isLoggedIn, SignOut } = useAuthValue();
    const { itemInCart } = useProductContext();

    return (
        <>
            <div className={styles.navbarContainer}>

                <div className={styles.appName}>
                    <NavLink to="/">
                        <i class="fa-solid fa-shop"></i>
                        BuyBusy
                    </NavLink>
                </div>

                <div className={styles.navLinks}>

                    <NavLink to="/">
                        <span>
                            <i class="fa-solid fa-house"></i>
                            Home
                        </span>
                    </NavLink>

                    {isLoggedIn && <NavLink to="/myorder">
                        <span>
                            <i class="fa-solid fa-bag-shopping"></i>
                            My Order
                        </span>
                    </NavLink>}

                    {isLoggedIn && <NavLink to="/cart">
                        <span>
                            <i class="fa-shard fa-solid fa-cart-shopping"></i>
                            Cart 
                        </span>
                    </NavLink>}
                    {isLoggedIn && <h4 className={styles.cartItemIndicator}>{`${itemInCart}`}</h4>}

                    <NavLink to={!isLoggedIn ? "/signin" : "/"}>
                        {!isLoggedIn ? (
                            <span>
                                <i class="fa-solid fa-right-to-bracket"></i>
                                SignIn
                            </span>
                        ) : (
                            <span>
                                <i class="fa-solid fa-right-from-bracket"></i>
                                <span onClick={SignOut}>SignOut</span>
                            </span>
                        )}
                    </NavLink>

                </div>

            </div>
            <Outlet />
        </>
    )
}