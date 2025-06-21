# ResumeGenius Deployment Guide

This guide will help you deploy the landing page to GitHub Pages and the builder application to Netlify.

## 📋 Prerequisites

1. **GitHub Account** - For hosting the landing page
2. **Netlify Account** - For hosting the builder application
3. **Git** - Installed on your computer
4. **Node.js** - Version 18 or higher

## 🚀 Step 1: Deploy Builder Application to Netlify

### Option A: Deploy via Netlify CLI (Recommended)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Navigate to project root and deploy**
   ```bash
   cd "C:\Users\Sadiya\Downloads\ResumeGenius (1)\ResumeGenius"
   netlify deploy --prod --dir=dist
   ```

4. **Set environment variables in Netlify Dashboard**
   - Go to your Netlify site dashboard
   - Navigate to Site settings > Environment variables
   - Add: `VITE_LANDING_URL=https://your-username.github.io/your-repo-name`

### Option B: Deploy via Netlify Dashboard

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Drag and drop the `dist` folder**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist` folder to the deploy area
   - Your site will be deployed automatically

3. **Set environment variables** (same as above)

## 🌐 Step 2: Deploy Landing Page to GitHub Pages

### Option A: Deploy via GitHub Actions (Recommended)

1. **Create a new GitHub repository**
   - Go to GitHub and create a new repository
   - Name it something like `resumegenius-landing`

2. **Push landing page code to GitHub**
   ```bash
   cd landing-page
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/resumegenius-landing.git
   git push -u origin main
   ```

3. **Create GitHub Actions workflow**
   Create `.github/workflows/deploy.yml` in the landing-page directory:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v3

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'

         - name: Install dependencies
           run: npm install

         - name: Build
           run: npm run build
           env:
             VITE_BUILDER_URL: ${{ secrets.VITE_BUILDER_URL }}

         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

4. **Set repository secrets**
   - Go to your repository settings
   - Navigate to Secrets and variables > Actions
   - Add: `VITE_BUILDER_URL` with your Netlify URL

5. **Enable GitHub Pages**
   - Go to repository settings
   - Navigate to Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Save

### Option B: Deploy via gh-pages package

1. **Install gh-pages**
   ```bash
   cd landing-page
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Build and deploy**
   ```bash
   npm run build
   npm run deploy
   ```

## 🔗 Step 3: Connect the Applications

### Update Landing Page URL

1. **Get your GitHub Pages URL**
   - Format: `https://your-username.github.io/your-repo-name`

2. **Update Netlify environment variables**
   - Go to your Netlify dashboard
   - Add: `VITE_LANDING_URL=https://your-username.github.io/your-repo-name`

### Update Builder Application URL

1. **Get your Netlify URL**
   - Format: `https://your-site-name.netlify.app`

2. **Update GitHub repository secrets**
   - Go to your GitHub repository settings
   - Add: `VITE_BUILDER_URL=https://your-site-name.netlify.app`

## 🎯 Step 4: Custom Domains (Optional)

### Netlify Custom Domain

1. **Add custom domain in Netlify**
   - Go to Site settings > Domain management
   - Add custom domain (e.g., `builder.resumegenius.com`)

2. **Configure DNS**
   - Add CNAME record pointing to your Netlify site

### GitHub Pages Custom Domain

1. **Add custom domain in repository settings**
   - Go to Pages settings
   - Add custom domain (e.g., `resumegenius.com`)

2. **Configure DNS**
   - Add CNAME record pointing to `your-username.github.io`

## 🔧 Environment Variables Reference

### Landing Page (.env)
```env
VITE_BUILDER_URL=https://your-builder-app.netlify.app
VITE_APP_NAME=ResumeGenius
```

### Builder Application (.env)
```env
VITE_LANDING_URL=https://your-username.github.io/your-repo-name
VITE_APP_NAME=ResumeGenius Builder
```

## 📱 Testing the Connection

1. **Test landing page**
   - Visit your GitHub Pages URL
   - Click "Get Started" or "Start Building Now"
   - Should redirect to your Netlify builder app

2. **Test builder app**
   - Visit your Netlify URL
   - Click "Home" button (if available)
   - Should redirect to your GitHub Pages landing page

## 🚨 Troubleshooting

### Common Issues

1. **Environment variables not working**
   - Rebuild and redeploy after adding environment variables
   - Check variable names (must start with `VITE_`)

2. **GitHub Pages not updating**
   - Check GitHub Actions workflow
   - Ensure gh-pages branch is created
   - Wait a few minutes for deployment

3. **Netlify build fails**
   - Check build logs in Netlify dashboard
   - Ensure all dependencies are in package.json
   - Check for TypeScript errors

4. **Cross-origin issues**
   - Ensure both sites use HTTPS
   - Check CORS settings if needed

## 📊 Monitoring

### GitHub Pages
- Check Actions tab for deployment status
- Monitor repository insights

### Netlify
- Check deploy logs in dashboard
- Monitor site analytics
- Set up notifications for failed builds

## 🎉 Success!

Once deployed, you'll have:
- **Landing Page**: `https://your-username.github.io/your-repo-name`
- **Builder App**: `https://your-site-name.netlify.app`

Both applications will be connected and users can seamlessly navigate between them! 