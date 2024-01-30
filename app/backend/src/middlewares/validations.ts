import { Request, Response, NextFunction } from 'express';

export default class Validations {
  static validateLoginFields(req: Request, res: Response, next: NextFunction): Response | void {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    if (!password) return res.status(400).json({ message: 'All fields must be filled' });
    if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });
    if (regex.test(email)) return res.status(401).json({ message: 'Invalid email or password' });
    next();
  }
}