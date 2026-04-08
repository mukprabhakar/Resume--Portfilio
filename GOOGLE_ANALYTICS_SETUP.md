# Google Analytics 4 (GA4) Setup Guide

## 📊 Step-by-Step Instructions

### **Step 1: Create Google Analytics Account**

1. Go to [https://analytics.google.com/](https://analytics.google.com/)
2. Click **"Start measuring"**
3. Sign in with your Google account

### **Step 2: Set Up Property**

1. **Account name**: `Mukesh Pal Portfolio`
2. Click **Next**

3. **Property name**: `mukprabhakar.in`
4. **Reporting time zone**: `(GMT+05:30) India Standard Time`
5. Click **Next**

### **Step 3: Business Details**

1. **Industry category**: `Technology` or `Education`
2. **Business size**: `1-10` (or your preference)
3. Click **Next**

### **Step 4: Choose Business Objectives**

Select all that apply:
- ✅ Generate leads
- ✅ Drive online sales
- ✅ Understand user behavior
- ✅ Get benchmarking insights

Click **Create**

### **Step 5: Get Your Measurement ID**

1. After creating, you'll see your **Measurement ID**
2. It looks like: `G-XXXXXXXXXX`
3. **Copy this ID** - you'll need it!

### **Step 6: Add to Your Project**

1. Open your `.env` file in the project root
2. Add this line (replace with your actual ID):

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

3. **Important**: The variable MUST start with `VITE_` for Vite to recognize it

### **Step 7: Update index.html**

Your `index.html` is already configured! Just make sure the Measurement ID is set in `.env`.

The existing code will automatically use `window.GA_MEASUREMENT_ID`.

### **Step 8: Verify Installation**

1. Build and deploy your site:
   ```bash
   npm run build
   git add -A
   git commit -m "chore: Add Google Analytics configuration"
   git push origin main
   ```

2. Wait 2-3 minutes for deployment

3. Visit your site: `https://mukprabhakar.in/`

4. In Google Analytics:
   - Go to **Reports** → **Realtime**
   - You should see **1 active user** (you!)

### **Step 9: Configure Custom Events**

Your portfolio already tracks:
- ✅ Page views
- ✅ Navigation clicks
- ✅ Section views
- ✅ Form submissions
- ✅ External link clicks
- ✅ Mobile menu toggles

### **Step 10: Set Up Goals (Optional)**

1. In Google Analytics, go to **Admin** → **Goals**
2. Create goals for:
   - Contact form submissions
   - Resume downloads
   - Time on site (>2 minutes)
   - Pages per session (>3)

---

## 🔍 Testing Your Setup

### **Browser Console Check:**

1. Open your site
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Type: `window.GA_MEASUREMENT_ID`
5. You should see your ID: `"G-XXXXXXXXXX"`

### **Network Tab Check:**

1. DevTools → **Network** tab
2. Filter by: `collect`
3. Refresh the page
4. You should see requests to `www.google-analytics.com`

### **Realtime Report:**

1. Google Analytics → **Reports** → **Realtime**
2. Visit your site in a new tab
3. You should see yourself as an active user

---

## 📈 Key Metrics to Monitor

- **Users**: Total visitors
- **Sessions**: Total visits
- **Bounce Rate**: % who leave after 1 page
- **Avg. Session Duration**: Time spent on site
- **Pages per Session**: How many pages viewed
- **Top Pages**: Most visited pages
- **Traffic Sources**: Where visitors come from
- **Device Category**: Mobile vs Desktop

---

## 🎯 Pro Tips

1. **Exclude your own traffic**: Create a filter for your IP address
2. **Set up alerts**: Get notified of traffic spikes/drops
3. **Use UTM parameters**: Track campaign performance
4. **Monitor Core Web Vitals**: Performance affects SEO
5. **Check monthly**: Review analytics regularly

---

## ❓ Troubleshooting

**No data showing?**
- Check `.env` file has correct ID
- Rebuild and redeploy
- Wait up to 24 hours for data to appear

**Realtime not working?**
- Clear browser cache
- Check ad blockers (disable them)
- Verify Measurement ID is correct

**Need help?**
- [Google Analytics Help Center](https://support.google.com/analytics/)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
