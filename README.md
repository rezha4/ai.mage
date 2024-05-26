## https://ai-mage.vercel.app/

## AI.mage, web image transform app with AI (Re- Cloudinary API 😅)
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

## Running the project in your machine
Clone the repo:
```bash
git clone https://github.com/rezha4/ai.mage.git
```

Install the dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

***Take a look at `.env.example` for all the secrets and env variables you might need to add form third party services/databases - in this case it's Cloudinary, Stripe, Clerk and MongoDB.***

## Acknowledgment
Special thanks to Adrian from JSM Mastery (@adrianhajdin), I mostly managed to create this based on his tutorial & code snippets ([repo](@https://github.com/adrianhajdin/ai_saas_app) - [youtube](https://www.youtube.com/watch?v=Ahwoks_dawU&t=16063s)) - and the learning process really sticks when doing it this way 😉.
