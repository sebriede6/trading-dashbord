import { describe, it, expect } from "vitest";
import { createMockLogger, createMockRes } from "./controllerTestUtils.js";

describe("Controller-Test-Hilfen", () => {
  it("stellen ein Response-Mock mit Status, JSON und End zur Verfügung", () => {
    const res = createMockRes();
    res.status(201).json({ ok: true });
    res.setHeader("x-test", "yes");
    res.end("done");

    expect(res.statusCode).toBe(201);
    expect(res.body).toBe("done");
    expect(res.headers["x-test"]).toBe("yes");
  });

  it("produziert Logger-Spies", () => {
    const logger = createMockLogger();
    logger.info("message");
    expect(logger.info).toHaveBeenCalledWith("message");
  });
});
