export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  keywords: string[];
  date: string;
  dateISO: string;
  author: string;
  readingTime: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'mothers-day-gift-for-long-distance-mom',
    title: "The Best Mother's Day Gift for a Long-Distance Mom",
    description:
      "Stuck finding a Mother's Day gift for a mom who lives far away? Here's the one gift that actually makes her feel close to the life she's missing.",
    excerpt:
      "Mother's Day is harder when your mom lives far away. Here's the one gift that actually makes her feel part of your everyday life — not just remembered on May 11th.",
    keywords: [
      "mother's day gift for long distance mom",
      "mother's day gift for mom who lives far away",
      "long distance mother's day ideas",
      "gift for mom far away",
      "long distance mom gifts",
    ],
    date: 'April 14, 2026',
    dateISO: '2026-04-14',
    author: 'Cher Ami',
    readingTime: '4 min read',
  },
  {
    slug: 'mothers-day-gifts-for-grandma',
    title: "9 Mother's Day Gifts for Grandma She'll Actually Use",
    description:
      "Nine Mother's Day gifts for Grandma that she'll actually use — not just display. Thoughtful picks for grandmas who live far away, love family photos, or say they don't need anything.",
    excerpt:
      "Grandma doesn't want another mug or candle. She wants to feel connected to the family she doesn't see enough. Here are nine gifts that actually deliver on that.",
    keywords: [
      "mother's day gifts for grandma",
      "best mother's day gift for grandmother",
      "mother's day gift grandma will love",
      "unique mother's day gifts for grandma",
      'gifts for grandma',
    ],
    date: 'April 12, 2026',
    dateISO: '2026-04-12',
    author: 'Cher Ami',
    readingTime: '6 min read',
  },
  {
    slug: 'gifts-for-mom-who-has-everything',
    title: "What to Get the Mom Who Says She Doesn't Want Anything",
    description:
      "If your mom says she doesn't want anything for Mother's Day, here's what she actually means — and the gift that answers it without adding to the clutter.",
    excerpt:
      "\"I don't want anything.\" Every year she says it. Here's what she actually means — and the gift that shows her she still matters.",
    keywords: [
      'gift for mom who has everything',
      "mom who doesn't want anything",
      "what to get mom who has everything for mother's day",
      "gift for mom who says she doesn't need anything",
    ],
    date: 'April 10, 2026',
    dateISO: '2026-04-10',
    author: 'Cher Ami',
    readingTime: '4 min read',
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
