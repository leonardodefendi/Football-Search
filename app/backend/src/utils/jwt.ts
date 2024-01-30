import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken';

type payloadType = {
  sub: number,
  email: string,
  role: string
};

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || '';

  static sign(payload: payloadType, expires: string): string {
    return sign({ ...payload }, this.secret, { expiresIn: expires });
  }

  static verify(token: string): JwtPayload | string {
    try {
      return verify(token, this.secret) as JwtPayload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }
}
