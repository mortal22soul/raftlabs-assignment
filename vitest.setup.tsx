import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

// Mock next/image
vi.mock("next/image", () => ({
    __esModule: true,
    default: function MockImage(props: Record<string, unknown>) {
        const { fill, priority, ...rest } = props;
        void fill;
        void priority;
        return React.createElement("img", rest);
    },
}));

// Mock next/link
vi.mock("next/link", () => ({
    __esModule: true,
    default: function MockLink({
        children,
        href,
        ...rest
    }: {
        children: React.ReactNode;
        href: string;
        [key: string]: unknown;
    }) {
        return React.createElement("a", { href, ...rest }, children);
    },
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        refresh: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        prefetch: vi.fn(),
    }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
    notFound: vi.fn(),
}));

// Mock next/dynamic
vi.mock("next/dynamic", () => ({
    __esModule: true,
    default: () => {
        function DynamicComponent(props: Record<string, unknown>) {
            return React.createElement("div", {
                "data-testid": "dynamic-component",
                ...props,
            });
        }
        DynamicComponent.displayName = "DynamicComponent";
        return DynamicComponent;
    },
}));
