/** Marca da Viz, sempre sobre fundo claro (header de vidro e rodapé). */
export default function Wordmark() {
  return (
    <span className="inline-flex flex-col items-start leading-none">
      <span className="font-wordmark text-2xl text-ink">VIZ</span>{" "}
      {/* o espaço não aparece no flex, mas faz leitores lerem "VIZ smart living" */}
      <span className="mt-1 font-tagline text-[9px] font-light uppercase tracking-[0.28em] text-brand-4">
        smart living
      </span>
    </span>
  );
}
