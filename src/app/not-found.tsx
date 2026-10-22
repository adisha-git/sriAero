import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="blueprint flex min-h-[70vh] items-center text-cloud">
      <div className="container-x py-24 text-center">
        <p className="label-mono text-amber">Error 404 · Off course</p>
        <h1 className="mx-auto mt-5 max-w-2xl text-5xl font-medium sm:text-6xl">This page isn&apos;t on the flight plan.</h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-mist">The link may be outdated, or the page has moved. Let&apos;s get you back on course.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="amber" arrow>
            Return to base
          </Button>
          <Button href="/contact/" variant="ghost-dark">
            Request a Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
