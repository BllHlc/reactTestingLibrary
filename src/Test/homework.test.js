import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import React from "react";
import ReactDOM from "react-dom";

describe('App Test', () => {

  beforeEach(() => {
    render(<App />);
  });

  test("Header must be correct", () => {
    const header = screen.getByText("Emoji Search");
    const img1 = screen.getByAltText("cat1");
    const img2 = screen.getByAltText("cat2");

    expect(header).toBeInTheDocument();
    expect(img1).toBeInTheDocument();
    expect(img2).toBeInTheDocument();
    expect(header).toHaveClass("component-header");
    expect(img1).toHaveAttribute("src", "//cdn.jsdelivr.net/emojione/assets/png/1f638.png");
    expect(img1).toHaveAttribute("width", "32");
    expect(img1).toHaveAttribute("height", "32");
    expect(img2).toHaveAttribute("src", "//cdn.jsdelivr.net/emojione/assets/png/1f63a.png");
    expect(img2).toHaveAttribute("width", "32");
    expect(img2).toHaveAttribute("height", "32");
  });

  test("Emoji list must be rendered successfully", () => {
    const items = screen.getAllByText("Click to copy emoji");
    expect(items.length).toEqual(20);
  });

  test("Search works correctly", () => {
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Smiley" } });
    expect(screen.getByText("Smiley")).toBeInTheDocument();
  });

  test("Copy to clipboard works correctly", () => {
    const button = screen.getAllByText("Click to copy emoji").at(0);
    expect(button.parentElement.getAttribute("data-clipboard-text").length)
      .toBeGreaterThan(0);
  });
});