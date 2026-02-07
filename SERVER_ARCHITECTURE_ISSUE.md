# Server Architecture Issue & Recommendations

## Problem Identified

The current portfolio application includes a `server.js` file that provides backend functionality for:
- Fetching LeetCode statistics
- Fetching GeeksforGeeks statistics
- Combined coding stats endpoint

However, **Azure Static Web Apps does not support server-side rendering or Node.js backend services**. The `server.js` file cannot be executed in the Azure Static Web Apps environment.

## Impact

- The API endpoints in `server.js` will not be accessible in production
- Components relying on these endpoints (e.g., `CodingChallenges.jsx`, `GitHubStats.jsx`) may fail to retrieve dynamic data
- The application may appear broken to users

## Recommended Solutions

### Option 1: Remove Backend Functionality (Recommended for Static Sites)

Since this is a portfolio site, consider using client-side solutions or third-party APIs directly:

1. Update `services/codingStatsService.js` to call public APIs directly
2. Remove the `server.js` file
3. Update components to handle potential CORS issues with direct API calls

### Option 2: Separate Backend Services

Move the backend functionality to a separate service:

1. Deploy the backend using Azure Functions, Azure Container Instances, or another cloud provider
2. Update frontend to call the external backend API
3. Keep the static frontend on Azure Static Web Apps

### Option 3: Migrate to Full-Stack Hosting

Consider moving to a hosting solution that supports full-stack applications:

- **Azure App Service**: Supports Node.js applications with frontend and backend
- **AWS Elastic Beanstalk**: Flexible deployment for full-stack applications  
- **Vercel/Netlify with Serverless Functions**: Static frontend with serverless backend functions

## Implementation Steps (Option 1 - Recommended)

1. Update `src/services/codingStatsService.js` to call public APIs directly:

```javascript
// Direct API calls instead of proxy through server.js
export const fetchLeetCodeStats = async (username) => {
  const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
  return response.json();
};

export const fetchGFGStats = async (username) => {
  // Note: GFG doesn't have a public API, so you'd need to implement client-side scraping
  // or use a different approach like storing static data
};
```

2. Remove `server.js` file if backend functionality is not critical
3. Update components to handle fallback data when API calls fail

## Environment Configuration

If you choose to keep some backend functionality separately, update your environment configuration:

1. Add backend API URL to `.env`:
   ```
   VITE_BACKEND_API_URL=https://your-backend-service.azurewebsites.net/api
   ```

2. Update components to use the environment variable:
   ```javascript
   const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001/api';
   ```

## Migration Path

1. **Immediate**: Document the limitation and inform users about the backend functionality
2. **Short-term**: Implement fallback solutions for missing backend features
3. **Long-term**: Decide on the best architectural approach based on your needs

Choose the option that best fits your portfolio's requirements and hosting preferences.