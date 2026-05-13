export default function PaddedLayout({ children }: { children: React.ReactNode }) {
  return <div className="px-4 sm:px-6 lg:px-8 py-8">{children}</div>;
}
