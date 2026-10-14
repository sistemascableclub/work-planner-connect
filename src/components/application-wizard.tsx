import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCheck, ChevronDown, FileText, GraduationCap, LockKeyhole, Upload, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { experienceSchema, finalSchema, personalSchema, validateCV } from "@/lib/application-schema";

const steps = [{ title: "Datos personales", icon: UserRound }, { title: "Tu experiencia", icon: GraduationCap }, { title: "CV y expectativas", icon: FileText }];
const initial = { firstName: "", lastName: "", email: "", phone: "", city: "", area: "", education: "", experience: "", role: "", company: "", salary: "", currency: "PEN", consent: false };
type Values = typeof initial;

export function ApplicationWizard() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cv, setCV] = useState<File | null>(null);
  const [complete, setComplete] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  function update(key: keyof Values, value: string | boolean) {
    setValues((old) => ({ ...old, [key]: value }));
    setErrors((old) => { const next = { ...old }; delete next[key]; return next; });
  }
  function changeStep(next: number) { setStep(next); setErrors({}); setTimeout(() => heading.current?.focus({ preventScroll: true }), 0); }
  function submit(event: FormEvent) {
    event.preventDefault();
    const result = [personalSchema, experienceSchema, finalSchema][step].safeParse(values);
    const nextErrors: Record<string, string> = {};
    if (!result.success) result.error.issues.forEach((issue) => { nextErrors[String(issue.path[0])] = issue.message; });
    if (step === 2 && !cv) nextErrors.cv = "Adjunta tu CV para continuar.";
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    if (step < 2) changeStep(step + 1); else setComplete(true);
  }
  function selectFile(file?: File) {
    if (!file) return;
    const error = validateCV(file);
    if (error) setErrors((old) => ({ ...old, cv: error }));
    else { setCV(file); setErrors((old) => { const next = { ...old }; delete next.cv; return next; }); }
  }
  function field(key: keyof Values, label: string, placeholder: string, type = "text", optional = false) {
    return <div className="field"><label htmlFor={key}>{label}{optional && <span className="optional"> (opcional)</span>}</label><Input id={key} type={type} value={String(values[key])} onChange={(e: ChangeEvent<HTMLInputElement>) => update(key, e.target.value)} placeholder={placeholder} maxLength={key === "email" ? 255 : 100} autoComplete={{ firstName: "given-name", lastName: "family-name", email: "email", phone: "tel", city: "address-level2" }[key as string]} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} />{errors[key] && <p className="field-error" id={`${key}-error`}>{errors[key]}</p>}</div>;
  }
  function select(key: keyof Values, label: string, placeholder: string, options: string[]) {
    return <div className="field"><label htmlFor={key}>{label}</label><div className="select-wrap"><select id={key} value={String(values[key])} onChange={(e) => update(key, e.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined}><option value="" disabled>{placeholder}</option>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={16} /></div>{errors[key] && <p className="field-error" id={`${key}-error`}>{errors[key]}</p>}</div>;
  }
  if (complete) return <div className="wizard completed"><div className="completion-icon"><CheckCheck size={30} /></div><span className="eyebrow">UN PASO MÁS CERCA</span><h3>¡Tu perfil está listo!</h3><p>Gracias, {values.firstName}. Estos son los datos de tu postulación.</p><dl className="application-summary"><div><dt>Nombre</dt><dd>{values.firstName} {values.lastName}</dd></div><div><dt>Área de interés</dt><dd>{values.area}</dd></div><div><dt>Correo</dt><dd>{values.email}</dd></div><div><dt>Currículum</dt><dd>{cv?.name}</dd></div><div><dt>Expectativa mensual</dt><dd>{values.currency} {Number(values.salary).toLocaleString("es-PE")}</dd></div></dl><p className="preview-notice">Vista previa: tu información no se ha enviado ni almacenado. El envío de postulaciones aún no está habilitado.</p><Button variant="outline" size="touch" onClick={() => { setComplete(false); changeStep(2); }}><ArrowLeft /> Revisar mis datos</Button></div>;
  return <div className="wizard">
    <div className="stepper" aria-label={`Paso ${step + 1} de 3`}>
      {steps.map(({ title, icon: Icon }, index) => <div className={`step ${index === step ? "active" : index < step ? "done" : ""}`} key={title} aria-current={index === step ? "step" : undefined}><span className="step-number">{index < step ? <Check size={17} /> : <Icon size={17} />}</span><span className="step-label">{title}</span>{index < 2 && <span className="step-connector" />}</div>)}
    </div>
    <div className="wizard-body"><div className="form-heading"><span className="step-caption">PASO {step + 1} DE 3</span><h3 ref={heading} tabIndex={-1}>{["Empecemos por conocerte", "Cuéntanos sobre tu trayectoria", "El último paso hacia algo nuevo"][step]}</h3><p>{["Cada gran oportunidad empieza con una presentación.", "Queremos conocer lo que te hace destacar.", "Comparte tu CV y lo que esperas de tu próximo desafío."][step]}</p></div>
      <form onSubmit={submit} noValidate>
        <div className="form-grid" key={step}>
          {step === 0 && <>{field("firstName", "Nombres", "Tu nombre")}{field("lastName", "Apellidos", "Tus apellidos")}{field("email", "Correo electrónico", "nombre@correo.com", "email")}{field("phone", "Teléfono / WhatsApp", "+51 999 999 999", "tel")}{field("city", "Ciudad de residencia", "Ej. Lima")}{select("area", "Área de interés", "Selecciona un área", ["Ventas", "Marketing", "Ambas"])}</>}
          {step === 1 && <>{select("education", "Nivel de estudios", "Selecciona tu nivel", ["Secundaria", "Técnico", "Universitario", "Posgrado"])}{select("experience", "Experiencia laboral", "Selecciona tu experiencia", ["Sin experiencia", "Menos de 1 año", "1 a 3 años", "3 a 5 años", "Más de 5 años"])}{field("role", "Último cargo", "Ej. Ejecutivo comercial", "text", true)}{field("company", "Última empresa", "Nombre de la empresa", "text", true)}</>}
          {step === 2 && <><div className="field full-width"><label htmlFor="cv">Tu currículum vitae</label><input ref={fileInput} id="cv" className="sr-only" type="file" accept=".pdf,.doc,.docx" onChange={(e) => selectFile(e.target.files?.[0])} /><div className={`upload-zone ${dragging ? "dragging" : ""}`} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); selectFile(e.dataTransfer.files[0]); }}><Upload size={24} />{cv ? <><strong>{cv.name}</strong><span>{(cv.size / 1024).toFixed(0)} KB</span><div className="flex justify-center gap-2"><Button variant="link" type="button" onClick={() => fileInput.current?.click()}>Cambiar archivo</Button><Button variant="ghost" size="icon" type="button" aria-label="Eliminar CV" onClick={() => { setCV(null); if (fileInput.current) fileInput.current.value = ""; }}><X /></Button></div></> : <><Button variant="link" type="button" onClick={() => fileInput.current?.click()}>Seleccionar mi CV</Button><span>o arrástralo aquí · PDF, DOC o DOCX · Máx. 5 MB</span></>}</div>{errors.cv && <p className="field-error">{errors.cv}</p>}</div>{field("salary", "Pretensión salarial mensual", "Ej. 3000", "number")}<div className="field"><label htmlFor="currency">Moneda</label><div className="select-wrap"><select id="currency" value={values.currency} onChange={(e) => update("currency", e.target.value)}><option value="PEN">Soles (PEN)</option><option value="USD">Dólares (USD)</option></select><ChevronDown size={16} /></div></div><div className="full-width"><label className="consent"><input type="checkbox" checked={values.consent} onChange={(e) => update("consent", e.target.checked)} />Autorizo el uso de mis datos para evaluar mi perfil en procesos de selección.</label>{errors.consent && <p className="field-error">{errors.consent}</p>}</div></>}
        </div>
        <div className="form-actions"><span className="required-note">Todos los campos son obligatorios{step === 1 ? ", salvo los opcionales" : ""}.</span><div className="action-buttons">{step > 0 && <Button type="button" variant="outline" size="touch" onClick={() => changeStep(step - 1)}><ArrowLeft /> Atrás</Button>}<Button type="submit" variant="recruitment" size="touch">{step < 2 ? "Siguiente" : "Finalizar perfil"}<ArrowRight /></Button></div></div>
      </form>
    </div>
    <div className="form-security"><LockKeyhole size={13} /><span>Tus datos personales merecen cuidado y confidencialidad.</span></div>
  </div>;
}