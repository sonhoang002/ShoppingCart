import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import routers from "./Components/routers";

const product = {
  id: 1,
  title: "Everyday Shirt",
  category: "men's clothing",
  image: "/shirt.png",
  price: 20,
  rating: { rate: 4.2 },
};

describe("site header", () => {
  it("displays the main navigation links and cart count", () => {
    vi.stubGlobal("fetch", vi.fn(() => new Promise(() => {})));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Cart/ })).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("lets a user navigate pages and add a product to the cart", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([product]),
      })
    );
    const router = createMemoryRouter(routers, { initialEntries: ["/shop"] });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText("Everyday Shirt")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(
      screen.getByRole("link", { name: /Cart\s*1/ })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Home" }));
    expect(
      screen.getByRole("heading", { name: "Find something you like." })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Shop" }));
    await waitFor(() =>
      expect(screen.getByText("Everyday Shirt")).toBeInTheDocument()
    );
  });
});
