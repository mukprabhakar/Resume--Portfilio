# Formspree Setup Guide for Contact Form

To enable the contact form to send emails to your inbox, you'll need to set up Formspree. Follow these steps:

## 1. Create a Formspree Account

1. Go to [https://formspree.io/](https://formspree.io/)
2. Click "Get Started" or "Sign Up"
3. Complete the registration process with your email address

## 2. Create a New Form

1. After logging in, click on "Forms" in the dashboard
2. Click the "New Form" button
3. You'll be given a Form ID that looks like "xxyz123a" - note this down

## 3. Configure Your Form

1. In the form editor, you can:
   - Set up email notifications (your email is already pre-filled)
   - Customize confirmation messages
   - Set up redirect URLs after submission
   - Configure spam protection

## 4. Update the Contact Component

In your `src/components/Contact.jsx` file, replace the placeholder with your actual Formspree Form ID:

```javascript
// Replace this with your actual Formspree Form ID
const formId = 'your-actual-form-id' // e.g., 'xxyz123a'
```

## 5. Verify Your Email

1. Formspree will send a verification email to your inbox
2. Click the verification link to confirm your email address
3. This step is required for the form to work properly

## 6. Test the Form

1. Save all changes to your Contact component
2. Run your React application
3. Fill out the contact form and submit it
4. Check your email inbox to verify that you received the message

## Advanced Configuration

### Custom Fields
Formspree automatically captures any form fields you include. The current form includes:
- `name` - Sender's name
- `email` - Sender's email
- `message` - Message content

You can add more fields by:
1. Adding new input fields to your form JSX
2. Including them in your formData state
3. Adding them to the FormData object in handleSubmit

### Redirect After Submission
To redirect users after successful submission:
1. Go to your form settings in the Formspree dashboard
2. Find the "Redirect URL" setting
3. Enter the URL where you want users to be redirected (e.g., your portfolio homepage)

### Spam Protection
Formspree includes built-in spam protection:
- Honeypot fields
- Rate limiting
- Content filtering

You can adjust these settings in your form's "Settings" tab.

## Troubleshooting

If you encounter issues:

1. Check that your Form ID is correctly entered
2. Verify that your email is confirmed in Formspree
3. Check the browser console for any error messages
4. Make sure you have a stable internet connection
5. Ensure your form includes the correct field names

## Alternative: Environment Variables

For better security and easier configuration, you can store your Form ID in an environment variable:

1. Create a `.env` file in your project root
2. Add your Form ID:
   ```
   VITE_FORMSPREE_ID=your_form_id
   ```
3. Update the component to use:
   ```javascript
   const formId = import.meta.env.VITE_FORMSPREE_ID
   ```

This approach keeps your Form ID out of your source code and makes it easier to change between development and production environments.

## Benefits of Formspree

- No backend code required
- Free tier available (50 submissions per month)
- Built-in spam protection
- Easy setup and configuration
- Reliable email delivery
- No server maintenance required