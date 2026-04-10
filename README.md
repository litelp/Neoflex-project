# Neoflex-project

### Project Description

**NeoBank Application** is a web application developed as part of the Neoflex course. The project represents a responsive banking interface with a focus on clean UI, accessibility, and scalable architecture.

The application includes multiple sections such as a landing page with product features, currency exchange rates, subscription form, and responsive navigation with a mobile menu. The project emphasizes semantic HTML, BEM methodology, and reusable component-based architecture.

### Technologies Used

- **Vite** — project bundler (dev + build modes)
- **TypeScript** — strongly typed programming language
- **ESLint** — code linting and style checking
- **Prettier** — automatic code formatting
- **Husky** + lint-staged — Git hooks for code quality checks before commits
- **React** UI library for building component-based interfaces

### Features

- Responsive layout (desktop 1300px → tablet 920px → mobile 500px)
- Sticky header with burger menu
- Reusable UI components (Button, sections)
- Currency rates fetching with auto-refresh (every 15 minutes)
- Loader with animated spinner
- Semantic and accessible markup

### Getting Started

1. **Clone the repository**
   `git clone https://github.com/litelp/Neoflex-project.git`
2. **Install dependencies**
   `npm install`
3. **Start the development server**
   `npm run dev`
4. **Build the project**
   `npm run build`

### Available Scripts

| **Script**           | **Description**                           |
| -------------------- | ----------------------------------------- |
| `npm run dev`        | Run the development server                |
| `npm run build`      | Build the project for production          |
| `npm run preview`    | Preview the production build locally      |
| `npm run lint`       | Run ESLint to check code style and issues |
| `npm run format:fix` | Format code using Prettier                |
| `npm run prepare`    | Setup Git hooks via Husky                 |
