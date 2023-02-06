import { randomBytes, pbkdf2 } from "node:crypto";
import { promisify } from "util";

const pbkdf2Async = promisify(pbkdf2);

export class Password {
  static async toHash(password: string) {
    try {
      const salt = randomBytes(8).toString("hex");
      const buf = (await pbkdf2Async(
        password,
        salt,
        100000,
        64,
        "sha512"
      )) as Buffer;
      return `${buf.toString("hex")}.${salt}`;
    } catch (error) {
      throw error;
    }
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = await pbkdf2Async(suppliedPassword, salt, 100000, 64, "sha512");
    return hashedPassword === buf.toString("hex");
  }
}
