import { describe, expect, it } from "vitest";
import { personalSchema, experienceSchema, finalSchema, validateCV } from "@/lib/application-schema";

describe("Three-stage application validation", () => {
  it("requires basic personal details in stage one", () => {
    const valid = { firstName: "Ana", lastName: "Pérez", email: "ana@example.com", phone: "+51 999 999 999", city: "Lima", area: "Marketing" };
    expect(personalSchema.safeParse(valid).success).toBe(true);
    expect(personalSchema.safeParse({ ...valid, email: "incorrecto" }).success).toBe(false);
    expect(personalSchema.safeParse({ ...valid, firstName: "" }).success).toBe(false);
  });
  it("requires education and experience in stage two", () => {
    expect(experienceSchema.safeParse({ education: "Universitario", experience: "1 a 3 años", role: "", company: "" }).success).toBe(true);
    expect(experienceSchema.safeParse({ education: "", experience: "", role: "", company: "" }).success).toBe(false);
  });
  it("requires a positive salary and consent in stage three", () => {
    expect(finalSchema.safeParse({ salary: "3000", currency: "PEN", consent: true }).success).toBe(true);
    expect(finalSchema.safeParse({ salary: "0", currency: "PEN", consent: true }).success).toBe(false);
    expect(finalSchema.safeParse({ salary: "3000", currency: "PEN", consent: false }).success).toBe(false);
  });
  it("checks selected CV format and size", () => {
    expect(validateCV({ name: "cv.pdf", size: 1024 })).toBe(null);
    expect(validateCV({ name: "cv.exe", size: 1024 })).not.toBe(null);
    expect(validateCV({ name: "cv.pdf", size: 6 * 1024 * 1024 })).not.toBe(null);
  });
});