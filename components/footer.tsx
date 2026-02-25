export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-border bg-background/50 text-muted-foreground py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-sm">
        <span>Made with ❤️ by Ayoub Ben Ismain — Copyright © {year}</span>
      </div>
    </footer>
  );
}
