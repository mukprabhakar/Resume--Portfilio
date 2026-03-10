# 🚀 Quick Start - Deploy to Azure in 5 Minutes

## ⚡ Super Fast Deployment (3 Steps)

### Step 1: Push to GitHub (1 minute)

```bash
# Add all changes
git add .

# Commit
git commit -m "Ready for Azure deployment"

# Push to main branch
git push origin main
```

### Step 2: Create Azure Static Web App (3 minutes)

1. **Go to Azure Portal**: https://portal.azure.com

2. **Create Resource**: 
   - Click "Create a resource"
   - Search "Static Web Apps"
   - Click "Create"

3. **Fill Details**:
   ```
   Subscription: Your Azure subscription
   Resource Group: Create new (e.g., "portfolio-rg")
   Name: mukesh-pal-portfolio (or any unique name)
   Region: Choose closest to you
   ```

4. **Connect GitHub**:
   ```
   Source: GitHub
   Organization: Your GitHub org
   Repository: portfolio-react
   Branch: main
   ```

5. **Configure Build**:
   ```
   Build Presets: Custom
   App Location: /
   Output Location: dist
   API Location: (leave blank)
   ```

6. **Click**: "Review + Create" → "Create"

### Step 3: Done! (1 minute)

Azure will automatically:
- ✅ Clone your repository
- ✅ Install dependencies
- ✅ Build your app
- ✅ Deploy globally

**Your live URL**: `https://<your-app-name>.azurestaticapps.net`

---

## 🎯 That's It!

Your portfolio is now live on Azure's global CDN with:
- ⚡ Automatic HTTPS
- 🌍 Global distribution
- 🔄 Auto-deploy on git push
- 💰 Free tier

---

## 🔍 Verify Deployment

Visit your URL and check:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] No console errors

---

## 📱 Test Locally Before Deploying (Optional)

```bash
# See what users will see
npm run preview
```

---

## 🆘 Troubleshooting

**Build failed?**
- Check Azure build logs in portal
- Run `npm run build` locally to test

**Site not loading?**
- Wait 2-3 minutes after deployment
- Clear browser cache
- Check GitHub Actions for status

**Need detailed help?**
- See [AZURE_DEPLOYMENT.md](AZURE_DEPLOYMENT.md)
- Or [AZURE_CHECKLIST.md](AZURE_CHECKLIST.md)

---

## 🎉 Share Your Portfolio!

Once deployed, share your Azure URL on:
- LinkedIn
- Resume
- Email signature
- Social media

**Good luck! 🚀**
