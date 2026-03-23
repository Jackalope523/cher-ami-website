import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cher Ami — Monthly Family Album',
    short_name: 'Cher Ami',
    description: 'The perfect gift for grandparents, a monthly magazine filled with family photos, delivered to their door.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FCFBF8',
    theme_color: '#C15F3C',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}