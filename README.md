
# YesIndeed

YesIndeed is a modern digital agency web application built with Next.js, Clerk authentication, and Tailwind CSS. It features a sleek UI, animated navigation, authentication, and modular components for services, case studies, and more.

## Features
- Next.js 14+ App Router
- Clerk authentication (Sign In/Up, User Button)
- Responsive design with Tailwind CSS
- Animated NavBar and custom Footer
- Modular components: Hero, Services, CallToAction, CaseStudy
- Environment variables via `.env`

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ViggenKorir/YesIndeed.git
   cd YesIndeed/yesindeed
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the project root:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack
- Next.js
- Clerk
- Tailwind CSS
- React

## Folder Structure

```
yesindeed/
├── src/app/
│   ├── components/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── public/
├── .env
├── package.json
└── ...
```

## License
MIT
