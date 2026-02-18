import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  className?: string;
}

export function PageHero({ title, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-[30vh] md:min-h-[35vh] pt-24 pb-16 flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950",
        className
      )}
    >
      <div className="absolute inset-0 bg-[url('/grain.svg')] opacity-5 pointer-events-none mix-blend-overlay"></div>
      {/* Visual compensation for fixed navbar: the content is centered in the space below the navbar */}
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center justify-center text-center mt-8 md:mt-12">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white mb-6 opacity-0 animate-fade-in-up" 
            style={{ animationFillMode: 'forwards' }}>
          {title}
        </h1>
        <div className="h-1.5 w-32 bg-emerald-400/30 mx-auto rounded-full opacity-0 animate-scale-x"
             style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}></div>
      </div>
    </section>
  );
}
