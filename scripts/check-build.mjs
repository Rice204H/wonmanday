import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { greeting, getRecipient } from "../src/config/greeting.js";

const html = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
const base = "/wonmanday/";
const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(
  (match) => match[1],
);
assert.ok(
  assets.length >= 3,
  "Built HTML must contain bundled script, stylesheet and favicon",
);
for (const path of assets) {
  assert.ok(
    path.startsWith(base),
    `Asset does not use GitHub Pages base: ${path}`,
  );
  assert.ok(
    (
      await stat(new URL(`../dist/${path.slice(base.length)}`, import.meta.url))
    ).isFile(),
    `Missing asset: ${path}`,
  );
}
for (const path of [
  greeting.heroImage,
  greeting.backgroundImage,
  greeting.audio,
  "favicon.svg",
]) {
  assert.ok(
    !path.startsWith("/"),
    "Configuration paths must be relative to public/",
  );
  assert.ok(
    (await stat(new URL(`../dist/${path}`, import.meta.url))).isFile(),
    `Missing public resource: ${path}`,
  );
}
assert.equal(getRecipient(""), greeting.recipient);
assert.equal(getRecipient("?to=%20%20"), greeting.recipient);
assert.equal(getRecipient("?to=Lan"), "Lan");
assert.equal(getRecipient("?to=Ng%E1%BB%8Dc%20Lan"), "Ngọc Lan");
assert.equal(getRecipient("?to=%00Lan%0A"), "Lan");
assert.equal(Array.from(getRecipient(`?to=${"a".repeat(200)}`)).length, 60);
assert.equal(getRecipient("?to=%3Cscript%3E"), "<script>"); // React renders this as text, never HTML.
assert.ok(
  !html.includes("fonts.googleapis.com"),
  "Fonts should be self-hosted",
);
console.log(
  "Passed: GitHub Pages base, built assets, local media and recipient parsing.",
);
