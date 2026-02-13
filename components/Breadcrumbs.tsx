import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

interface BreadcrumbItem {
    label: string;
    href?: string;
    active?: boolean;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    // Generate JSON-LD for Breadcrumbs
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: item.href ? `https://raftlabs-assignment-sage.vercel.app${item.href}` : undefined,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <li>
                        <Link
                            href="/"
                            className="flex items-center hover:text-foreground transition-colors"
                        >
                            <Home className="h-4 w-4" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </li>
                    {items.map((item, index) => (
                        <Fragment key={index}>
                            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                            <li>
                                {item.href && !item.active ? (
                                    <Link
                                        href={item.href}
                                        className="hover:text-foreground transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span
                                        className={
                                            item.active ? "text-foreground font-medium" : ""
                                        }
                                        aria-current={item.active ? "page" : undefined}
                                    >
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        </Fragment>
                    ))}
                </ol>
            </nav>
        </>
    );
}
