# 🚀 Migration Guide: Netlify → GitHub Pages

## ✅ What's Been Configured:

1. ✅ GitHub Actions workflow created (`.github/workflows/github-pages.yml`)
2. ✅ CNAME file created for custom domain (`public/CNAME`)
3. ✅ Vite config ready for custom domain

---

## 📋 **Steps to Complete Migration:**

### **Step 1: Enable GitHub Pages in Repository Settings**

1. Go to your repository: https://github.com/mukprabhakar/Resume--Portfilio
2. Click **Settings** tab
3. Click **Pages** in left sidebar
4. Under **Source**, select: **GitHub Actions**
5. That's it! The workflow will handle deployments

---

### **Step 2: Configure Custom Domain (mukprabhakar.in)**

#### **A. In GitHub:**
1. Go to **Settings → Pages**
2. Under **Custom domain**, enter: `mukprabhakar.in`
3. Click **Save**
4. Check **Enforce HTTPS** (wait for SSL to activate)

#### **B. In Hostinger (DNS Settings):**
1. Log in to Hostinger
2. Go to **DNS Management** for `mukprabhakar.in`
3. **Remove** old Netlify DNS records
4. **Add** these DNS records:

```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600

Type: CNAME
Name: www
Value: mukprabhakar.github.io
TTL: 3600
```

---

### **Step 3: Deploy to GitHub Pages**

```bash
# Push the changes
git add .
git commit -m "Migrate from Netlify to GitHub Pages"
git push origin main
```

The GitHub Actions workflow will automatically:
1. Build your React app
2. Deploy to GitHub Pages
3. Connect your custom domain

---

### **Step 4: Wait for Deployment**

1. Go to **Actions** tab in your GitHub repo
2. Click on the running workflow
3. Wait for it to complete (2-3 minutes)
4. Visit: https://mukprabhakar.in

---

## 🔄 **Netlify vs GitHub Pages Comparison:**

| Feature | Netlify | GitHub Pages |
|---------|---------|--------------|
| **Cost** | Free | ✅ Free |
| **Bandwidth** | 100GB/month | ✅ Unlimited |
| **Build Minutes** | 300/month | ✅ Unlimited |
| **Custom Domain** | ✅ Yes | ✅ Yes |
| **SSL** | ✅ Auto | ✅ Auto |
| **CI/CD** | Built-in | GitHub Actions |
| **Forms** | ✅ Netlify Forms | ❌ Use Formspree |
| **Functions** | ✅ Serverless | ❌ Need backend |
| **Deploy Time** | ~1 min | ~2-3 min |
| **Ease of Use** | Easy | Very Easy |

---

## ⚠️ **Important Notes:**

### **What You'll Lose:**
- ❌ Netlify Forms (already using Formspree ✓)
- ❌ Netlify Analytics (use Google Analytics ✓)
- ❌ Netlify serverless functions (not needed for static site)

### **What You'll Gain:**
- ✅ **Unlimited bandwidth**
- ✅ **Unlimited build minutes**
- ✅ **100% free forever**
- ✅ **Simpler workflow**
- ✅ **Everything in GitHub**

---

## 🧪 **Testing After Migration:**

1. **Visit**: https://mukprabhakar.in
2. **Check**:
   - ✅ All pages load correctly
   - ✅ Blog posts work
   - ✅ Contact form works (Formspree)
   - ✅ Custom domain works
   - ✅ HTTPS is enabled
   - ✅ No 404 errors

---

## 🔧 **Troubleshooting:**

### **Site Not Loading?**
1. Check Actions tab for build errors
2. Wait 5-10 minutes for DNS propagation
3. Clear browser cache

### **Custom Domain Not Working?**
1. Verify DNS records in Hostinger
2. Check CNAME file exists in `public/CNAME`
3. Wait up to 24 hours for DNS propagation

### **404 Errors on Routes?**
GitHub Pages handles SPAs differently. If you get 404s:
1. Create `public/404.html` with redirect script
2. Or use hash routing instead of browser routing

---

## 📊 **After Migration Checklist:**

- [ ] GitHub Pages enabled in settings
- [ ] DNS records updated in Hostinger
- [ ] Custom domain configured
- [ ] HTTPS enabled
- [ ] Site loads at https://mukprabhakar.in
- [ ] All routes work
- [ ] Blog posts load
- [ ] Contact form works
- [ ] Google Search Console updated (if needed)

---

## 🎯 **Ready to Deploy?**

Run these commands:

```bash
git add .
git commit -m "Migrate from Netlify to GitHub Pages"
git push origin main
```

Then configure DNS in Hostinger and you're done! 🎉
