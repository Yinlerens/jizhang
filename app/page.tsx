export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-50">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col justify-center">
        <p className="text-sm font-medium uppercase text-emerald-300">
          Main branch
        </p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">
          Observability shell
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
          This branch keeps the deployment and monitoring surface only: Sentry, PostHog,
          Vercel Analytics, and Vercel Speed Insights.
        </p>
      </section>
    </main>
  );
}
