import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: number; role: string };
      files?: {
        logo: Express.Multer.File[];
        gallery: Express.Multer.File[];
      };
    }
  }
}

export {};
