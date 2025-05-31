# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Architecture Overview

This is a Next.js 15 App Router application for a Japan travel journal with MDX content management.

### Content System
- Journal entries stored as MDX files in `content/entries/`
- Each entry requires frontmatter: `title`, `date`, `preview`, `tags`
- Content processing handled by `lib/posts.ts` with robust error handling
- MDX files rendered via Next.js MDX plugin with `.mdx` page extensions

### App Structure
- Uses Next.js App Router with dynamic routes via `app/[slug]/`
- Server-side data fetching in `app/data.ts` using `"use server"`
- Client-side filtering and state management in React components
- Responsive design with custom CSS classes

### Key Components
- `JournalEntryList` - Main entry display with filtering and pagination
- `TagFilter` - Dynamic tag-based filtering system
- `Timeline` - Chronological navigation component
- UI components in `components/ui/` using Radix UI primitives

### Styling
- Tailwind CSS 4.x with custom configuration
- Uses `clsx` and `tailwind-merge` for conditional classes
- Lucide React for icons

### Content Guidelines
- MDX files should follow the naming pattern: `YYYY-MM-DD-slug.mdx`
- Images stored in `public/images/`
- Tags enable content organization and filtering