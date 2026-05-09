const sign = (req) => {

  if (bru.isSafeMode()) {
    const cryptoJS = require("crypto-js");
    const { v4: uuidv4 } = require("uuid");

    // ===== CONFIG =====
    const apiKey = bru.getEnvVar("apiKey");
    const apiSecret = bru.getEnvVar("apiSecret");
    const ALGORITHM = "hmac-sha256";

    // ===== HELPERS =====
    const formatDate = (date = new Date()) =>
      date.toUTCString().replace("GMT", "+0000");
    const generateNonce = () => uuidv4().replace(/-/g, "");

    const generateRequestPath = (req) => {
      const preUrl =
        "/" +
        bru.interpolate(req.url).split("?")[0].split("/").slice(3).join("/");
      const url = preUrl.replace(
        /{{(.*?)}}|:([a-zA-Z0-9_]+)/g,
        (_, curlyVar, colonVar) => {
          const varName = curlyVar || colonVar;
          const value = bru.getEnvVar(varName) || bru.getRequestVar(varName);

          if (value === undefined || value === null) {
            throw new Error(`Missing env var: ${varName}`);
          }
          return value;
        },
      );
      return url;
    }

    const buildSigningString = ({ method, path, date, nonce }) => {
      let signingString = `(request-target): ${method} ${path}\n`;
      signingString += `x-aux-date: ${date}`;

      if (nonce) {
        signingString += `\nnonce: ${nonce}`;
      }

      return signingString;
    };

    const generateSignature = (secret, signingString) => {
      const hash = cryptoJS.HmacSHA256(signingString, secret);
      const base64 = hash.toString(cryptoJS.enc.Base64);
      return encodeURIComponent(base64);
    };

    const buildSignatureHeader = ({
      apiKey,
      algorithm,
      headers,
      signature,
      nonce,
    }) => {
      return `Signature keyId="${apiKey}",algorithm="${algorithm}",headers="${headers}",signature="${signature}",nonce="${nonce}"`;
    };

    // ===== MAIN =====
    const method = req.getMethod().toLowerCase();
    const path = generateRequestPath(req);

    const date = formatDate();
    const nonce = generateNonce();

    const signingString = buildSigningString({
      method,
      path,
      date,
      nonce,
    });
    const signature = generateSignature(apiSecret, signingString);
    const signatureHeader = buildSignatureHeader({
      apiKey,
      algorithm: ALGORITHM,
      headers: "(request-target) x-aux-date",
      signature,
      nonce,
    });
    req.setHeader("X-Aux-Date", date);
    req.setHeader("X-Signature", signatureHeader);

    bru.setEnvVar("X-Aux-Date", date)
    bru.setEnvVar("X-Signature", signatureHeader)
  }
}
module.exports = {
  sign
}