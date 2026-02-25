'use client';

export default function ResultHeader({ totalAverage }: { totalAverage: number | null }) {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-2xl bg-card/80 border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wide">
              Total Average / 20
            </p>
          </div>
          
          <div className="flex items-center justify-center">
            {totalAverage !== null ? (
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {totalAverage.toFixed(2)}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-2">Weighted GPA</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-muted-foreground/50">
                  --
                </div>
                <div className="text-xs md:text-sm text-muted-foreground/60 mt-2">Click Calculate to see result</div>
              </div>
            )}
          </div>

          <div className="hidden md:block w-32"></div>
        </div>
      </div>
    </div>
  );
}
