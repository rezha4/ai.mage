## https://ai-mage.vercel.app/

## AI.mage, image transform with AI
This project were made because I am currently learning Next JS & Typescript.
Tech used:
- Stripe
- Clerk
- Cloudinary
- MongoDB
- NEXT
- Vercel
- ShadCN
- Tailwind

## Insights
- using Clerk is very easy & their docs are very well documented, I am able to set up webhooks following their official docs
- understanding Next's serverless nature is pretty hard, I might need more projects done to get the grasp of this (in terms of setting up cache for MongoDB connection)

## Cloning the project to your machine

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

Take a look at `.env.example` for all the secrets and env variables you might need to add form third party services/databases - in this case it's Stripe, Clerk and MongoDB
