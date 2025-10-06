# Azure Deployment Guide for React Portfolio

This guide will walk you through deploying your React portfolio to Microsoft Azure using Azure Static Web Apps, which is the most cost-effective and straightforward option for static React applications.

## Prerequisites

1. **Azure Account**: Create a free account at [Azure Portal](https://portal.azure.com/) if you don't have one already
2. **GitHub Account**: Your portfolio code should be hosted on GitHub
3. **Node.js**: Ensure Node.js is installed locally (version 14 or higher)
4. **Azure CLI** (optional): For advanced deployment scenarios

## Deployment Options

Azure offers several ways to deploy your React application. We recommend **Azure Static Web Apps** for the following reasons:
- Free tier available
- Custom domain support
- Automatic HTTPS
- Global CDN
- Easy CI/CD integration with GitHub

## Method 1: Deploy with GitHub Actions (Recommended)

### Step 1: Prepare Your Repository

1. Ensure your portfolio code is pushed to a GitHub repository
2. Your repository should have the following structure:
   ```
   portfolio-react/
   ├── src/
   ├── public/
   ├── package.json
   ├── vite.config.js
   └── ...
   ```

### Step 2: Build Configuration

Create a `staticwebapp.config.json` file in the root of your project:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  },
  "responseOverrides": {
    "401": {
      "redirect": "/login"
    }
  }
}
```

### Step 3: Create Azure Static Web App

1. Go to the [Azure Portal](https://portal.azure.com/)
2. Click **Create a resource**
3. Search for **Static Web App** and select it
4. Click **Create**

### Step 4: Configure Static Web App

Fill in the following details:
- **Subscription**: Your Azure subscription
- **Resource Group**: Create new or use existing
- **Name**: Choose a unique name for your app
- **Region**: Select the region closest to your audience
- **SKU**: Free (or Standard for custom domains)

### Step 5: Connect to GitHub

1. Sign in with your GitHub account
2. Select your organization/user
3. Select your portfolio repository
4. Select the branch to deploy (usually `main` or `master`)

### Step 6: Configure Build

Set these build configuration values:
- **Build Preset**: Custom
- **App location**: `/` (root of repository)
- **Output location**: `dist` (where Vite builds the app)
- **App build command**: `npm run build`

### Step 7: Review + Create

1. Review all settings
2. Click **Create**

Azure will now deploy your application using GitHub Actions. You can monitor the deployment progress in:
- Azure Portal → Your Static Web App → Overview
- GitHub → Your repository → Actions tab

## Method 2: Manual Deployment using Azure CLI

### Step 1: Install Azure CLI

Download and install the Azure CLI from [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

### Step 2: Login to Azure

```bash
az login
```

### Step 3: Build Your Application

```bash
cd portfolio-react
npm run build
```

This creates a production build in the `dist/` folder.

### Step 4: Deploy Using Azure CLI

```bash
az webapp up \
  --resource-group <your-resource-group> \
  --name <your-app-name> \
  --plan <your-plan-name> \
  --location <your-location> \
  --html
```

## Method 3: Deploy Using Azure Storage Static Website

### Step 1: Create Storage Account

1. In Azure Portal, create a new Storage Account
2. Enable "Static website" in the Storage Account settings
3. Set "Index document name" to `index.html`
4. Set "Error document path" to `index.html`

### Step 2: Build and Upload

```bash
# Build your app
cd portfolio-react
npm run build

# Install Azure Storage Explorer or use Azure CLI
# Upload all contents of the dist/ folder to $web container
```

## Custom Domain Configuration

To use your custom domain with Azure Static Web Apps:

1. In Azure Portal, go to your Static Web App
2. Navigate to **Custom domains**
3. Click **Add**
4. Follow the instructions to:
   - Verify domain ownership
   - Configure DNS records (CNAME or A records)

Azure automatically provides HTTPS for custom domains.

## Environment Variables

If your portfolio uses environment variables:

1. In Azure Portal, go to your Static Web App
2. Navigate to **Configuration**
3. Add application settings for your environment variables

Note: These will be build-time environment variables since this is a static site.

## CI/CD with GitHub Actions

The GitHub Actions workflow created by Azure Static Web Apps automatically deploys your app when you push to the configured branch. The workflow file is located at `.github/workflows/azure-static-web-apps-*.yml`.

To customize the workflow:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - name: Build And Deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          output_location: "dist"
          app_build_command: "npm run build"
        env:
          # Add environment variables here if needed
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
```

## Troubleshooting

### Common Issues

1. **Blank page after deployment**
   - Ensure `staticwebapp.config.json` is properly configured
   - Check that routing fallback is set to `index.html`

2. **404 errors on page refresh**
   - Add navigation fallback to `staticwebapp.config.json`:
     ```json
     {
       "navigationFallback": {
         "rewrite": "/index.html"
       }
     }
     ```

3. **Environment variables not working**
   - Static sites can only use build-time environment variables
   - Prefix with `VITE_` for Vite applications

4. **Build failures**
   - Check GitHub Actions logs for detailed error messages
   - Ensure all dependencies are in `package.json`

### Monitoring

1. In Azure Portal, go to your Static Web App
2. Navigate to **Monitoring** for:
   - Application logs
   - Response times
   - Traffic metrics

## Cost Considerations

**Azure Static Web Apps Free Tier** includes:
- 2 custom domains
- 5GB storage
- 250,000 requests per month
- Global CDN
- Automatic HTTPS

For most portfolios, the free tier is sufficient. If you need more resources, consider upgrading to the Standard tier.

## Best Practices

1. **Optimize Build Size**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

2. **Add Meta Tags for SEO**
   Update `index.html` with proper meta tags:
   ```html
   <meta name="description" content="Mukesh Pal - Software Developer Portfolio">
   <meta name="keywords" content="Software Developer, React, Portfolio">
   ```

3. **Enable Gzip Compression**
   Azure Static Web Apps automatically compresses assets

4. **Set Cache Headers**
   Configure in `staticwebapp.config.json`:
   ```json
   {
     "responseHeaders": {
       "Cache-Control": "public, max-age=31536000"
     }
   }
   ```

## Conclusion

Azure Static Web Apps is the best option for deploying your React portfolio due to its simplicity, cost-effectiveness, and built-in features. Once deployed, your portfolio will be accessible via a secure HTTPS URL with global CDN distribution.

For any issues during deployment, check:
1. GitHub Actions workflow logs
2. Azure Portal deployment center
3. Browser developer tools for client-side errors