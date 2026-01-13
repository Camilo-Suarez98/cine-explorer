export const Card = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  );
};
