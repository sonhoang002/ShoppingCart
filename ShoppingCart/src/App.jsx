import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import app from "./App.module.css";

function App() {
  const [cartItem, setCartItem] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // For Buy and "Add and Remove item" in PurchaseableItemContainer
  function handlePurchaseClick(item, numberOfItem) {
    for (let i = 0; i < numberOfItem; i++) {
      setCartItem((previousItem) => [...previousItem, item]);
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
      <nav className={app.top}>
        <Link className="navButton" to="/">
          Home
        </Link>

        <Link className="navButton" to="/shop">
          Shop
        </Link>

        <Link className="navButton" to="/cart">
          Cart
        </Link>
      </nav>

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
