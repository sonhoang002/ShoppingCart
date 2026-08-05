import { useOutletContext } from "react-router";
import PurchasableItemContainer from "./purchasableItemContainer";
import shop from "./shop.module.css";

function Shop() {
  const {
    items,
    loading,
    handlePurchaseClick,
    handleAddItem,
    handleRemoveItem,
  } = useOutletContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={shop.shopContainer}>
      {items.map((itemsComponent) => (
        <PurchasableItemContainer
          className="purchasableItemContainer"
          key={itemsComponent.id}
          items={itemsComponent}
          onPurchase={handlePurchaseClick}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
        ></PurchasableItemContainer>
      ))}
    </div>
  );
}

export default Shop;
