"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ArrowRight, Check, X } from "lucide-react";

import { whatsappLink } from "../lib/whatsapp";

type Tipo = "" | "condominio" | "construtora";

type QuoteContextValue = { open: (tipo?: Tipo) => void };

const QuoteContext = createContext<QuoteContextValue | null>(null);

function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("QuoteButton precisa estar dentro de QuoteProvider");
  }
  return context;
}

type FormState = {
  nome: string;
  telefone: string;
  tipo: Tipo;
  software: "" | "sim" | "nao";
};

const emptyForm: FormState = {
  nome: "",
  telefone: "",
  tipo: "",
  software: "",
};

const tipoLabel = { condominio: "Condomínio", construtora: "Construtora" };

/** (47) 99999-9999 enquanto a pessoa digita. */
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function buildMessage(form: FormState) {
  return [
    "Olá! Quero um orçamento da Viz.",
    "",
    `Nome: ${form.nome.trim()}`,
    `Telefone: ${form.telefone}`,
    `Perfil: ${form.tipo ? tipoLabel[form.tipo] : "-"}`,
    `Já usa software de gestão: ${form.software === "sim" ? "Sim" : "Não"}`,
  ].join("\n");
}

export function QuoteButton({
  children,
  className,
  tipo,
}: {
  children: React.ReactNode;
  className?: string;
  tipo?: Tipo;
}) {
  const { open } = useQuote();

  return (
    <button
      type="button"
      onClick={() => open(tipo)}
      className={className}
      aria-haspopup="dialog"
    >
      {children}
    </button>
  );
}

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sentLink, setSentLink] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const open = useCallback((tipo: Tipo = "") => {
    setForm({ ...emptyForm, tipo });
    setSentLink(null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const isComplete =
    form.nome.trim() !== "" &&
    form.telefone.replace(/\D/g, "").length >= 10 &&
    form.tipo !== "" &&
    form.software !== "";

  const firstName = form.nome.trim().split(/\s+/)[0];

  return (
    <QuoteContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-deep/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[1.75rem] bg-white p-7 shadow-2xl sm:max-w-md sm:rounded-[1.75rem] sm:p-9"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-ink-faint transition-colors hover:bg-surface-soft hover:text-ink"
            >
              <X size={20} strokeWidth={2} />
            </button>

            {sentLink ? (
              <div className="py-4 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-gradient-to-br from-brand-4 to-brand-5 text-white">
                  <Check size={28} strokeWidth={2.5} />
                </span>
                <h2
                  id="quote-title"
                  className="mt-6 text-2xl font-semibold text-ink"
                >
                  Pronto, {firstName}!
                </h2>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  Abrimos o WhatsApp com os seus dados. Envie a mensagem e a
                  nossa equipe responde com a proposta.
                </p>
                <a
                  href={sentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-8 w-full px-7 py-3.5 text-base"
                >
                  Abrir o WhatsApp de novo
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="mt-3 w-full rounded-full py-3 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!isComplete) return;
                  const link = whatsappLink(buildMessage(form));
                  window.open(link, "_blank", "noopener,noreferrer");
                  setSentLink(link);
                }}
                className="space-y-5"
              >
                <div className="pr-8">
                  <h2
                    id="quote-title"
                    className="text-2xl font-semibold tracking-tight text-ink"
                  >
                    Peça seu orçamento
                  </h2>
                  <p className="mt-1.5 text-sm text-ink-soft">
                    Quatro perguntas rápidas. Você recebe a proposta pelo
                    WhatsApp.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="quote-nome"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    Nome
                  </label>
                  <input
                    id="quote-nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    required
                    autoFocus
                    value={form.nome}
                    onChange={(event) =>
                      setForm({ ...form, nome: event.target.value })
                    }
                    placeholder="Seu nome"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-telefone"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    WhatsApp
                  </label>
                  <input
                    id="quote-telefone"
                    name="telefone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    required
                    value={form.telefone}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        telefone: formatPhone(event.target.value),
                      })
                    }
                    placeholder="(47) 99999-9999"
                    className={inputClass}
                  />
                </div>

                <ChoiceGroup
                  label="Você fala por"
                  name="tipo"
                  value={form.tipo}
                  onChange={(value) =>
                    setForm({ ...form, tipo: value as Tipo })
                  }
                  options={[
                    { value: "condominio", label: "Condomínio" },
                    { value: "construtora", label: "Construtora" },
                  ]}
                />

                <ChoiceGroup
                  label="O prédio já usa algum software de gestão?"
                  name="software"
                  value={form.software}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      software: value as FormState["software"],
                    })
                  }
                  options={[
                    { value: "sim", label: "Sim" },
                    { value: "nao", label: "Não" },
                  ]}
                />

                <button
                  type="submit"
                  disabled={!isComplete}
                  className="btn-primary group w-full px-7 py-4 text-base disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:transform-none disabled:hover:brightness-100"
                >
                  Enviar pelo WhatsApp
                  <ArrowRight
                    size={18}
                    strokeWidth={2.25}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </QuoteContext.Provider>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-ink placeholder:text-ink-faint transition-colors focus:border-brand-4/60 focus:outline-none focus:ring-4 focus:ring-brand-5/15";

function ChoiceGroup({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-ink">{label}</legend>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <label
              key={option.value}
              className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-5/20 ${
                selected
                  ? "border-brand-4 bg-brand-5/10 font-semibold text-brand-4"
                  : "border-line text-ink-soft hover:border-brand-5/50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
