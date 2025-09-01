export async function GET(request) {
  const res = await fetch("http://localhost:3007/user/me", {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
    credentials: "include",
  });
  const data = await res.json();
  return Response.json(data);
}