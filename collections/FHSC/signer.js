const crypto = require("crypto");

const hex = (bytes) =>
  Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

const sign = {
  bodyHash: async (body) => {
    if (!body) return "";
    const data =
      typeof body === "string" ? body : JSON.stringify(body);
    const hash = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(data)
    );
    return hex(hash);
  },

  signature: async (method, path, query, bodyHash, secret) => {
    const ts = Date.now();
    let signPath = path;
    if (query) signPath += "?" + query;

    const lines = bodyHash? `${ts}\n${method}\n${signPath}\n${bodyHash}`
      : `${ts}\n${method}\n${signPath}\n`;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(lines)
    );
    return { ts, sig: hex(sig) };
  },

  nonce: () => {
    const buf = new Uint8Array(16);
    crypto.getRandomValues(buf);
    return hex(buf);
  },
};

module.exports = { sign };
