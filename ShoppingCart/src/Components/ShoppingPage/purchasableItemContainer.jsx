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
      <div>{items.title}</div>
      <div>{items.rating.rate}</div>
      <div>${items.price}</div>
      <div className={shop.btnContainer}>
        <div className={shop.addOrRemoveContainer}>
          <button className={shop.btnStyle} onClick={handleRemoveItem}>
            -
          </button>
          <span className={shop.spanNumber}>
            {numberOfItem ? numberOfItem : 0}
          </span>
          <button className={shop.btnStyle} onClick={handleAddItem}>
            +
          </button>
        </div>
        <button
          onClick={() => (onPurchase(items, numberOfItem), setNumberOfItem(0))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default PurchasableItemContainer;
