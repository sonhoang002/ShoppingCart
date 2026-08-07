import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";
import CheckOutPage from "./checkOutPage";

function CheckoutContext() {
  const [cartItem, setCartItem] = useState([
    { id: 1, title: "Everyday Shirt", price: 20, number: 1 },
  ]);
  const [total, setTotal] = useState(20);

  return <Outlet context={{ cartItem, setCartItem, total, setTotal }} />;
}

describe("checkout page", () => {
  it("shows the checkout fields and success feedback after submission", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <Routes>
          <Route path="/" element={<CheckoutContext />}>
            <Route index element={<div>Home destination</div>} />
            <Route path="checkout" element={<CheckOutPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Checkout" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("Everyday Shirt")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Full name"), "Test Customer");
    await user.click(screen.getByRole("button", { name: "Place order" }));

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Purchase successful!" })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Home destination")).toBeInTheDocument();
  });
});
