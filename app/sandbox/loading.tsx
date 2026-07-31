export default function SandboxLoading() {
  return (
    <main
      className="min-h-screen animate-pulse bg-[#f4f7f5] text-[#17251e]"
      aria-busy="true"
      aria-label="链路实验室加载中"
    >
      <header className="flex min-h-14 items-center gap-3 border-b border-[#d3ddd8] bg-white px-4 py-2 lg:px-5">
        <div className="size-8 bg-[#edf2ef]" />
        <div>
          <div className="h-3.5 w-40 bg-[#dce5e0]" />
          <div className="mt-2 h-2 w-28 bg-[#edf2ef]" />
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 xl:grid-cols-[232px_minmax(620px,1fr)]">
        <aside className="border-b border-[#d4ded9] bg-[#f8faf9] p-4 xl:border-r xl:border-b-0">
          <div className="h-3 w-20 bg-[#dce5e0]" />
          <div className="mt-5 h-10 bg-white ring-1 ring-[#d9e1dd]" />
          <div className="mt-4 grid grid-cols-2 gap-1 bg-white p-1 ring-1 ring-[#d9e1dd]">
            <div className="h-8 bg-[#e8eeeb]" />
            <div className="h-8 bg-[#e8eeeb]" />
          </div>
          <div className="mt-4 h-12 border-y border-[#e0e7e3]" />
          <div className="mt-4 h-11 bg-[#d6dfda]" />
        </aside>

        <section className="min-w-0 bg-white">
          <div className="h-12 border-b border-[#d5dfda] bg-[#fafcfb]" />
          <div className="h-12 border-b border-[#d5dfda]" />
          <div className="h-[480px] bg-[#edf2ef]" />
          <div className="border-t border-[#d5dfda] p-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div className="mb-2 h-10 bg-[#f1f5f3] last:mb-0" key={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
