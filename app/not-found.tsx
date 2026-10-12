import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col justify-center px-5 md:px-8">
      <p className="label text-mute">(404)</p>
      <h1 className="display mt-6 text-[clamp(4rem,13vw,12rem)]">
        Page <span className="mark">not found</span>
      </h1>
      <p className="mt-8 flex flex-wrap gap-4">
        <Link href="/" className="border border-volt bg-volt px-6 py-3.5 font-medium text-night transition-colors duration-150 hover:border-bone hover:bg-bone hover:text-ink">
          Back home
        </Link>
        <Link href="/works" className="border border-accent px-6 py-3.5 font-medium transition-colors duration-150 hover:bg-accent hover:text-ink">
          See my works
        </Link>
      </p>
    </main>
  );
}
