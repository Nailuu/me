const SCRIPT_URL =
  "https://raw.githubusercontent.com/Nailuu/wsl-screenshot-cli/main/scripts/install.sh";

export async function GET() {
  const res = await fetch(SCRIPT_URL, { next: { revalidate: 3600 } });

  if (!res.ok) {
    return new Response("Failed to fetch install script", { status: 502 });
  }

  const script = await res.text();

  return new Response(script, {
    headers: { "Content-Type": "text/x-shellscript" },
  });
}
