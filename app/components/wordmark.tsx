const tones = {
  /** Sobre fundo claro (rodapé) */
  dark: { name: "text-ink", tagline: "text-brand-4" },
  /** Toda em preto (header branco) */
  mono: { name: "text-neutral-950", tagline: "text-neutral-950" },
};

/** Marca da Viz: "VIZ" na fonte do logo e "smart living" embaixo. */
export default function Wordmark({
  tone = "dark",
}: {
  tone?: keyof typeof tones;
}) {
  const colors = tones[tone];

  return (
    <span className="inline-flex flex-col items-start leading-none">
      <span className={`font-wordmark text-2xl ${colors.name}`}>VIZ</span>{" "}
      {/* o espaço não aparece no flex, mas faz leitores lerem "VIZ smart living" */}
      <span
        className={`mt-1 font-tagline text-[9px] font-light uppercase tracking-[0.28em] ${colors.tagline}`}
      >
        smart living
      </span>
    </span>
  );
}
