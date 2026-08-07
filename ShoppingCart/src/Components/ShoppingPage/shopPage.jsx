import { useOutletContext } from "react-router";
import { useEffect, useState } from "react";
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(
    () => !window.matchMedia("(max-width: 900px)").matches
  );

  useEffect(() => {
    const smallScreen = window.matchMedia("(max-width: 1600px)");

    function closeFiltersOnSmallScreen(event) {
      if (event.matches) {
        setFiltersOpen(false);
      }
    }

    smallScreen.addEventListener("change", closeFiltersOnSmallScreen);
    return () =>
      smallScreen.removeEventListener("change", closeFiltersOnSmallScreen);
  }, []);

  const categories = [...new Set(items.map((item) => item.category))];
  const filteredItems =
    selectedCategories.length === 0
      ? items
      : items.filter((item) => selectedCategories.includes(item.category));

  function handleCategoryChange(category) {
    setSelectedCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((item) => item !== category)
        : [...currentCategories, category]
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={shop.shopPage}>
      <button
        className={shop.filterToggle}
        type="button"
        aria-label={filtersOpen ? "Close filters" : "Open filters"}
        aria-expanded={filtersOpen}
        aria-controls="category-filters"
        onClick={() => setFiltersOpen((currentlyOpen) => !currentlyOpen)}
      >
        {filtersOpen ? "× Close" : "☰"}
      </button>

      <div className={shop.shopContent}>
        <aside
          className={`${shop.filters} ${filtersOpen ? shop.filtersOpen : ""}`}
          id="category-filters"
          aria-hidden={!filtersOpen}
        >
          <div className={shop.filterHeading}>
            <h2>Categories</h2>
            {selectedCategories.length > 0 && (
              <button type="button" onClick={() => setSelectedCategories([])}>
                Clear
              </button>
            )}
          </div>

          {categories.map((category) => (
            <label className={shop.filterOption} key={category}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </aside>

        <section className={shop.products}>
          <p className={shop.resultCount}>{filteredItems.length} products</p>
          <div className={shop.shopContainer}>
            {filteredItems.map((itemsComponent) => (
              <PurchasableItemContainer
                key={itemsComponent.id}
                items={itemsComponent}
                onPurchase={handlePurchaseClick}
                handleAddItem={handleAddItem}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Shop;
