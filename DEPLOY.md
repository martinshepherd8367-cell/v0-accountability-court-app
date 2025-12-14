# Deployment Guide for Accountability Court App

This guide will help you deploy your application to Vercel and connect it to your custom domain `dmsclinicalservices.com`.

## Prerequisites

1.  **Vercel Account:** [Sign up here](https://vercel.com/signup).
2.  **GitHub Account:** You already have this since we pushed code to it.
3.  **Domain Access:** Access to where you bought `dmsclinicalservices.com` (e.g., GoDaddy, Namecheap).

## Step 1: Connect to Vercel

1.  Log in to your Vercel Dashboard.
2.  Click **"Add New..."** -> **"Project"**.
3.  Choose **"Continue with GitHub"**.
4.  Find and select the repository: `v0-accountability-court-app`.
5.  Click **"Import"**.

## Step 2: Configure Environment Variables

In the "Configure Project" screen on Vercel:

1.  Look for the **"Environment Variables"** section.
2.  Add the variable that points to your backend API:
    *   **Key:** `NEXT_PUBLIC_API_URL`
    *   **Value:** `https://master-agent-brain-564112873380.us-central1.run.app` (or your specific backend URL)
3.  Click **"Deploy"**.

Vercel will build your application. It might take a minute. Once done, you'll see a success screen with a `*.vercel.app` link.

## Step 3: Connect Your Domain (dmsclinicalservices.com)

1.  In your Vercel Project Dashboard, go to **Settings** -> **Domains**.
2.  Enter `dmsclinicalservices.com` in the input field and click **"Add"**.
3.  Select the recommended option (often "Add to Vercel DNS" or adding `A` records to your registrar).
4.  Vercel will give you specific DNS records to add.
    *   **If using Vercel Nameservers:** Go to your domain registrar (e.g., GoDaddy) and change the Nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`.
    *   **If keeping current DNS:** Add the `A Record` (76.76.21.21) and `CNAME` (cname.vercel-dns.com) as shown by Vercel.

It may take up to 24-48 hours for the domain to propagate, but it's usually much faster.

## Step 4: Verification

Visit `https://dmsclinicalservices.com`. You should see your live application.

## Troubleshooting

*   **Empty Dashboard:** Since we removed fake data, the dashboard will look empty initially. Use the **"Add Program"** button to create your first session.
*   **API Errors:** If you see network errors, check the Console (F12) to ensure the API requests are going to the correct `NEXT_PUBLIC_API_URL`.
