# How I Used Claude Code to Revamp a Legacy Full-Stack Application

## The Starting Point

Kollectiv is a music collective platform I originally built years ago — a full-stack JavaScript application with a classic MERN-era architecture. Express server, React 15 class components, raw SQL queries via pg-promise, manual JWT authentication, Webpack 1, Babel 6 — the works. It was a product of its time, but the tech debt had compounded to the point where making any change felt like archaeology.

The codebase had all the hallmarks of an early-career project that shipped and then ossified:

- A monolithic `App.jsx` managing all application state through deeply nested prop drilling
- Raw SQL strings scattered across model files with no type safety
- Hand-rolled JWT authentication with tokens stored in localStorage
- A Webpack + Babel + ESLint configuration that was brittle and hard to extend
- Custom CSS files per component with no design system or utility framework
- Heroku deployment scripts that required manual intervention

I wanted to modernize it — not as a rewrite-from-scratch vanity project, but as a deliberate migration that preserved the existing data model and feature set while adopting a modern stack. I used Claude Code to execute the entire revamp in a single working session.

## The Approach

The goal was a full stack migration with these constraints:

1. **Preserve the existing PostgreSQL schema.** The database had real data. I wasn't going to drop tables and start over.
2. **Maintain feature parity.** Every page and API endpoint in the old app needed a counterpart in the new one.
3. **Adopt current best practices** — but only where they genuinely reduced complexity, not for resume-driven development.

I worked with Claude Code iteratively. Rather than dumping the entire codebase and asking for a rewrite, I broke the migration into architectural layers and tackled them bottom-up.

## Layer 1: Data Access — pg-promise to Prisma

The old data layer was raw SQL queries in model files:

```javascript
// Old: models/blog.js
const db = require('../lib/dbConnect');

Blog.findAll = () => {
  return db.any('SELECT * FROM blog_posts ORDER BY date_created DESC');
};
```

I had Claude Code generate a Prisma schema that mapped directly to the existing PostgreSQL tables. This was the most critical step — get the `@map` directives wrong and you break the connection to live data.

```prisma
model BlogPost {
  id        Int       @id @default(autoincrement()) @map("blog_post_id")
  title     String?
  content   String?
  artistId  Int?      @map("artist_id")
  createdAt DateTime  @default(now()) @map("date_created")
  artist    Artist?   @relation(fields: [artistId], references: [id], onDelete: Cascade)

  @@map("blog_posts")
}
```

The `@@map("blog_posts")` and `@map("blog_post_id")` annotations let Prisma use idiomatic camelCase in the application code while respecting the existing snake_case column and table names in PostgreSQL. No migration needed — Prisma introspects and works with what's already there.

Claude Code handled the field-by-field mapping, including the foreign key relationships between artists, blog posts, and events. I validated each model against the actual database schema.

## Layer 2: Authentication — Manual JWT to NextAuth

The original auth implementation was a hand-rolled JWT flow:

```javascript
// Old: routes/api/user.js
router.post('/login', (req, res) => {
  User.findByUserName(req.body.username)
    .then(user => {
      bcrypt.compare(req.body.password, user.password)
        .then(match => {
          const token = jwt.sign({ user }, process.env.SECRET_KEY);
          res.json({ token, user });
        });
    });
});
```

Tokens were stored in `localStorage` on the client, sent via `Authorization` headers, and validated with `express-jwt` middleware. It worked, but it was a large surface area to maintain and had well-known security implications (XSS exposure via localStorage, no automatic token refresh, no CSRF protection).

I had Claude Code set up NextAuth with a Credentials provider that preserved the bcrypt password verification while gaining HTTP-only cookie sessions, CSRF tokens, and server-side session validation — all for significantly less code.

The NextAuth callback chain enriches the session with the artist's ID and username, so downstream components can access identity without additional database calls. This replaced a pattern in the old app where the JWT payload was manually decoded on every page that needed user context.

## Layer 3: API Routes — Express to Next.js Route Handlers

The Express routes followed a standard pattern: router, middleware, controller logic, response.

```javascript
// Old: routes/api/blog.js
router.get('/', (req, res) => {
  Blog.findAll()
    .then(posts => res.json({ posts }))
    .catch(err => res.status(500).json({ error: err.message }));
});
```

The Next.js route handlers are more concise and co-located with their URL paths:

```typescript
// New: app/api/blog/route.ts
export async function GET() {
  const posts = await prisma.blogPost.findMany({
    include: { artist: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(posts);
}
```

No router setup, no middleware chain, no manual error formatting. The file-system routing convention means the URL structure is visible in the directory tree. Claude Code generated all the route handlers — blog CRUD, artists, events, account, contact — and I reviewed each one for correctness against the original Express routes.

