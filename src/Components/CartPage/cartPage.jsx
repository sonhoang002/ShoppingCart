import { useOutletContext } from "react-router";
import cart from "./cartPage.module.css";
import { useNavigate } from "react-router";
import trashIcon from "../../assets/trash.png";

function Cart() {
  const { cartItem, total, setTotal, setCartItem } = useOutletContext();
  const navigate = useNavigate();

  function handleSetCartItem(currentItem, sign) {
    setCartItem((previousItems) => {
      if (sign === "plus") {
        return previousItems.map((eachItem) =>
          eachItem.id === currentItem.id
            ? { ...eachItem, number: eachItem.number + 1 }
            : eachItem
        );
      }

      if (currentItem.number === 1) {
        return previousItems.filter(
          (eachItem) => eachItem.id !== currentItem.id
        );
      }

      return previousItems.map((eachItem) =>
        eachItem.id === currentItem.id
          ? { ...eachItem, number: eachItem.number - 1 }
          : eachItem
      );
    });
  }

  function handleAddItemInCart(currentItem) {
    setTotal(total + currentItem.price);
    handleSetCartItem(currentItem, "plus");
  }

  function handleRemoveItemInCart(currentItem) {
    setTotal(total - currentItem.price);
    handleSetCartItem(currentItem, "minus");
  }

  return (
    <main className={cart.cartPage}>
      <div className={cart.items}>
        {cartItem.map((eachItem, index) => (
          <div className={cart.cartItem} key={`${eachItem.id}-${index}`}>
            <img
              className={cart.productImage}
              src={eachItem.image}
              alt={eachItem.title}
            />
            <div className={cart.itemTitle}>{eachItem.title}</div>
            <div className={cart.itemControls}>
              <div className={cart.itemPrice}>
                ${(eachItem.price * eachItem.number).toFixed(2)}
              </div>
              <div className={cart.addOrRemoveContainer}>
                {eachItem.number > 1 ? (
                  <button
                    className={`${cart.btnStyle} ${cart.btnStyleCart}`}
                    onClick={() => handleRemoveItemInCart(eachItem)}
                  >
                    -
                  </button>
                ) : (
                  <button
                    className={`${cart.btnStyle} ${cart.btnStyleCart}`}
                    onClick={() => handleRemoveItemInCart(eachItem)}
                  >
                    <img
                      className={cart.trashIcon}
                      src={trashIcon}
                      alt="Remove"
                    />
                  </button>
                )}
                <span className={cart.spanNumber}>
                  {eachItem.number ? eachItem.number : 0}
                </span>
                <button
                  className={`${cart.btnStyle} ${cart.btnStyleCart}`}
                  onClick={() => handleAddItemInCart(eachItem)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={cart.summary}>
        <div className={cart.total}>
          Total: ${total ? Math.abs(total).toFixed(2) : "0.00"}
        </div>
        <button
          className={cart.checkoutButton}
          type="button"
          disabled={cartItem.length === 0}
          onClick={() => navigate("/checkout")}
        >
          Proceed to checkout
        </button>
      </div>
    </main>
  );
}

export default Cart;
