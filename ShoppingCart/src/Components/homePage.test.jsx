import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import Home from "./homePage";

describe("home page", () => {
  it("shows the welcome content and a way to enter the shop", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Find something you like." })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop now" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Clothing, jewelry, and headphones arranged for shopping",
      })
    ).toBeInTheDocument();
  });
});
