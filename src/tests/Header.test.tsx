import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import { Header } from "../components/Header";
import { defaultTheme } from "../styles/themes/default";

vi.mock("../components/DocumentModal", () => ({
  DocumentModal: () => <div data-testid="document-modal">Document Modal</div>,
}));

describe("Header Component", () => {
  it("renders the header with logo and 'New document' button", () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Header />
      </ThemeProvider>
    );

    const logo = screen.getByAltText("");
    expect(logo).toBeInTheDocument();

    const newDocumentButton = screen.getByRole("button", { name: /new document/i });
    expect(newDocumentButton).toBeInTheDocument();
  });

  it("renders correctly and opens dialog on button click", async () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Header />
      </ThemeProvider>
    );

    const newDocumentButton = screen.getByRole("button", { name: /new document/i });
    expect(newDocumentButton).toBeInTheDocument();

    fireEvent.click(newDocumentButton);

    const modal = await screen.findByTestId("document-modal");
    expect(modal).toBeInTheDocument();
  });

});
