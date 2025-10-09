# Google Analytics Tracking Implementation

This document provides a comprehensive overview of the Google Analytics tracking implementation across the portfolio website.

## Overview

Google Analytics has been implemented to track all user activities across the portfolio website. The implementation includes tracking page views, user interactions, form submissions, social media clicks, and navigation events.

## Tracking Structure

All tracking events follow a consistent structure:
- **Action**: The type of interaction (click, submit, view, etc.)
- **Category**: The section or component where the interaction occurred
- **Label**: A descriptive label for the specific interaction

## Component Tracking Details

### Header Component
- Mobile menu toggle
- Navigation to sections
- Logo clicks
- Route link clicks
- External link clicks
- Internal link clicks

### Hero Component
- "View Projects" button click
- "Get In Touch" button click
- Scroll indicator click

### About Component
- Tab switches
- Skill category switches
- External profile link clicks

### Skills Component
- Skill filter clicks
- Skill card interactions

### Projects Component
- Project filter clicks
- Project modal opens
- GitHub link clicks (in project cards and modals)
- Demo link clicks (in project cards and modals)

### Experience Component
- Timeline navigation
- Experience item clicks

### Achievements Component
- Achievement filter clicks
- Certification view clicks

### Testimonials Component
- Testimonial navigation
- Social proof link clicks

### Blog Component
- Blog post searches
- Blog post filtering
- Blog post views
- External blog link clicks

### Profile Component
- Profile tab switches
- External profile link clicks

### Contact Component
- Form field interactions
- Form submission attempts
- Successful form submissions
- Form submission errors
- Contact information clicks
- Social media link clicks

### Footer Component
- Quick link clicks
- Social media link clicks
- Back to top button clicks

### GitHub Stats Component
- Tab switches (Overview, Achievements, Contributions, Projects)
- Repository search interactions
- Follower profile clicks
- Following profile clicks
- Repository link clicks
- "View full GitHub profile" link click

### Coding Challenges Component
- Platform profile link clicks (LeetCode, GFG, CodeChef, HackerRank)

### Credly Badges Component
- Individual badge view clicks
- "View all badges on Credly" link click

## Utility Functions

The implementation uses the following utility functions from `src/utils/analytics.js`:

1. `trackEvent(action, category, label, value)` - Tracks custom events
2. `trackPageView(path, title)` - Tracks page views
3. `trackSocial(network, action, target)` - Tracks social interactions

## Environment Configuration

The Google Analytics implementation uses environment variables for configuration:

- `VITE_GA_MEASUREMENT_ID`: The Google Analytics 4 Measurement ID

### How to Obtain Your VITE_GA_MEASUREMENT_ID

1. **Sign in to Google Analytics**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Sign in with your Google account

2. **Create a New Property (if you don't have one)**
   - Click on "Admin" in the lower left corner
   - In the "Property" column, click "Create Property"
   - Select "Web" as the platform
   - Enter your website name and URL
   - Select your reporting time zone and currency
   - Click "Next" and complete the setup

3. **Find Your Measurement ID**
   - In the "Admin" section, select your property
   - In the "Property" column, click "Data Streams"
   - Select your data stream (or create one if needed)
   - Your Measurement ID will be displayed at the top (format: G-XXXXXXXXXX)

4. **Configure the Environment Variable**
   - Create a `.env` file in your project root directory (copy from `.env.example`)
   - Add your Measurement ID to the file:
     ```
     VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
     ```
   - The tracking will automatically work in production builds

## Implementation Notes

1. All tracking events are non-blocking and do not affect user experience
2. Tracking is only active when the Google Analytics script is loaded
3. Events are categorized for easy analysis in Google Analytics reports
4. Sensitive information is never tracked
5. All external link clicks are tracked with appropriate labeling

## Data Collection

The implementation collects the following types of data:

1. Page views and navigation paths
2. User interactions with UI elements
3. Form submission behavior
4. Social media engagement
5. Content engagement (projects, blog posts, etc.)
6. Technical information (browser, device, location)

## Privacy Considerations

This implementation follows privacy best practices:
- No personally identifiable information (PII) is tracked
- All tracking is anonymous
- Users can opt out through browser settings
- Compliance with GDPR and other privacy regulations is maintained