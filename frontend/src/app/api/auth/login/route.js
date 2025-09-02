import { cookies } from 'next/headers';

export async function POST(request) {
  const body = await request.json();
  const cookieHeader = cookies()
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  // Проксируем Set-Cookie из backend в ответ Next.js
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) {
    cookies().set('authToken', setCookie.split('authToken=')[1].split(';')[0], {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}
