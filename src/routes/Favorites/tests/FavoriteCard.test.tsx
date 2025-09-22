import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import FavoriteCard from "../_components/FavoriteCard";

describe("FavoriteCard", () => {
  it("calls onRemove when trash clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const fav = {
      id: 232546712,
      image_id: "itfFA4NWS",
      image: {
        id: "itfFA4NWS",
        url: "https://cdn2.thecatapi.com/images/itfFA4NWS.jpg",
      },
    };

    render(
      <MemoryRouter>
        <FavoriteCard fav={fav} onRemove={onRemove} />
      </MemoryRouter>
    );

    const btn = screen.getByRole("button", { name: /Remove favorite/i });
    await user.click(btn);
    expect(onRemove).toHaveBeenCalledWith(232546712);
  });
});
