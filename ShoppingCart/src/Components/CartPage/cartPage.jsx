import { useOutletContext } from "react-router";
import cart from "./cartPage.module.css";

function Cart() {
  const { cartItem, total, setTotal, setCartItem } = useOutletContext();

  const newCart = cartItem.reduce((result, currentItem) => {
    const existingItem = result.find((item) => item.id === currentItem.id);

    if (existingItem) {
      return result.map((item) =>
        item.id === currentItem.id ? { ...item, number: item.number + 1 } : item
      );
    }

    return [...result, { ...currentItem, number: 1 }];
  }, []);

  function handleAddItemInCart(currentItem) {
    setTotal(total + currentItem.price);
  }

  function handleRemoveItemInCart(currentItem) {
    setTotal(total - currentItem.price);
  }

  return (
    <main className={cart.cartPage}>
      <div className={cart.items}>
        {newCart.map((eachItem, index) => (
          <div className={cart.cartItem} key={`${eachItem.id}-${index}`}>
            <img src={eachItem.image} alt={eachItem.title} />
            <div>{eachItem.title}</div>
            <div className={cart.addOrRemoveContainer}>
              <button
                className={cart.btnStyle}
                onClick={() => handleRemoveItemInCart(eachItem)}
              >
                -
              </button>
              <span className={cart.spanNumber}>
                {eachItem.number ? eachItem.number : 0}
              </span>
              <button
                className={cart.btnStyle}
                onClick={() => handleAddItemInCart(eachItem)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={cart.total}>
        Total: ${total ? total.toFixed(2) : "0.00"}
      </div>
    </main>
  );
}

export default Cart;
