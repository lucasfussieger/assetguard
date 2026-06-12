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
      <div className="bg-surface rounded-3xl p-10 border border-gold/30 text-center">
        <div className="w-16 h-16 bg-gold/10 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-8 h-8 text-gold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">
          Recebemos seu contato!
        </h3>
        <p className="text-muted leading-relaxed">
          Nossa equipe entrará em contato em breve para apresentar a solução
          completa para o seu imóvel.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface rounded-3xl p-8 border border-gold/20 space-y-5"
    >
      <div>
        <h3 className="text-2xl font-bold text-foreground">
          Quero proteger meu imóvel
        </h3>
        <p className="text-muted text-sm mt-1">
          Preencha o formulário e entraremos em contato.
        </p>
      </div>

      <div>
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-foreground mb-2"
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
          className="block text-sm font-medium text-foreground mb-2"
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
          className="block text-sm font-medium text-foreground mb-2"
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
          className="block text-sm font-medium text-foreground mb-2"
        >
          Cidade do imóvel
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
        className="w-full bg-gold text-background py-4 rounded-xl font-bold text-lg hover:bg-gold-light transition-all hover:scale-[1.02] shadow-lg shadow-gold/20"
      >
        Quero proteger meu imóvel
      </button>

      <p className="text-muted text-xs text-center">
        Ao enviar, você concorda em ser contactado pela equipe AssetGuard.
      </p>
    </form>
  );
}
