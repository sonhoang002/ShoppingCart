import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import app from "./App.module.css";
import "./App.css";

function App() {
  const [cartItem, setCartItem] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // For Buy and "Add and Remove item" in PurchaseableItemContainer
  function handlePurchaseClick(item, numberOfItem) {
    const existingItem = cartItem.find(
      (itemInside) => itemInside.id === item.id
    );
    if (existingItem) {
      setCartItem((previousItem) => {
        return previousItem.map((itemInCart) => {
          return itemInCart.id === existingItem.id
            ? { ...itemInCart, number: itemInCart.number + numberOfItem }
            : itemInCart;
        });
      });
    } else {
      setCartItem((previousItem) => [
        ...previousItem,
        { ...item, number: numberOfItem },
      ]);
    }

    setTotal(total + numberOfItem * item.price);
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        return res.json();
      })
      .then((products) => {
        setItems(products);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <header className={app.header}>
        <div className={app.headerContent}>
          <Link className={app.brand} to="/">
            The Store
          </Link>

          <nav className={app.top} aria-label="Main navigation">
            <NavLink
              className={({ isActive }) =>
                `${app.navLink} ${isActive ? app.activeLink : ""}`
              }
              to="/"
              end
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `${app.navLink} ${isActive ? app.activeLink : ""}`
              }
              to="/shop"
            >
              Shop
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `${app.navLink} ${isActive ? app.activeLink : ""}`
              }
              to="/cart"
            >
              Cart
              <span className={app.cartCount}>
                {cartItem.reduce((count, item) => count + item.number, 0)}
              </span>
            </NavLink>
          </nav>
        </div>
      </header>

      <Outlet
        context={{
          items,
          loading,
          cartItem,
          setCartItem,
          handlePurchaseClick,
          total,
          setTotal,
        }}
      />
    </>
  );
}

export default App;
