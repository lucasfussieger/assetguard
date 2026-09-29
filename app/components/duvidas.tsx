import { Plus } from "lucide-react";

import { faq } from "../lib/content";
import { WHATSAPP_URL } from "../lib/whatsapp";
import Reveal from "./reveal";

export default function Duvidas() {
  return (
    <section
      id="duvidas"
      aria-labelledby="duvidas-title"
      className="relative bg-surface-soft py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <Reveal>
          <h2
            id="duvidas-title"
            className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl"
          >
            Perguntas frequentes
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Não encontrou o que procurava?{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-4 underline decoration-brand-5/40 underline-offset-4 transition-colors hover:text-brand-3"
            >
              Fale com a gente no WhatsApp.
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-line rounded-3xl bg-white px-6 ring-1 ring-line sm:px-8">
            {faq.map((item) => (
              <details key={item.question} className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-left text-lg font-semibold text-ink outline-none focus-visible:text-brand-4">
                  {item.question}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-soft text-brand-4 transition-transform duration-300 group-open:rotate-45">
                    <Plus size={18} strokeWidth={2.25} />
                  </span>
                </summary>
                <p className="mt-3 max-w-xl pr-10 leading-relaxed text-ink-soft">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
