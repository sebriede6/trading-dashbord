import { describe, it, expect, vi } from "vitest";
import { loadMigrations } from "./testUtils.js";

describe("loadMigrations", () => {
  it("führt nur nicht-leere SQL-Dateien aus", () => {
    const fsStub = {
      readdirSync: vi.fn(() => ["init.sql", "empty.sql"]),
      readFileSync: vi.fn((filePath) =>
        filePath.endsWith("init.sql") ? "SELECT 1;" : "   ",
      ),
    };
    const db = { public: { none: vi.fn() } };

    loadMigrations(db, fsStub);

    expect(fsStub.readdirSync).toHaveBeenCalled();
    expect(fsStub.readFileSync).toHaveBeenCalledTimes(2);
    expect(db.public.none).toHaveBeenCalledTimes(1);
    expect(db.public.none).toHaveBeenCalledWith("SELECT 1;");
  });
});
