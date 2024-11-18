import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./component/navbar";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import { AuthContext } from "./authContext"; // Import AuthContext
import Home from "./component/home";
import ProductContext from "./productContext";
import MyOrder from "./component/myOrder";
import Cart from "./component/cart";
import Error from "./component/error";

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
