import 'hono';

declare module 'hono' {
  interface HonoRequest {
    user?: {
      id: string;
      role: 'user' | 'moderator' | 'admin';
      [key: string]: any;
    };
  }
}
