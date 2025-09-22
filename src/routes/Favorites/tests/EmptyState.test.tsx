import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmptyState from "../_components/EmptyState";

describe("EmptyState", () => {
  it("renders heading and primary CTAs", () => {
    render(
      <MemoryRouter>
        <EmptyState />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /No favorites yet/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Browse random cats/i })
    ).toHaveAttribute("href", "/");

    expect(
      screen.getByRole("link", { name: /Explore breeds/i })
    ).toHaveAttribute("href", "/breeds");
  });
});
