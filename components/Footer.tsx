import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-6">
      <div className=" flex items-center justify-center text-muted-foreground">
        <Link
          href="https://github.com/mortal22soul/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          Source
        </Link>
      </div>
    </footer>
  );
}
