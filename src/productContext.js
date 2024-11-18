import { createContext, useContext, useEffect, useState } from "react";
import { useAuthValue } from "./authContext";
import { toast } from "react-toastify";
import data from "./Assets/data";
import 'react-toastify/dist/ReactToastify.css';
import { db } from "./firebaseinit";
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";

const productContext = createContext();

export function useProductContext() {
    const value = useContext(productContext);
    return value;
}

export default function ProductContext({ children }) {
    const [itemInCart, setItemInCart] = useState(0);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [myOrder, setMyOrder] = useState([]);
    const { isLoggedIn, setIsLoggedIn, userLoggedIn, setUserLoggedIn } = useAuthValue();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            const index = window.localStorage.getItem("index");
            const user = JSON.parse(index);
            setIsLoggedIn(true);
            setUserLoggedIn(user);
        }
    }, []);
    
    useEffect(() => {
        if (isLoggedIn) {
            const unsub = onSnapshot(doc(db, "buybusy", userLoggedIn.id), (doc) => {
                const fetchedCart = doc.data().cart || [];
                setCart(fetchedCart);
                setMyOrder(doc.data().orders);
            });
    
            return () => unsub();
        }
    }, [isLoggedIn, userLoggedIn]);
    
    // Separate useEffect to calculate total and item count
    useEffect(() => {
        let sum = 0;
        let totalItems = 0;
    
        cart.forEach((item) => {
            sum += item.price * item.quantity;
            totalItems += item.quantity;
        });
    
        setTotal(sum);
        setItemInCart(totalItems);
    }, [cart]);    

    async function addTocart(product) {
        if (!isLoggedIn) {
            toast.error("Please SignIn First");
            return;
        }

        const index = cart.findIndex((item) => item.id === product.id);
        if (index !== -1) {
            increaseQuantity(cart[index]);
            return;
        }

        const user = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(user, {
            cart: arrayUnion({ quantity: 1, ...product }),
        });
        setTotal(Number(total + product.price));
        setItemInCart(itemInCart + 1);
        // toast.success("Added to cart");
    }

    async function increaseQuantity(product) {
        const index = cart.findIndex((item) => item.id === product.id);
        cart[index].quantity++;
        setCart(cart);
        const user = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(user, { cart });
        setTotal(Number(total + cart[index].price));
        setItemInCart(itemInCart + 1);
    }

    async function decreaseQuantity(product) {
    
            // Find the index of the product in the cart
            const index = cart.findIndex((item) => item.id === product.id);
            if (index === -1) {
                console.error("Product not found in the cart");
                return;
            }
    
            // Clone the cart array to avoid direct mutation
            const updatedCart = [...cart];
    
            if (updatedCart[index].quantity > 1) {
                // Decrease quantity if greater than 1
                updatedCart[index].quantity--;
                setTotal(total - updatedCart[index].price);
            } else {
                // Remove the item if quantity is 0 or less
                updatedCart.splice(index, 1);
            }
    
            // Update the cart state
            setCart(updatedCart);
    
            // Update the database
            const user = doc(db, "buybusy", userLoggedIn.id);
            await updateDoc(user, { cart: updatedCart });
    
            // Update cart item count
            setTotal(total - cart[index].price);
            setItemInCart(itemInCart - 1);
    
            console.log(`Cart updated:`, updatedCart);
    }
    

    async function removeItemFromCart(product) {
        const user = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(user, {
            cart: arrayRemove(product),
        });
        setTotal(Number(total - product.quantity * product.price));
        setItemInCart(itemInCart - product.quantity);
        toast.success("Removed From Cart");
    }

    async function clearCart() {
        if (itemInCart === 0) {
            toast.success("Nothing to remove in the cart");
            return;
        }
        const user = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(user, { cart: [] });
        setTotal(0);
        setItemInCart(0);
        toast.success("Cart emptied");
    }

    async function purchaseAll() {
        const currentDate = getDate();
        const user = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(user, {
            orders: arrayUnion({ date: currentDate, list: cart, amount: total }),
        });
        clearCart();
    }

    function getDate() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1; // Adjust month to 1-based
        let year = date.getFullYear();

        return `${year}-${month}-${day}`;
    }

    return (
        <productContext.Provider
            value={{
                data,
                itemInCart,
                cart,
                setCart,
                total,
                myOrder,
                addTocart,
                increaseQuantity,
                decreaseQuantity,
                removeItemFromCart,
                clearCart,
                purchaseAll,
            }}
        >
            {children}
        </productContext.Provider>
    );
}
