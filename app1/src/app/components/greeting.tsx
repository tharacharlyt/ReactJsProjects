// No "use client" needed — it's a pure/render-only component
// JSX RULES we'll use: PascalCase name, return a single root element, use className, embed expressions with {}

type GreetingProps = {
    title: string;
    subtitle?: string; // optional prop
  };
  
  export default function Greeting({ title, subtitle }: GreetingProps) {
    return (
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle ? (
          <p className="text-sm text-gray-600">{subtitle}</p>
        ) :<span>
            empty</span>}
      </div>
    );
  }