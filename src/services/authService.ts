import { kv } from '@vercel/kv';
import bcrypt from 'bcryptjs';

export async function signUp(email: string, username: string, password: string) {
  const existingUser = await kv.get(`user:${email}`);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, username, password: hashedPassword };
  await kv.set(`user:${email}`, JSON.stringify(user));
  return { email, username };
}

export async function login(email: string, password: string) {
  const userJson = await kv.get(`user:${email}`);
  if (!userJson) {
    throw new Error('User not found');
  }

  const user = JSON.parse(userJson as string);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return { email: user.email, username: user.username };
}