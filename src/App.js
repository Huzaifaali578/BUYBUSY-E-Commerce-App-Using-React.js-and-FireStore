import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./component/navbar/navbar";
import SignIn from "./component/signIn-signup/SignIn";
import SignUp from "./component/signIn-signup/SignUp";
import { AuthContext } from "./authContext"; // Import AuthContext
import Home from "./component/home/home";
import ProductContext from "./productContext";
import MyOrder from "./component/myOrder/myOrder";
import Cart from "./component/cart/cart";
import Error from "./component/others/error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement:<Error/>,
      children: [
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/", element: <Home /> },
        {path: "/myorder", element: <MyOrder/>},
        {path: "/cart", element: <Cart/>}
      ],
    },
  ]);

  return (
    <AuthContext>
      <ProductContext>
        {/* Wrap the RouterProvider with AuthContext */}
        <RouterProvider router={router} />
      </ProductContext>
    </AuthContext>
  );
}

export default App;
