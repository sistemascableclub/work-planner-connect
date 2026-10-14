import { z } from "zod";

const text = (label: string) => z.string().trim().min(1, `Ingresa ${label}.`).max(100, "Máximo 100 caracteres.");
export const personalSchema = z.object({
  firstName: text("tu nombre"),
  lastName: text("tus apellidos"),
  email: z.string().trim().email("Ingresa un correo electrónico válido.").max(255),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{7,20}$/, "Ingresa un teléfono válido."),
  city: text("tu ciudad"),
  area: z.enum(["Ventas", "Marketing", "Ambas"], { errorMap: () => ({ message: "Selecciona tu área de interés." }) }),
});
export const experienceSchema = z.object({
  education: text("tu nivel de estudios"),
  experience: text("tu experiencia laboral"),
  role: z.string().trim().max(100, "Máximo 100 caracteres."),
  company: z.string().trim().max(100, "Máximo 100 caracteres."),
});
export const finalSchema = z.object({
  salary: z.coerce.number({ invalid_type_error: "Ingresa un monto válido." }).positive("Ingresa tu pretensión salarial.").max(1000000, "Revisa el monto ingresado."),
  currency: z.enum(["PEN", "USD"]),
  consent: z.literal(true, { errorMap: () => ({ message: "Necesitamos tu autorización para continuar." }) }),
});
export function validateCV(file: Pick<File, "name" | "size">) {
  if (!/\.(pdf|doc|docx)$/i.test(file.name)) return "Selecciona un archivo PDF, DOC o DOCX.";
  if (file.size > 5 * 1024 * 1024) return "El archivo debe pesar como máximo 5 MB.";
  if (file.size === 0) return "El archivo está vacío.";
  return null;
}