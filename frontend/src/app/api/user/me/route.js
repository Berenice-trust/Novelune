import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`, {
    headers: { cookie: cookieHeader },
    credentials: 'include',
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ user: null }), { status: 401 });
  }

  const data = await res.json();
  const user = data.user
  ? {
      ...data.user,
      display_name: data.user.nickname,
      avatarUrl: data.user.avatar,
    }
  : null;
  return Response.json({ user });
}

export async function POST() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { cookie: cookieHeader },
    credentials: 'include',
  });

  return new Response(await res.text(), { status: res.status });
}