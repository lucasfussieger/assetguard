import { Plus } from "lucide-react";

import { faq } from "../lib/content";
import { WHATSAPP_URL } from "../lib/whatsapp";
import Reveal from "./reveal";

export default function Duvidas() {
  return (
    <section
      id="duvidas"
      aria-labelledby="duvidas-title"
      className="flex min-h-svh flex-col justify-center bg-white py-20"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2
            id="duvidas-title"
            className="title-display text-ink"
          >
            Perguntas frequentes
          </h2>
          <p className="mt-3 text-lg font-light text-ink-soft">
            Ficou alguma dúvida?{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-4 underline decoration-brand-5/40 underline-offset-4 transition-colors hover:text-brand-3"
            >
              Chame no WhatsApp.
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="divide-y divide-line rounded-3xl bg-white px-6 ring-1 ring-line sm:px-8">
            {faq.map((item) => (
              <details key={item.question} className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-left text-lg font-medium text-ink outline-none transition-colors hover:text-brand-4 focus-visible:text-brand-4">
                  {item.question}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-soft text-brand-4 transition-transform duration-300 group-open:rotate-45">
                    <Plus size={18} strokeWidth={2.25} />
                  </span>
                </summary>
                <p className="mt-3 pr-10 leading-relaxed text-ink-soft">
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
