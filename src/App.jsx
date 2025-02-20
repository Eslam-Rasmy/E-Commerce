import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Resigster from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import WishList from "./Components/WishList/WishList";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import AuthContextProvider from "./Components/Context/AuthContext";
import Guard from "./Components/Guard/Guard";
import AuthGuard from "./Components/AuthGuard/AuthGuard";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Components/Context/CartContext";
import { Toaster } from "react-hot-toast";
import NotFound from "./Components/NotFound/NotFound";
import Order from "./Components/Order/Order";
import AllOrders from "./Components/AllOrders/AllOrders";
import SubCat from "./Components/SubCat/SubCat";
import SubBrand from "./Components/SubBrand/SubBrand";
import WithContextProvider from "./Components/Context/WithContext";
import ForgetPass from "./Components/ForgetPass/ForgetPass";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPass from "./Components/ResetPass/ResetPass";
import 'flowbite';
function App() {

  const queryClient = new QueryClient()


  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Guard><Home /> </Guard>},
        { path: "home", element:<Guard><Home /> </Guard>},
        { path: "login", element: <AuthGuard><Login /></AuthGuard> },
        { path: "register", element: <AuthGuard><Resigster /></AuthGuard> },
        { path: "forget", element: <AuthGuard><ForgetPass /></AuthGuard> },
        { path: "code", element: <AuthGuard><VerifyCode /></AuthGuard> },
        { path: "reset", element: <AuthGuard><ResetPass /></AuthGuard> },
        { path: "cart", element: <Guard><Cart /> </Guard> },
        { path: "details/:id", element: <Guard><ProductDetails /> </Guard> },
        { path: "subCat/:id/:name", element: <Guard><SubCat /> </Guard> },
        { path: "subBrands/:id/:name", element: <Guard><SubBrand /> </Guard> },
        { path: "wishList", element: <Guard><WishList /> </Guard> },
        { path: "products", element:  <Guard><Products /> </Guard>},
        { path: "order", element:  <Guard><Order /> </Guard>},
        { path: "allorders", element:  <Guard><AllOrders /> </Guard>},
        { path: "categories", element: <Guard><Categories /> </Guard> },
        { path: "brands", element: <Guard><Brands /> </Guard> },
        { path: "*", element: <NotFound /> },
        
      ],
    },
  ]);
  return (
    <>
          <AuthContextProvider>
            <CartContextProvider>
              <WithContextProvider>
              <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <Toaster position="top-left"/>
          </QueryClientProvider>
          </WithContextProvider>
            </CartContextProvider>
              </AuthContextProvider>
    </>
  );
}

export default App;
