import Reveal from "./reveal";

/*
 * Cabeçalho das seções brancas: título grande com a segunda linha em cinza e
 * um subtítulo leve. Centralizado nas primeiras seções; à esquerda nas de
 * baixo, que têm layout editorial.
 */
export default function SectionHeading({
  id,
  title,
  muted,
  subtitle,
  align = "center",
}: {
  /** id do h2, para o aria-labelledby da seção */
  id: string;
  title: string;
  /** Segunda linha do título, em cinza */
  muted?: string;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
}) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "mx-auto max-w-5xl text-center" : undefined}>
      <h2 id={id} className="title-display text-neutral-950">
        {title}
        {muted && (
          <>
            {" "}
            <span className="block text-neutral-400">{muted}</span>
          </>
        )}
      </h2>

      {subtitle && (
        <p
          className={`mt-3 max-w-xl text-lg font-light text-neutral-500 ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
