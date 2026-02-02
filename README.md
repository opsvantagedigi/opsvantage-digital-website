<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>
 
# OpsVantage Digital Website & Client Platform

This is the official monorepo for the OpsVantage Digital marketing website and client platform, built with the Next.js App Router and deployed on Vercel.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Authentication:** Supabase
- **CMS:** Sanity.io (planned)
- **Deployment:** Vercel

## 🛠️ Running Locally

**Prerequisites:** Node.js (v20 or later recommended)

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd opsvantage-digital-website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project. You can copy `.env.example` if it exists. Populate it with your keys for Supabase, Stripe, and any other required services.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open http://localhost:3000 with your browser to see the result.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production-ready build.
- `npm run start`: Starts the production server (requires a build first).
- `npm run lint`: Runs ESLint to check for code quality issues.
