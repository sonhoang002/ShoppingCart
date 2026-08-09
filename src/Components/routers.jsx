import App from "../App";
import ErrorPage from "./errorPage";
import Shop from "./ShoppingPage/shopPage.jsx";
import Cart from "./CartPage/cartPage.jsx";
import Home from "./HomePage/homePage";
import CheckOutPage from "./CheckoutPage/checkOutPage.jsx";

const routers = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <CheckOutPage />,
      },
    ],
  },
];

export default routers;
