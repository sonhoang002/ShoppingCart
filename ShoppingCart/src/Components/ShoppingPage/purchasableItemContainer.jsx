import shop from "./shop.module.css";
import { useState } from "react";

function PurchasableItemContainer({ items, onPurchase }) {
  const [numberOfItem, setNumberOfItem] = useState(0);

  function handleAddItem() {
    setNumberOfItem(numberOfItem + 1);
  }

  function handleRemoveItem() {
    if (numberOfItem === 0) {
      return;
    }

    setNumberOfItem(numberOfItem - 1);
  }

  return (
    <div className={shop.container}>
      <img src={items.image} alt={items.title} className={shop.img} />
      <div className={shop.title}>{items.title}</div>
      <div className={shop.rating}>Rating: {items.rating.rate} ★</div>
      <div className={shop.price}>${items.price.toFixed(2)}</div>
      <div className={shop.btnContainer}>
        <div className={shop.addOrRemoveContainer}>
          <button
            className={`${shop.btnStyle} ${shop.btnStyleAddOrRemove}`}
            onClick={handleRemoveItem}
            disabled={numberOfItem === 0}
          >
            -
          </button>
          <span className={shop.spanNumber}>
            {numberOfItem ? numberOfItem : 0}
          </span>
          <button
            className={`${shop.btnStyle} ${shop.btnStyleAddOrRemove}`}
            onClick={handleAddItem}
          >
            +
          </button>
        </div>
        <button
          className={shop.addToCartButton}
          disabled={numberOfItem === 0}
          onClick={() => (onPurchase(items, numberOfItem), setNumberOfItem(0))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default PurchasableItemContainer;
