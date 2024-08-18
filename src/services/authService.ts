import { kv } from '@vercel/kv';
import bcrypt from 'bcryptjs';

const getKVClient = () => {
  if (!process.env.REACT_APP_KV_REST_API_URL || !process.env.REACT_APP_KV_REST_API_TOKEN) {
    console.error('KV environment variables are not set');
    return null;
  }
  return kv;
};

export async function signUp(email: string, username: string, password: string) {
  const kvClient = getKVClient();
  if (!kvClient) {
    throw new Error('KV client is not initialized');
  }

  const existingUser = await kvClient.get(`user:${email}`);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, username, password: hashedPassword };
  await kvClient.set(`user:${email}`, JSON.stringify(user));
  return { email, username };
}

export async function login(email: string, password: string) {
  const kvClient = getKVClient();
  if (!kvClient) {
    throw new Error('KV client is not initialized');
  }

  const userJson = await kvClient.get(`user:${email}`);
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