## Layer 4: Frontend — React 15 Class Components to Next.js App Router

This was the largest surface area change. The old frontend was a single-page application with a monolithic `App.jsx` that managed all state:

```jsx
// Old: src/components/App/App.jsx (simplified)
class App extends Component {
  constructor() {
    super();
    this.state = {
      blogPosts: [], events: [], artists: [],
      currentUser: null, isLoggedIn: false,
      // ... dozens more state fields
    };
  }
}
```

Every child component received its data and callbacks through props, multiple levels deep. Adding a feature meant threading new props through the entire component tree.

The new architecture leverages the App Router's server/client component split:

- **Server components** (default) fetch data directly from Prisma at request time. The blog listing page, artist profiles, and event pages are all server components — zero client-side JavaScript for data fetching.
- **Client components** (explicitly marked with `"use client"`) handle interactivity: the navbar with its login modal, the dark mode toggle, form pages for creating and editing posts.
- **Layouts** handle shared UI and access control. The account section has a layout that checks the session server-side and redirects unauthenticated users before any page content renders.

I directed Claude Code to use this server/client split intentionally — not just slapping `"use client"` on everything, which is a common pitfall when migrating to the App Router.

## Layer 5: Styling — Custom CSS to Tailwind

The old app had per-component CSS files (`Blog.css`, `Navbar.css`, etc.) with no shared design tokens or utility system. Styling changes required context-switching between JSX and CSS files, and specificity conflicts were a recurring issue.

Tailwind eliminated the CSS files entirely. Every style is co-located with the markup, design tokens are consistent by default, and dark mode support came essentially free via the `dark:` variant prefix. Claude Code converted each component's styling, and I adjusted the visual details to match the design I wanted.

## What Claude Code Did Well

**Architectural consistency.** When I established a pattern (e.g., how API routes should handle errors, how server components should fetch data), Claude Code applied it uniformly across all files. This is where AI-assisted development genuinely shines — the tedious, repetitive application of a known-good pattern across dozens of files.

**Schema mapping.** Generating the Prisma schema from an existing PostgreSQL database with correct `@map` annotations is exactly the kind of precise, detail-oriented task where a single typo breaks everything. Claude Code got this right on the first pass.

**Boilerplate generation with context.** Every route handler, every page component, every API endpoint follows the same conventions — but each one has domain-specific logic. Claude Code generated contextually appropriate code, not just templates with blanks filled in.

**Iterative refinement.** When I pushed back on a decision — "this should be a server component, not a client component" or "use the session check pattern from the account layout" — Claude Code adapted immediately and applied the correction going forward.

## What Required Human Judgment

**The server/client component boundary.** Deciding which components need interactivity (and therefore must be client components) versus which can render server-side is an architectural decision that requires understanding the user experience. Claude Code followed my direction here, but the decisions were mine.

**Data model preservation.** The choice to map Prisma to the existing schema rather than migrating to a new one was a product decision. A tool can execute either approach — a human needs to decide which one is appropriate for the context.

**Feature scoping.** The old app had some features (like the sidebar login widget) that didn't make sense in the new design. Deciding what to keep, what to cut, and what to redesign required product thinking, not code generation.

**Security review.** I reviewed the NextAuth configuration, the API route authorization checks, and the Prisma query patterns for injection safety. AI-generated code needs the same security review as human-written code — arguably more, because the person reviewing it didn't write it.

## The Result

| Dimension | Before | After |
|-----------|--------|-------|
| Language | JavaScript | TypeScript |
| Framework | Express + React 15 | Next.js 15 (App Router) |
| Data Access | Raw SQL (pg-promise) | Prisma ORM |
| Auth | Manual JWT + localStorage | NextAuth (HTTP-only cookies) |
| Styling | Per-component CSS | Tailwind CSS |
| Build | Webpack 1 + Babel 6 | Next.js (zero-config) |
| Components | Class components, prop drilling | Server/client split, hooks |
| Deployment | Heroku with manual scripts | Vercel-ready (or any Node host) |

The PostgreSQL database is unchanged. The feature set is preserved. The codebase is smaller, type-safe, and built on actively maintained frameworks.

## Takeaways

Using Claude Code for a migration like this isn't about asking it to "rewrite my app." It's about decomposing the migration into well-defined layers, establishing the patterns you want, and then leveraging the tool to apply those patterns at scale.

The highest-leverage use was in the middle layers — the repetitive-but-precise work of converting dozens of routes, components, and model mappings. The lowest-leverage moments were the architectural decisions at the boundaries: what should be a server component, how should auth flow work, what features to preserve. Those require an engineer who understands both the old system and the target architecture.

AI-assisted development tools are force multipliers for engineers who know what they want to build. They don't replace the judgment calls — they eliminate the time tax of executing on them.
