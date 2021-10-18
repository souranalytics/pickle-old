![Pickle](https://pickle.sh/pickle@2x.png)

# Pickle

Privacy and developer-first analytics

## Motivation

I wanted to build a no frills analytics service that's easy to integrate like Segment and doesn't have the clutter of Mixpanel or Google Analytics. There's a bunch of services like that for website analytics (I use [Panelbear](https://panelbear.com) for my websites) now, but none that aren't agnostic about your sources. I've been building (and rebuilding) Pickle for several years now but started over from scratch for the Supabase Hacktoberfest.

## Tech

- [TypeScript](https://www.typescriptlang.org)
- [Next.js](https://nextjs.org)
- [Tailwind](https://tailwindcss.com)
- [Prisma](https://www.prisma.io)
- [Upstash](https://upstash.com), for caching
- [Supabase](https://supabase.io), obv
- [GraphCMS](https://graphcms.com), for assets and content
- [Quirrel](https://quirrel.dev/), for jobs

## Demo

[Demo](https://pickle.sh)

## Team

| Name      | GitHub                                  | Twitter                                    |
| --------- | --------------------------------------- | ------------------------------------------ |
| Ali Zahid | [alizahid](https://github.com/alizahid) | [alizahid0](https://twitter.com/alizahid0) |

## Supabase

- [x] Auth
- [x] Database (with Prisma)

### Planned

- Storage (for data exports)
