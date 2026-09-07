"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { X } from "lucide-react";

type QuoteContextValue = { open: () => void };

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
  tipo: "" | "condominio" | "construtora";
  software: "" | "sim" | "nao";
};

const emptyForm: FormState = {
  nome: "",
  telefone: "",
  tipo: "",
  software: "",
};

export function QuoteButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useQuote();

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const open = useCallback(() => {
    setForm(emptyForm);
    setSubmitted(false);
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
    form.telefone.trim() !== "" &&
    form.tipo !== "" &&
    form.software !== "";

  return (
    <QuoteContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg bg-white p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="absolute top-4 right-4 text-ink-faint hover:text-ink transition-colors"
            >
              <X size={20} strokeWidth={2} />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <h2
                  id="quote-title"
                  className="text-2xl font-semibold text-ink"
                >
                  Obrigado pelo contato
                </h2>
                <p className="mt-3 text-ink-soft leading-relaxed">
                  Recebemos seus dados e nossa equipe entra em contato para
                  apresentar a proposta para o seu empreendimento.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-1 to-brand-2 px-7 py-3 text-base font-semibold text-white hover:brightness-110 transition-all"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div>
                  <h2
                    id="quote-title"
                    className="text-2xl font-semibold text-ink"
                  >
                    Solicite seu orçamento
                  </h2>
                  <p className="mt-1 text-sm text-ink-soft">
                    Preencha os dados abaixo e entraremos em contato.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="quote-nome"
                    className="block text-sm font-medium text-ink mb-2"
                  >
                    Nome
                  </label>
                  <input
                    id="quote-nome"
                    name="nome"
                    type="text"
                    required
                    autoFocus
                    value={form.nome}
                    onChange={(event) =>
                      setForm({ ...form, nome: event.target.value })
                    }
                    placeholder="Seu nome completo"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-telefone"
                    className="block text-sm font-medium text-ink mb-2"
                  >
                    Telefone
                  </label>
                  <input
                    id="quote-telefone"
                    name="telefone"
                    type="tel"
                    required
                    value={form.telefone}
                    onChange={(event) =>
                      setForm({ ...form, telefone: event.target.value })
                    }
                    placeholder="(47) 99999-9999"
                    className={inputClass}
                  />
                </div>

                <ChoiceGroup
                  label="Tipo da solução"
                  name="tipo"
                  value={form.tipo}
                  onChange={(value) =>
                    setForm({ ...form, tipo: value as FormState["tipo"] })
                  }
                  options={[
                    { value: "condominio", label: "Condomínio" },
                    { value: "construtora", label: "Construtora" },
                  ]}
                />

                <ChoiceGroup
                  label="Já usa algum software de gestão do empreendimento?"
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
                  className="w-full rounded-full bg-gradient-to-r from-brand-1 to-brand-2 py-3.5 text-base font-semibold text-white hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
                >
                  Enviar
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
  "w-full bg-white border border-line rounded-lg px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand-4/60 focus:ring-2 focus:ring-brand-5/25 transition-colors";

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
      <legend className="text-sm font-medium text-ink mb-2">{label}</legend>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <label
              key={option.value}
              className={`cursor-pointer rounded-lg border px-4 py-2.5 text-sm text-center transition-colors ${
                selected
                  ? "border-brand-4 bg-brand-5/10 text-brand-4 font-medium"
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
