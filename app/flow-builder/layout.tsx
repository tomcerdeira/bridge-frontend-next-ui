export default function BuildFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-full h-full overflow-y-hidden flex ">
      <div className="inline-block max-w-lg text-center justify-center ">
        {children}
      </div>
    </section>
  );
}
