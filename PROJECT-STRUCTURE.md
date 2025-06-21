# ResumeGenius Project Structure

## 📁 Clean Project Organization

```
ResumeGenius/
├── 📁 client/                    # Main Builder Application
│   ├── 📁 public/               # Static assets for builder app
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   ├── site.webmanifest
│   │   └── 📁 templates/
│   └── 📁 src/                  # Builder app source code
│       ├── 📁 components/
│       ├── 📁 pages/
│       ├── 📁 hooks/
│       ├── 📁 lib/
│       ├── 📁 types/
│       └── main.tsx
│
├── 📁 landing-page/             # Landing Page Application
│   ├── 📁 public/              # Static assets for landing page
│   │   └── landing.png         # Background image
│   ├── 📁 src/                 # Landing page source code
│   │   ├── 📁 components/
│   │   ├── 📁 lib/
│   │   ├── main.tsx
│   │   └── index.css
│   ├── 📁 .github/workflows/   # GitHub Actions deployment
│   │   └── deploy.yml
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── postcss.config.js
│   ├── netlify.toml
│   ├── env.example
│   └── landing-page.tsx
│
├── 📄 package.json              # Main project dependencies
├── 📄 vite.config.ts           # Main Vite configuration
├── 📄 tailwind.config.ts       # Main Tailwind configuration
├── 📄 tsconfig.json            # Main TypeScript configuration
├── 📄 postcss.config.js        # PostCSS configuration
├── 📄 components.json          # UI components configuration
├── 📄 .gitignore              # Git ignore rules
├── 📄 README.md               # Main project documentation
├── 📄 DEPLOYMENT-GUIDE.md     # Deployment instructions
├── 📄 deploy-all.sh           # Complete deployment script
├── 📄 env.example             # Environment variables template
├── 📄 netlify.toml            # Netlify configuration
└── 📄 package-lock.json       # Locked dependencies
```

## 🗂️ File Purposes

### **Main Application (client/)**
- **Builder application** - The actual resume builder tool
- **Separate deployment** - Deploys to Netlify
- **Full functionality** - All resume building features

### **Landing Page (landing-page/)**
- **Marketing page** - Professional landing page
- **GitHub Pages** - Deploys to GitHub Pages
- **Lead generation** - Converts visitors to users

### **Configuration Files**
- **package.json** - Main project dependencies and scripts
- **vite.config.ts** - Build configuration for main app
- **tailwind.config.ts** - Tailwind CSS configuration
- **tsconfig.json** - TypeScript configuration
- **postcss.config.js** - CSS processing configuration
- **components.json** - UI component library configuration

### **Deployment Files**
- **deploy-all.sh** - Complete deployment script for both apps
- **DEPLOYMENT-GUIDE.md** - Step-by-step deployment instructions
- **netlify.toml** - Netlify deployment configuration
- **env.example** - Environment variables template

### **GitHub Actions**
- **.github/workflows/deploy.yml** - Automated GitHub Pages deployment

## 🧹 Cleanup Summary

### **Removed Files:**
- ❌ `deploy.sh` - Redundant deployment script
- ❌ `deploy-builder.sh` - Redundant deployment script  
- ❌ `deploy-landing.sh` - Redundant deployment script
- ❌ `DEPLOYMENT.md` - Duplicate documentation
- ❌ `shared/` - Empty directory
- ❌ `client/index.html` - Duplicate HTML file
- ❌ `client/tailwind.config.js` - Duplicate config
- ❌ `client/public/landing.png` - Moved to landing-page
- ❌ `vercel.json` - Not needed (using Netlify)
- ❌ `landing-page/vercel.json` - Not needed (using GitHub Pages)

### **Benefits:**
- ✅ **Cleaner structure** - No duplicate or unnecessary files
- ✅ **Easier maintenance** - Clear separation of concerns
- ✅ **Better organization** - Logical file grouping
- ✅ **Reduced confusion** - Single source of truth for each component
- ✅ **Platform-specific** - Only relevant deployment configs

## 🚀 Deployment Structure

### **Builder App → Netlify**
- Source: `client/` directory
- Build: `npm run build` (creates `dist/`)
- Deploy: `dist/` folder to Netlify
- Config: `netlify.toml`

### **Landing Page → GitHub Pages**
- Source: `landing-page/` directory
- Build: `npm run build` (creates `dist/`)
- Deploy: GitHub Actions or gh-pages
- Config: `.github/workflows/deploy.yml`

## 📝 Development Workflow

1. **Main app development**: Work in `client/src/`
2. **Landing page development**: Work in `landing-page/`
3. **Shared assets**: Place in respective `public/` directories
4. **Deployment**: Use `deploy-all.sh` or follow `DEPLOYMENT-GUIDE.md`

## 🎯 Deployment Platforms

- **Netlify**: For the main builder application
- **GitHub Pages**: For the landing page
- **No Vercel**: Removed unnecessary Vercel configurations

This clean structure makes the project easier to maintain, deploy, and understand! 🎉 