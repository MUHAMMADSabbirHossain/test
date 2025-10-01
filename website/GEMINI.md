# GEMINI.md

## Project Overview

This is a [Next.js](https://nextjs.org/) project, bootstrapped with `create-next-app`. It is a web application built with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/). The styling is done using [Tailwind CSS](https://tailwindcss.com/).

The project is configured with ESLint for code quality and uses the Geist font family. The basic structure includes a main page (`src/app/page.tsx`) and a root layout (`src/app/layout.tsx`).

## Building and Running

To get the development server running, use the following command:

```bash
npm run dev
```

This will start the server on [http://localhost:3000](http://localhost:3000).

### Key Commands

*   **`npm run dev`**: Starts the development server with Turbopack.
*   **`npm run build`**: Creates a production-ready build of the application with Turbopack.
*   **`npm run start`**: Starts the production server.
*   **`npm run lint`**: Lints the codebase using ESLint.

## Development Conventions

*   **Linting**: The project uses ESLint with the recommended Next.js and TypeScript configurations (`next/core-web-vitals`, `next/typescript`).
*   **TypeScript**: The `tsconfig.json` is set up for a strict TypeScript environment.
*   **Path Aliases**: The project uses the `@/*` alias for paths starting from the `src/` directory.
*   **Styling**: Tailwind CSS is used for styling. Configuration is in `postcss.config.mjs` and `tailwind.config.ts` (though the latter is not present, it would be the standard place).
*   **Fonts**: The application uses the `Geist` font family.
