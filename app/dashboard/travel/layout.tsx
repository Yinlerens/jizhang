export default function TravelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 h-full overflow-hidden">
      {children}
    </div>
  )
}
