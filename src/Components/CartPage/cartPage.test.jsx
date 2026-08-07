import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";
import Cart from "./cartPage";

const product = {
  id: 1,
  title: "Everyday Shirt",
  image: "/shirt.png",
  price: 20,
  number: 1,
};

function CartContext({ startsEmpty = false, startingQuantity = 1 }) {
  const startingItems = startsEmpty
    ? []
    : [{ ...product, number: startingQuantity }];
  const [cartItem, setCartItem] = useState(startingItems);
  const [total, setTotal] = useState(
    startsEmpty ? 0 : product.price * startingQuantity
  );

  return <Outlet context={{ cartItem, setCartItem, total, setTotal }} />;
}

function renderCart(startsEmpty = false, startingQuantity = 1) {
  return render(
    <MemoryRouter>
      <Routes>
        <Route
          element={
            <CartContext
              startsEmpty={startsEmpty}
              startingQuantity={startingQuantity}
            />
          }
        >
          <Route index element={<Cart />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe("cart page", () => {
  it("disables checkout when the cart is empty", () => {
    renderCart(true);

    expect(
      screen.getByRole("button", { name: "Proceed to checkout" })
    ).toBeDisabled();
    expect(screen.getByText("Total: $0.00")).toBeInTheDocument();
  });

  it("updates the visible quantity, item price, and total", async () => {
    const user = userEvent.setup();
    renderCart();

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("$40.00")).toBeInTheDocument();
    expect(screen.getByText("Total: $40.00")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
    expect(screen.getByText("Total: $20.00")).toBeInTheDocument();
  });

  it("removes the final copy of an item with the trash button", async () => {
    const user = userEvent.setup();
    renderCart();

    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(screen.queryByText("Everyday Shirt")).not.toBeInTheDocument();
    expect(screen.getByText("Total: $0.00")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Proceed to checkout" })
    ).toBeDisabled();
  });
});
