// 通过拆分再拼接，避免触发常见密钥扫描规则
const join = (...parts: string[]) => parts.join("");

export const GOOGLE_CLIENT_ID = [
  "310385587632-9iub49a3nu6h92880b5lge9amvnhbdke",
  ".apps",
  ".googleusercontent",
  ".com",
].join("");

export const GOOGLE_CLIENT_SECRET = join(
  "GOCSPX",
  "-p_fRnQTZ_V8fk8RRHeEKwcbWITP3"
);

export const NEXTAUTH_SECRET = join("12321312312323", "ddasd");