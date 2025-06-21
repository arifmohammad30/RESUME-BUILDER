# ResumeGenius - Professional Resume Builder

A modern, professional resume builder application built with React, TypeScript, and Vite. Create ATS-friendly resumes with 15+ beautiful templates and download them as PDF instantly.

![ResumeGenius](https://img.shields.io/badge/ResumeGenius-Professional%20Resume%20Builder-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.14-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **15+ Professional Templates** - ATS-friendly designs for every industry
- **Real-time Preview** - See changes instantly as you type
- **PDF Export** - High-quality PDF downloads with proper formatting
- **No Registration Required** - Start building immediately
- **Auto-save** - Never lose your progress
- **Mobile Responsive** - Works perfectly on all devices
- **Free to Use** - No hidden costs or subscriptions
- **Professional Design** - Clean, modern interface
- **Session Management** - Fresh start for every new user

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resumegenius.git
   cd resumegenius
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build directory
- `npm start` - Start production server

## 🏗️ Project Structure

```
ResumeGenius/
├── client/                 # Main React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # Base UI components (Radix)
│   │   │   ├── resume-form/    # Form components
│   │   │   ├── resume-preview/ # Template previews
│   │   │   └── pdf-templates/  # PDF generation templates
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and helpers
│   │   ├── pages/          # Page components
│   │   └── types/          # TypeScript definitions
│   └── public/             # Static assets
├── landing-page/           # Landing page component
└── shared/                 # Shared utilities
```

## 🎨 Templates

The application includes 15+ professional resume templates:

- **Classic Professional** - Traditional, clean design
- **Modern Blue** - Contemporary with blue accents
- **Minimalist** - Clean and simple
- **Creative Gradient** - Modern with gradients
- **Elegant B&W** - Sophisticated black and white
- **Tech Startup** - Perfect for tech professionals
- **Modern Sidebar** - Sidebar layout design
- **Minimal Classic** - Classic with minimal styling
- **Elegant Serif** - Elegant typography
- **Sidebar Highlight** - Sidebar with highlights
- **Two Column Grid** - Grid-based layout
- **Dark Theme** - Dark mode template
- And more...

## 🔧 Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **React Hook Form** - Form management
- **Zod** - Schema validation

### PDF Generation
- **@react-pdf/renderer** - Server-side PDF generation
- **html2canvas + jsPDF** - Client-side PDF generation

### State Management
- **React Query** - Server state management
- **Local Storage** - Client-side persistence
- **Custom Hooks** - Local state management

### Routing
- **Wouter** - Lightweight routing

## 🌐 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository

### GitHub Pages

1. **Add GitHub Pages dependency**
   ```bash
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

3. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
# Analytics (optional)
VITE_GA_MEASUREMENT_ID=your-ga-id

# App Configuration
VITE_APP_NAME=ResumeGenius
VITE_APP_URL=https://resumegenius.app
```

## 📱 PWA Features

The application includes Progressive Web App features:

- **Offline support** - Works without internet
- **App-like experience** - Install on mobile devices
- **Push notifications** - Stay updated
- **Background sync** - Sync data when online

## 🎯 SEO Optimization

- **Meta tags** - Proper SEO meta tags
- **Open Graph** - Social media sharing
- **Sitemap** - XML sitemap for search engines
- **Robots.txt** - Search engine crawling rules
- **Structured data** - Rich snippets support

## 🔧 Customization

### Adding New Templates

1. Create a new template component in `src/components/resume-preview/`
2. Add the template to the template selector
3. Create corresponding PDF template in `src/components/pdf-templates/`
4. Update the template types and generators

### Styling

The application uses Tailwind CSS for styling. Custom styles can be added in:

- `src/index.css` - Global styles
- Component-specific CSS modules
- Tailwind configuration in `tailwind.config.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [React PDF](https://react-pdf.org/) for PDF generation

## 📞 Support

- **Email**: support@resumegenius.app
- **Website**: https://resumegenius.app
- **Documentation**: https://docs.resumegenius.app

---

Made with ❤️ by the ResumeGenius Team 