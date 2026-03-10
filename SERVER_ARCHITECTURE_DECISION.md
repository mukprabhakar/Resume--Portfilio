# Server Architecture Decision Record

## Status: **DEPRECATED - NOT USED IN PRODUCTION**

## Overview

The `server.js` file was created to provide backend API endpoints for fetching coding statistics from LeetCode, GeeksforGeeks, and other platforms. However, **this server cannot run in Azure Static Web Apps** environment.

## Current State

### What Works ✅
- **Client-side services** (`src/services/codingStatsService.js`) directly call public APIs
- LeetCode stats: Uses `https://leetcode-stats-api.herokuapp.com/` (CORS-enabled)
- GFG stats: Uses mock data (no public CORS-enabled API available)
- CodeChef/HackerRank: Uses mock data with proper structure

### What Doesn't Work ❌
- `server.js` **does NOT run** in Azure Static Web Apps
- Backend scraping endpoints are never executed in production
- Components use fallback/mock data instead of live scraped data

## Architecture Decision

**Decision**: Keep `server.js` for reference only, but rely entirely on client-side services.

### Rationale
1. **Azure Static Web Apps** only serves static files (HTML, CSS, JS)
2. No Node.js runtime available in the hosting environment
3. Client-side services already implemented and working
4. Moving to full-stack hosting would add complexity and cost

## Implementation Details

### Active Code (Used in Production)
```javascript
// src/services/codingStatsService.js - THIS IS WHAT'S USED
export const fetchLeetCodeStats = async (username) => {
  // Direct API call - works from browser
  const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
 return response.json();
};

export const fetchGFGStats = async (username) => {
  // Returns mock data - no CORS-enabled public API exists
 return {
    problemsSolved: 95,
    schoolProblems: 10,
    // ... etc
  };
};
```

### Inactive Code (Development Only)
```javascript
// server.js - NOT USED IN PRODUCTION
app.get('/api/leetcode/:username', async (req, res) => {
  // This code never runs in Azure Static Web Apps
  // Kept only for reference/local development
});
```

## Components Using Coding Stats

1. **CodingChallenges.jsx** - Displays LeetCode, GFG, CodeChef, HackerRank stats
2. **Achievements.jsx** - Shows problem-solving achievements
3. Both components import from `src/services/codingStatsService.js` (client-side)

## Future Options

### Option 1: Keep Current Approach (RECOMMENDED)
- Continue using client-side services with mock data
- No backend complexity
- Free hosting on Azure Static Web Apps
- **Pros**: Simple, free, works
- **Cons**: Some data is static/mock

### Option 2: Add Azure Functions (IF NEEDED)
- Create serverless functions for specific API endpoints
- Deploy separately from static site
- Update services to call Azure Functions URLs
- **Pros**: Dynamic data, scalable
- **Cons**: Added complexity, potential costs

### Option 3: Migrate to Full-Stack Hosting
- Move to Vercel, Netlify Pro, or Azure App Service
- Deploy both frontend and backend together
- **Pros**: Full functionality
- **Cons**: Higher cost, more complex deployment

## Environment Variables

No backend environment variables needed for current setup.

If adding Azure Functions later:
```env
VITE_BACKEND_API_URL=https://your-function-app.azurewebsites.net/api
```

## Verification

To verify the server is not being used:
1. Build the project: `npm run build`
2. Check output - `server.js` is NOT included in `dist/` folder
3. Deploy to Azure Static Web Apps
4. Site works perfectly without `server.js`

## Maintenance Notes

- **DO NOT DELETE** `server.js` - it's useful for local development reference
- **DO NOT MODIFY** unless you plan to deploy separate backend
- **UPDATE THIS DOCUMENT** if architecture decisions change

## Related Files

- `src/services/codingStatsService.js` - Active client-side service
- `src/components/CodingChallenges.jsx` - Uses coding stats
- `src/components/Achievements.jsx` - Uses coding stats
- `.github/workflows/azure-static-web-apps-*.yml` - Deployment config (no server)

## Conclusion

The portfolio successfully operates as a **purely static site** with client-side API calls. The `server.js` file remains in the repository for:
- Historical reference
- Local development experimentation
- Documentation of intended backend functionality

**Current Production Architecture**: Static React App → Public APIs (CORS-enabled) → Mock Data fallbacks

---

**Last Updated**: March 10, 2026  
**Status**: ✅ Working as designed - No action required
