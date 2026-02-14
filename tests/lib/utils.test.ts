import { describe, it, expect } from "vitest";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";

describe("formatCurrency", () => {
  it("formats standard amounts correctly", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("formats large amounts with commas", () => {
    expect(formatCurrency(1000000)).toBe("$1,000,000.00");
  });

  it("rounds to two decimal places", () => {
    expect(formatCurrency(9.999)).toBe("$10.00");
  });

  it("formats small amounts", () => {
    expect(formatCurrency(0.01)).toBe("$0.01");
  });

  it("formats negative amounts", () => {
    expect(formatCurrency(-50)).toBe("-$50.00");
  });
});

describe("formatCompactNumber", () => {
  it("formats thousands as K", () => {
    expect(formatCompactNumber(1500)).toBe("1.5K");
  });

  it("formats millions as M", () => {
    expect(formatCompactNumber(2500000)).toBe("2.5M");
  });

  it("formats billions as B", () => {
    expect(formatCompactNumber(1200000000)).toBe("1.2B");
  });

  it("formats trillions as T", () => {
    expect(formatCompactNumber(3000000000000)).toBe("3T");
  });

  it("formats small numbers without compact notation", () => {
    expect(formatCompactNumber(42)).toBe("42");
  });

  it("formats zero", () => {
    expect(formatCompactNumber(0)).toBe("0");
  });
});
