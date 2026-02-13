import { describe, it, expect } from "vitest";
import robots from "@/app/robots";

describe("Robots.txt Configuration", () => {
    it("returns a valid robots configuration", () => {
        const config = robots();
        expect(config).toBeDefined();
        expect(config.rules).toBeDefined();
    });

    it("allows all user agents", () => {
        const config = robots();
        const rules = config.rules as { userAgent: string };
        expect(rules.userAgent).toBe("*");
    });

    it("allows the root path", () => {
        const config = robots();
        const rules = config.rules as { allow: string };
        expect(rules.allow).toBe("/");
    });

    it("disallows the /api/ path", () => {
        const config = robots();
        const rules = config.rules as { disallow: string[] };
        expect(rules.disallow).toContain("/api/");
    });

    it("includes the sitemap URL", () => {
        const config = robots();
        expect(config.sitemap).toBeDefined();
        expect(config.sitemap).toContain("sitemap.xml");
        expect(config.sitemap).toContain("raftlabs-assignment-sage.vercel.app");
    });
});
