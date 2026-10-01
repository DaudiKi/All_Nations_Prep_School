"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SECTION_LABELS, SECTION_VALUES, enquirySchema } from "@/lib/validation/enquiry";

/**
 * Form state is plain strings plus one boolean — what the DOM actually holds.
 * The Zod schema coerces on submit, so the browser's value types never have to
 * be forced into the parsed shape.
 */
type FormValues = {
  parentName: string; phone: string; email: string;
  childName: string; childAge: string; section: string;
  message: string; consent: boolean;
};

type Errors = Partial<Record<keyof FormValues, string[]>>;

const EMPTY: FormValues = {
  parentName: "", phone: "", email: "", childName: "",
  childAge: "", section: "daycare", message: "", consent: false,
};

/**
 * The admissions enquiry form.
 *
 * Validated with the same Zod schema the API route uses, so the rules cannot
 * drift apart. Every field has a stable id, a real label, and an error that is
 * announced rather than only coloured.
 */
export function EnquiryForm() {
  const uid = useId();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [failure, setFailure] = useState<string>("");

  const field = (name: keyof FormValues) => `${uid}-${name}`;
  const set = <K extends keyof FormValues>(name: K, value: FormValues[K]) =>
    setValues((v) => ({ ...v, [name]: value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFailure("");

    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as Errors);
      return;
    }
    setErrors({});
    setState("sending");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (body.errors) setErrors(body.errors as Errors);
        setFailure(body.error ?? "Something went wrong. Please call the school instead.");
        setState("failed");
        return;
      }
      setState("sent");
      setValues(EMPTY);
    } catch {
      setFailure("We could not reach the school. Please check your connection, or call us.");
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] border border-ink-t85 bg-white p-8"
      >
        <h3 className="type-sub3">Thank you — we have your enquiry</h3>
        <p className="type-body mt-3 text-ink-t20">
          Someone from the school will call you back. We have also sent a
          confirmation to the email address you gave us.
        </p>
        <div className="mt-6">
          <Button onClick={() => setState("idle")} variant="outline">
            Send another enquiry
          </Button>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-[12px] border-2 border-ink-t85 bg-white px-4 py-3 type-body text-ink " +
    "focus:border-sky focus:outline-none";
  const labelCls = "type-small font-bold text-ink";

  // A plain render helper rather than a component defined during render —
  // defining a component type inside the body makes React remount it on every
  // keystroke, which would drop focus out of the field being typed in.
  const fieldError = (name: keyof FormValues) =>
    errors[name]?.length ? (
      <p id={`${field(name)}-error`} className="type-small mt-1 font-semibold text-ink">
        <span className="text-[#B3261E]" aria-hidden="true">&#9888;</span> {errors[name]![0]}
      </p>
    ) : null;

  const aria = (name: keyof FormValues) => ({
    "aria-invalid": errors[name]?.length ? true : undefined,
    "aria-describedby": errors[name]?.length ? `${field(name)}-error` : undefined,
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[var(--radius-card)] border border-ink-t85 bg-white p-6 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor={field("parentName")}>Your name</label>
          <input
            id={field("parentName")} name="parentName" type="text" autoComplete="name"
            className={inputCls} value={values.parentName}
            onChange={(e) => set("parentName", e.target.value)} {...aria("parentName")}
          />
          {fieldError("parentName")}
        </div>

        <div>
          <label className={labelCls} htmlFor={field("phone")}>Phone number</label>
          <input
            id={field("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel"
            placeholder="+256 7.. ... ..."
            className={inputCls} value={values.phone}
            onChange={(e) => set("phone", e.target.value)} {...aria("phone")}
          />
          {fieldError("phone")}
        </div>

        <div className="md:col-span-2">
          <label className={labelCls} htmlFor={field("email")}>Email address</label>
          <input
            id={field("email")} name="email" type="email" autoComplete="email"
            className={inputCls} value={values.email}
            onChange={(e) => set("email", e.target.value)} {...aria("email")}
          />
          {fieldError("email")}
        </div>

        <div>
          <label className={labelCls} htmlFor={field("childName")}>Your child&rsquo;s name</label>
          <input
            id={field("childName")} name="childName" type="text"
            className={inputCls} value={values.childName}
            onChange={(e) => set("childName", e.target.value)} {...aria("childName")}
          />
          {fieldError("childName")}
        </div>

        <div>
          <label className={labelCls} htmlFor={field("childAge")}>
            Age in years
          </label>
          <input
            id={field("childAge")} name="childAge" type="number" min={0} max={14} inputMode="numeric"
            className={inputCls} value={values.childAge}
            onChange={(e) => set("childAge", e.target.value)} {...aria("childAge")}
          />
          {fieldError("childAge")}
        </div>

        <div className="md:col-span-2">
          <label className={labelCls} htmlFor={field("section")}>Which section</label>
          <select
            id={field("section")} name="section" className={inputCls} value={values.section}
            onChange={(e) => set("section", e.target.value)} {...aria("section")}
          >
            {SECTION_VALUES.map((s) => (
              <option key={s} value={s}>{SECTION_LABELS[s]}</option>
            ))}
          </select>
          {fieldError("section")}
        </div>

        <div className="md:col-span-2">
          <label className={labelCls} htmlFor={field("message")}>
            Anything you would like us to know <span className="font-normal text-ink-t20">(optional)</span>
          </label>
          <textarea
            id={field("message")} name="message" rows={4} className={inputCls}
            value={values.message} onChange={(e) => set("message", e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="flex items-start gap-3">
            <input
              id={field("consent")} name="consent" type="checkbox"
              className="mt-1 h-5 w-5 flex-none accent-[#023266]"
              checked={Boolean(values.consent)}
              onChange={(e) => set("consent", e.target.checked)} {...aria("consent")}
            />
            <span className="type-small text-ink">
              I agree that the school may use these details to contact me about a
              place for my child, as described in the{" "}
              <a href="/legal/privacy-policy" className="font-bold text-sky-dark">privacy notice</a>.
            </span>
          </label>
          {fieldError("consent")}
        </div>
      </div>

      {state === "failed" && failure ? (
        <p role="alert" className="type-small mt-5 rounded-[12px] bg-gold-t85 p-4 font-semibold text-ink">
          {failure}
        </p>
      ) : null}

      <div className="mt-7">
        <Button type="submit" variant="primary" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
