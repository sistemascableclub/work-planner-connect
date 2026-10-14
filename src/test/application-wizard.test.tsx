import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ApplicationWizard } from "@/components/application-wizard";

afterEach(cleanup);

describe("Application wizard runtime", () => {
  it("mounts its hooks and preserves personal details when returning from experience", () => {
    render(<ApplicationWizard />);
    fireEvent.change(screen.getByLabelText("Nombres"), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText("Apellidos"), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "ana@example.com" } });
    fireEvent.change(screen.getByLabelText("Teléfono / WhatsApp"), { target: { value: "999123456" } });
    fireEvent.change(screen.getByLabelText("Ciudad de residencia"), { target: { value: "Lima" } });
    fireEvent.change(screen.getByLabelText("Área de interés"), { target: { value: "Marketing" } });
    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    expect(screen.getByLabelText("Nivel de estudios")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Atrás" }));
    expect(screen.getByLabelText("Nombres")).toHaveValue("Ana");
    expect(screen.getByLabelText("Área de interés")).toHaveValue("Marketing");
  });
});