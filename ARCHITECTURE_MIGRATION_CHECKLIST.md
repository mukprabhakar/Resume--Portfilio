# Architecture Migration Checklist

## Purpose
This checklist helps ensure a smooth transition from the current mixed frontend/backend architecture to a pure static site that works with Azure Static Web Apps.

## Pre-Migration Tasks

- [ ] Review all components that depend on server.js endpoints
- [ ] Identify which backend features are essential vs. nice-to-have
- [ ] Document current API endpoints and their functionality
- [ ] Evaluate third-party APIs that can replace backend functionality

## Migration Steps

### 1. Update Coding Statistics Components
- [ ] Modify `CodingChallenges.jsx` to use direct API calls instead of local server endpoints
- [ ] Update error handling to gracefully degrade when APIs are unavailable
- [ ] Add fallback to cached/stored data when live data isn't available

### 2. Review Data Flow
- [ ] Identify components that make API calls to server.js
- [ ] Update service calls to use external APIs directly where possible
- [ ] Implement local storage or static data as fallbacks

### 3. Update Environment Configuration
- [ ] Add any necessary API keys or tokens to environment variables
- [ ] Update the `.env.example` file with new configuration requirements

### 4. Testing
- [ ] Test all components locally to ensure functionality
- [ ] Verify that fallback mechanisms work when external APIs are unavailable
- [ ] Confirm that the build process completes without errors

## Components to Review

### High Priority
- [ ] `CodingChallenges.jsx` - Depends on server.js for coding stats
- [ ] `GitHubStats.jsx` - May have backend dependencies
- [ ] `Profile.jsx` - May have backend dependencies

### Medium Priority
- [ ] `Contact.jsx` - Formspree integration (already works with static sites)
- [ ] All components using analytics - Should continue to work

## API Migration Strategy

### LeetCode Stats
- Current: `fetch('/api/leetcode/username')` → server.js → external API
- New: `fetch('https://leetcode-stats-api.herokuapp.com/username')` (direct)

### GFG Stats
- Current: `fetch('/api/gfg/username')` → server.js → scraper
- New: Use static data or find alternative API

### Other Platforms
- Consider using static data or alternative public APIs

## Verification Steps

1. **Local Testing**
   - Run `npm run build` to ensure build process works
   - Run `npm run preview` to test production build locally
   - Verify all components render correctly

2. **Deployment Testing**
   - Push changes to a test branch
   - Verify deployment succeeds in GitHub Actions
   - Check deployed site functionality

3. **Component Testing**
   - Verify coding statistics display (with fallbacks if needed)
   - Confirm contact form still works
   - Test all interactive elements

## Rollback Plan

If issues occur after migration:
1. Revert to the last known working commit
2. The previous architecture with server.js will continue to work locally
3. But note that server.js will still not function in Azure Static Web Apps

## Additional Considerations

- Consider implementing service workers for offline functionality
- Plan for API rate limits with external services
- Think about caching strategies for external API data
- Evaluate if Azure Functions could supplement static site (hybrid approach)

## Success Criteria

- [ ] Site builds successfully with `npm run build`
- [ ] All GitHub Actions workflows pass
- [ ] No server-side dependencies remain
- [ ] Essential functionality preserved
- [ ] Graceful degradation implemented for unavailable features
- [ ] Performance remains acceptable