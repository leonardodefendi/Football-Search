import { Request, Response, NextFunction } from 'express';

export default class Validations {
  static validateLoginFields(req: Request, res: Response, next: NextFunction): Response | void {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
    if (!regex.test(email)) return res.status(401).json({ message: 'Invalid email or password' });
    if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });
    next();
  }
}
