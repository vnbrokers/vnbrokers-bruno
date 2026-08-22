const crypto = require("crypto");

function getXmlTag(xml, tagName, required = true) {
  const re = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)</${tagName}>`, "i");
  const match = xml.match(re);

  if (!match) {
    if (required) {
      throw new Error(`Missing RSA field: ${tagName}`);
    }
    return null;
  }

  return match[1].replace(/\s+/g, "");
}

function stripLeadingZero(buf) {
  while (buf.length > 1 && buf[0] === 0x00) {
    buf = buf.subarray(1);
  }
  return buf;
}

function toBase64Url(buf) {
  return stripLeadingZero(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function xmlBase64ToBase64UrlUInt(value) {
  return toBase64Url(Buffer.from(value, "base64"));
}

function xmlBase64ToBigInt(value) {
  const buf = stripLeadingZero(Buffer.from(value, "base64"));
  const hex = buf.toString("hex");
  return BigInt("0x" + hex);
}

function bigIntToBase64UrlUInt(value) {
  let hex = value.toString(16);

  if (hex.length % 2 !== 0) {
    hex = "0" + hex;
  }

  return toBase64Url(Buffer.from(hex, "hex"));
}

function modInverse(a, m) {
  let m0 = m;
  let x0 = 0n;
  let x1 = 1n;

  a = ((a % m) + m) % m;

  if (m === 1n) {
    return 0n;
  }

  while (a > 1n) {
    const q = a / m;

    [a, m] = [m, a % m];
    [x0, x1] = [x1 - q * x0, x0];
  }

  if (x1 < 0n) {
    x1 += m0;
  }

  return x1;
}

function getRSAKey(privateKeyBase64Xml) {
  const xml = Buffer.from(privateKeyBase64Xml.trim(), "base64").toString("utf8");

  const modulus = getXmlTag(xml, "Modulus");
  const exponent = getXmlTag(xml, "Exponent");
  const d = getXmlTag(xml, "D");
  const p = getXmlTag(xml, "P");
  const q = getXmlTag(xml, "Q");

  const dp = getXmlTag(xml, "DP", false);
  const dq = getXmlTag(xml, "DQ", false);
  const inverseQ = getXmlTag(xml, "InverseQ", false);

  const dInt = xmlBase64ToBigInt(d);
  const pInt = xmlBase64ToBigInt(p);
  const qInt = xmlBase64ToBigInt(q);

  const jwk = {
    kty: "RSA",

    n: xmlBase64ToBase64UrlUInt(modulus),
    e: xmlBase64ToBase64UrlUInt(exponent),
    d: xmlBase64ToBase64UrlUInt(d),
    p: xmlBase64ToBase64UrlUInt(p),
    q: xmlBase64ToBase64UrlUInt(q),

    dp: dp ? xmlBase64ToBase64UrlUInt(dp)
      : bigIntToBase64UrlUInt(dInt % (pInt - 1n)),

    dq: dq ? xmlBase64ToBase64UrlUInt(dq)
      : bigIntToBase64UrlUInt(dInt % (qInt - 1n)),

    qi: inverseQ ? xmlBase64ToBase64UrlUInt(inverseQ)
      : bigIntToBase64UrlUInt(modInverse(qInt, pInt)),
  };

  return crypto.createPrivateKey({
    key: jwk,
    format: "jwk",
  });
}
function signWithRSA(privateKeyBase64Xml, message) {
  const privateKey = getRSAKey(privateKeyBase64Xml);

  const signature = crypto.sign(
    "RSA-SHA256",
    Buffer.from(message, "utf8"),
    privateKey
  );

  return signature.toString("hex");
}

module.exports = {
  signWithRSA
}
