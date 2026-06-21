import { NextRequest, NextResponse } from 'next/server';

const REDIRECTS: Record<string, string> = {
  '/download': '/?redirect=download',
  '/s/ig': '/?utm_source=instagram&utm_medium=social&utm_campaign=launch',
  '/s/tt': '/?utm_source=tiktok&utm_medium=social&utm_campaign=launch',
  '/s/fb': '/?utm_source=facebook&utm_medium=social&utm_campaign=launch',
  '/s/yt': '/?utm_source=youtube&utm_medium=social&utm_campaign=launch',
  '/s/2026-spring-pc-df': '/?utm_source=postcard&utm_medium=print&utm_campaign=2026_spring&utm_content=variant_digital_fatigue',
  '/s/2026-spring-pc-ns': '/?utm_source=postcard&utm_medium=print&utm_campaign=2026_spring&utm_content=variant_nostalgia',
};

export function middleware(request: NextRequest) {
  const destination = REDIRECTS[request.nextUrl.pathname];
  if (destination) {
    return NextResponse.redirect(new URL(destination, request.url));
  }
}

export const config = {
  matcher: ['/s/:path*'],
};
