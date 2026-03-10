# Azure Static Web Apps Deployment Guide

This guide will walk you through deploying your React portfolio to Azure Static Web Apps.

## Prerequisites

- Azure account (free tier available)
- Node.js installed (already in your project)
- Git installed

## Deployment Steps

### Option 1: Deploy via Azure Portal (Recommended for beginners)

1. **Build your project locally first:**
   ```bash
   npm run build
   ```

2. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Azure deployment"
   git push origin main
   ```

3. **Create a Static Web App in Azure Portal:**
   - Go to [Azure Portal](https://portal.azure.com)
   - Click "Create a resource" → "Web" → "Static Web App"
   - Fill in the details:
     - **Subscription**: Your Azure subscription
     - **Resource Group**: Create new or use existing
     - **Name**: Unique name (e.g., `mukesh-pal-portfolio`)
     - **Region**: Choose closest to your users
   - Click "Next: Build & Deploy"

4. **Connect your GitHub repository:**
   - **Source**: GitHub
   - **Organization**: Select your GitHub org
   - **Repository**: Select your portfolio repo
   - **Branch**: main/master
   - **Build Presets**: Custom
   - **App Location**: `/` (root)
   - **Output Location**: `dist`
   - **API Location**: Leave blank (no API needed)

5. **Click "Review + Create"** then "Create"

6. **Once deployed**, your app will be live at: `https://<your-app-name>.azurestaticapps.net`

### Option 2: Deploy via Azure Static Web Apps CLI

1. **Install the SWA CLI:**
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. **Login to Azure:**
   ```bash
   swa login
   ```

3. **Deploy:**
   ```bash
   swa deploy --env production
   ```

## Configuration Details

Your project includes `azure-static-web-apps-config.yaml` with:

- **Build command**: `npm run build`
- **Output location**: `dist`
- **SPA routing**: Configured to handle React Router
- **Custom 404**: Uses your existing 404.html
- **Base path**: Set to `./` for relative paths

## Environment Variables

If you're using Google Analytics or other services:

1. In Azure Portal, go to your Static Web App
2. Click "Environment variables"
3. Add your variables:
   - `VITE_GA_MEASUREMENT_ID`: Your Google Analytics ID
   - Any other VITE_ prefixed variables

## Custom Domain (Optional)

1. In Azure Portal, go to your Static Web App
2. Click "Custom domains"
3. Add your domain and follow DNS configuration steps

## SSL Certificate

Azure automatically provides free SSL certificates for both:
- The default `.azurestaticapps.net` domain
- Your custom domains

## CI/CD

GitHub Actions is automatically configured when you deploy via GitHub. Every push to your main branch will trigger an automatic rebuild and deployment.

## Troubleshooting

### Build fails in Azure but works locally
- Check that all dependencies are in `package.json`
- Ensure `npm run build` works locally
- Check Azure build logs in the portal

### Routing issues (404 on page refresh)
- The config file already handles this with SPA routing
- All routes redirect to index.html

### Assets not loading
- Vite config is set to use relative paths (`base: './'`)
- Assets should load correctly from any route

## Cost

Azure Static Web Apps offers:
- **Free tier**: Perfect for portfolios and small apps
- Includes hosting, bandwidth, and SSL
- No credit card required for free tier

## Next Steps

After deployment:
1. Test all pages and routes
2. Verify analytics tracking
3. Share your live portfolio URL!
4. Monitor usage in Azure Portal

---

**Note**: The `server.js` file in your project is for local development only. Azure Static Web Apps doesn't support Node.js backend - it's a static hosting service. Your portfolio is purely frontend, so it works perfectly!
