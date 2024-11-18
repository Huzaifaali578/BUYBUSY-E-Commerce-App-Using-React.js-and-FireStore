import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebaseinit";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const authContext = createContext();

export function useAuthValue() {
    const value = useContext(authContext);
    if (!value) {
        throw new Error("useAuthValue must be used within AuthProvider");
    }
    return value;
}

export function AuthContext({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(null);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "buybusy"),
            (snapshot) => {
                const users = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUserList(users);
            }
        );
        return () => unsubscribe(); // Cleanup
    }, [isLoggedIn]);

    async function createUser(data) {
        const index = userList.findIndex((user) => user.email === data.email);
        if (index !== -1) {
            toast.error("Email address already exists, please SignIn");
            return;
        }
        await addDoc(collection(db, "buybusy"), {
            name: data.name,
            email: data.email,
            password: data.password,
            cart: [],
            orders: [],
        });
        toast.success("New user created, please Login to continue");
    }

    async function SignIn(data) {
        const index = userList.findIndex((user) => user.email === data.email);
        if (index === -1) {
            toast.error("Email address not exist, please SignUp");
            return false;
        }
        if (userList[index].password === data.password) {
            toast.success("SignIn Successful");
            setIsLoggedIn(true);
            setUserLoggedIn(userList[index]);
            window.localStorage.setItem("token", true);
            window.localStorage.setItem("index", JSON.stringify(userList[index]));
            return true;
        } else {
            toast.error("Wrong password, try again");
            return false;
        }
    }

    async function SignOut() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("index");
        setIsLoggedIn(false);
        setUserLoggedIn(null);
        toast.success("Sign Out Successful");
    }

    return (
        <authContext.Provider value={{ createUser, SignIn, SignOut, isLoggedIn, userLoggedIn, setIsLoggedIn , setUserLoggedIn}}>
            <ToastContainer/>
            {children}
        </authContext.Provider>
    );
}
