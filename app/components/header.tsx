import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center">
        <Link href="/" className="inline-flex flex-col items-center gap-0.5">
          <span className="font-wordmark text-2xl text-ink">VIZ</span>
          <span className="font-tagline text-[10px] font-light uppercase tracking-[0.25em] text-brand-4">
            smart living
          </span>
        </Link>
      </div>
    </header>
  );
}
