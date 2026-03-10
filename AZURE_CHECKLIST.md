# Azure Static Web Apps - Quick Deployment Checklist

## ✅ Pre-Deployment Checklist

- [ ] Code is pushed to GitHub (main/master branch)
- [ ] `npm run build` runs successfully locally
- [ ] All dependencies are listed in package.json
- [ ] Environment variables are documented (if any)
- [ ] Azure account is active

## 📋 Required Files

These files have been created for you:

- ✅ `azure-static-web-apps-config.yaml` - Azure configuration
- ✅ `.github/workflows/azure-static-web-apps.yml` - CI/CD workflow
- ✅ `AZURE_DEPLOYMENT.md` - Detailed deployment guide
- ✅ Updated `vite.config.js` - Configured for static hosting
- ✅ Updated `package.json` - Cleaned up scripts
- ✅ Updated `README.md` - Added Azure deployment info

## 🚀 Deployment Steps (Quick Reference)

### Step 1: Build Locally
```bash
npm run build
```
✅ Verify no errors and dist/ folder is created

### Step 2: Push to GitHub
```bash
git add .
git commit -m "Configure for Azure Static Web Apps"
git push origin main
```

### Step 3: Create Azure Static Web App

**Via Azure Portal:**
1. Go to https://portal.azure.com
2. Create a resource → Static Web App
3. Fill in details:
   - Name: `mukesh-pal-portfolio` (or unique name)
   - Region: Choose closest to your location
4. Connect GitHub repository
5. Configure build:
   - Source: GitHub
   - Repository: Your portfolio repo
   - Branch: main
   - App Location: `/`
   - Output Location: `dist`
   - API Location: (leave blank)

### Step 4: Deploy

Azure will automatically:
- Clone your repository
- Run `npm install`
- Run `npm run build`
- Deploy the `dist` folder

### Step 5: Verify Deployment

Your site will be live at:
```
https://<your-app-name>.azurestaticapps.net
```

Test:
- [ ] Homepage loads
- [ ] All sections scroll properly
- [ ] Contact form works
- [ ] Projects display correctly
- [ ] Skills chart renders
- [ ] Mobile responsive
- [ ] No console errors

## 🔧 Environment Variables (If Needed)

Add these in Azure Portal → Your Static Web App → Environment variables:

- `VITE_GA_MEASUREMENT_ID` - Google Analytics ID (if using)

## 🎯 Custom Domain (Optional)

1. Azure Portal → Custom domains
2. Add your domain
3. Update DNS records as instructed
4. SSL certificate is auto-provisioned

## 🐛 Troubleshooting

**Build fails in Azure:**
- Check Azure build logs
- Verify `npm run build` works locally
- Ensure all dependencies in package.json

**404 on page refresh:**
- Already handled in config file
- SPA routing configured correctly

**Assets not loading:**
- Vite config uses relative paths
- Should work from any route

## 💰 Cost

- **Free tier available** - Perfect for portfolios
- Includes: Hosting, bandwidth, SSL certificate
- No credit card required for free tier

## 📊 Monitoring

After deployment:
- Monitor in Azure Portal
- View analytics in Google Analytics
- Check Application Insights (if enabled)

---

**Need Help?** See [AZURE_DEPLOYMENT.md](AZURE_DEPLOYMENT.md) for detailed instructions.
