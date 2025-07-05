// components/site-footer.tsx
export function SiteFooter() {
    return (
      <footer className="w-full border-t bg-muted">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PodClipper. All rights reserved.</p>
          <div className="mt-2 md:mt-0 flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </footer>
    );
  }
  