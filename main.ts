import * as fs from "node:fs";
import * as path from "node:path";

// One Sentence for a Traveler from 1800.
// A single comparison built only from things a person from 1800 already
// knows — a road, a library, a post office, a market — so the picture lands
// without any word coined after their time. One road, every door, moments.
const ENTRY =
  "It is one road joining every library, post office, and market in the world, so a letter, a book, or a voice can reach any door in moments, day or night.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`Entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (!ENTRY.trim()) {
  throw new Error("Entry must not be whitespace-only");
}
if ((ENTRY.match(/\./g) ?? []).length !== 1 || !ENTRY.endsWith(".")) {
  throw new Error("Entry must be exactly one sentence");
}

// Guard: no word coined after the traveler's time may slip in.
const FORBIDDEN = ["internet", "computer", "screen", "website", "online", "digital", "email", "phone", "video", "software"];
for (const word of FORBIDDEN) {
  if (ENTRY.toLowerCase().includes(word)) {
    throw new Error(`Entry uses a post-1800 word: ${word}`);
  }
}

fs.writeFileSync(path.join(outDir, "entry.txt"), ENTRY, "utf8");
