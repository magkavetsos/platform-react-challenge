import { renderWithProviders } from "../../../test-utils";
import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EmptyState from "../_components/EmptyState";

describe("EmptyState", () => {
  it("renders heading and primary links", () => {
    renderWithProviders(<EmptyState />);

    const heading = screen.getByRole("heading", { name: /no favorites yet/i });
    expect(heading).toBeInTheDocument();

    const browse = screen.getByRole("link", { name: /browse random cats/i });
    expect(browse).toHaveAttribute("href", "/");

    const breeds = screen.getByRole("link", { name: /explore breeds/i });
    expect(breeds).toHaveAttribute("href", "/breeds");
  });
});
