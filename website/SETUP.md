# Dynamic JSON Portfolio & CMS Setup Guide

This portfolio runs tightly on Next.js 16 (Turbopack) using a fully dynamic JSON-driven Content Management System for blogs, experiences, and certificate records.

## Bootstrapping Locally

1. **Install Dependencies** (if you haven't already):
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   > The site will run locally at [http://localhost:3000](http://localhost:3000).

## Architecture & CMS Design

This project contains a completely custom **admin portal** capable of dynamically mutating data and saving images.

- **Data Store**: `src/data/blogs.json`
  - This JSON file acts as our backend database. All posts, text, and media arrays are mapped chronologically here.
- **Image Directory**: `public/images/`
  - When you upload images or videos through the admin panel, they are automatically organized into folders based on their post slug (e.g. `public/images/participated-in-art-competetion/media_TIMESTAMP_0.jpg`).

## How to Manage Content

To Create or Edit content on the site:
1. Navigate directly to the secret admin portal: [http://localhost:3000/9847465703](http://localhost:3000/9847465703).
2. To **Create a New Post**, leave the top dropdown on "Create a New Post" and fill out the details.
3. To **Edit an Existing Post**, open the dropdown and select the post you wish to modify. The form will preconnect to the database and map all the existing string data. Pressing 'Publish' will intelligently overwrite the old post without duplicating it.
4. **Media Gallery**: Use the "Additional Media" multi-file upload button at the bottom of the form to append arbitrary images and `.mp4` / `.webm` video files! These will procedurally generate a beautiful stacked layout at the bottom of the respective article.

## Aesthetic Themes
The entire site is structurally reactive to Global Dark/Light themes (`[data-theme='light']` / `dark` in `globals.css`). The newspaper views and dynamic backgrounds automatically toggle their appearance cleanly depending on this state.
