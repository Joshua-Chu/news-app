import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("home page test run", () => {
    it("should render", () => {
        render(<Home />);
        const text = screen.getByText("hello");
        expect(text).toBeInTheDocument();
    });
});

export {};
