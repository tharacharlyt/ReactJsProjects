type CardProps = {
    children: React.ReactNode;
  };
  
  export default function Card({ children }: CardProps) {
    return (
      <section className="max-w-md w-full mx-auto rounded-xl border p-6 bg-white shadow-sm">
        {children}
      </section>
    );
  }