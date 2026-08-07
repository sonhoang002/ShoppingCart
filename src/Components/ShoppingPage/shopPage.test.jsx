import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import { describe, expect, it, vi } from "vitest";
import Shop from "./shopPage";

const products = [
  {
    id: 1,
    title: "Everyday Shirt",
    category: "men's clothing",
    image: "/shirt.png",
    price: 20,
    rating: { rate: 4.2 },
  },
  {
    id: 2,
    title: "Wireless Headphones",
    category: "electronics",
    image: "/headphones.png",
    price: 50,
    rating: { rate: 4.7 },
  },
];

function ShopContext() {
  return (
    <Outlet
      context={{
        items: products,
        loading: false,
        handlePurchaseClick: vi.fn(),
      }}
    />
  );
}

function renderShop() {
  return render(
    <MemoryRouter>
      <Routes>
        <Route element={<ShopContext />}>
          <Route index element={<Shop />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe("shop page", () => {
  it("shows products and filters them with category checkboxes", async () => {
    const user = userEvent.setup();
    renderShop();

    expect(screen.getByText("Everyday Shirt")).toBeInTheDocument();
    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: "electronics" }));

    expect(screen.queryByText("Everyday Shirt")).not.toBeInTheDocument();
    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
    expect(screen.getByText("1 products")).toBeInTheDocument();
  });

  it("enables Add to Cart after choosing a quantity", async () => {
    const user = userEvent.setup();
    renderShop();

    const addToCartButtons = screen.getAllByRole("button", {
      name: "Add to Cart",
    });
    expect(addToCartButtons[0]).toBeDisabled();

    await user.click(screen.getAllByRole("button", { name: "+" })[0]);

    expect(addToCartButtons[0]).toBeEnabled();
  });

  it("opens and closes the category sidebar", async () => {
    const user = userEvent.setup();
    renderShop();

    const closeButton = screen.getByRole("button", { name: "Close filters" });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");

    await user.click(closeButton);
    const openButton = screen.getByRole("button", { name: "Open filters" });
    expect(openButton).toHaveAttribute("aria-expanded", "false");

    await user.click(openButton);
    expect(
      screen.getByRole("button", { name: "Close filters" })
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("clears selected category filters", async () => {
    const user = userEvent.setup();
    renderShop();

    await user.click(screen.getByRole("checkbox", { name: "electronics" }));
    expect(screen.queryByText("Everyday Shirt")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(screen.getByText("Everyday Shirt")).toBeInTheDocument();
    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "electronics" })
    ).not.toBeChecked();
  });
});
