import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cher Ami — Monthly Family Album',
    short_name: 'Cher Ami',
    description: 'Every month, transform your family\'s photos and stories into a beautiful magazine, delivered to those you love.',
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