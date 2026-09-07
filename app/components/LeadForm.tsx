"use client";

import { useState } from "react";

type FormData = {
  nome: string;
  telefone: string;
  email: string;
  cidade: string;
};

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    telefone: "",
    email: "",
    cidade: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl card-soft p-10 text-center">
        <div className="w-16 h-16 bg-brand-5/10 border-2 border-brand-4 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-8 h-8 text-brand-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-ink mb-3">
          Contato recebido
        </h3>
        <p className="text-ink-soft leading-relaxed">
          Nossa equipe entrará em contato para apresentar a plataforma e
          avaliar as necessidades do seu condomínio.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-white border border-line rounded-xl px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand-4/60 focus:ring-2 focus:ring-brand-5/25 transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl card-soft p-8 space-y-5"
    >
      <div>
        <h3 className="text-2xl font-semibold text-ink">
          Quero conhecer a Viz
        </h3>
        <p className="text-ink-soft text-sm mt-1">
          Preencha os dados abaixo e entraremos em contato.
        </p>
      </div>

      <div>
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-ink mb-2"
        >
          Nome completo *
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          value={formData.nome}
          onChange={handleChange}
          placeholder="Seu nome completo"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="telefone"
          className="block text-sm font-medium text-ink mb-2"
        >
          Telefone (WhatsApp) *
        </label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          required
          value={formData.telefone}
          onChange={handleChange}
          placeholder="(48) 99999-9999"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-ink mb-2"
        >
          E-mail *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="cidade"
          className="block text-sm font-medium text-ink mb-2"
        >
          Cidade do condomínio
        </label>
        <input
          id="cidade"
          name="cidade"
          type="text"
          value={formData.cidade}
          onChange={handleChange}
          placeholder="Ex: Florianópolis, Balneário Camboriú..."
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-brand-1 to-brand-2 text-white py-4 rounded-xl font-semibold text-lg hover:brightness-110 transition-all shadow-lg shadow-brand-1/25"
      >
        Quero conhecer a Viz
      </button>

      <p className="text-ink-faint text-xs text-center">
        Ao enviar, você autoriza o contato da equipe Viz.
      </p>
    </form>
  );
}
