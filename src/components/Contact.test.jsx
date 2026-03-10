import { render, screen, waitFor } from '@testing-library/react';
import Contact from './Contact';
import '@testing-library/jest-dom';

// Mock emailjs/browser
jest.mock('@emailjs/browser', () => ({
  send: jest.fn(() => Promise.resolve({ text: 'Success' }))
}));

// Mock analytics
jest.mock('../utils/analytics', () => ({
  trackEvent: jest.fn()
}));

describe('Contact Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders contact form correctly', () => {
    render(<Contact />);
    
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('displays validation errors for empty fields', async () => {
    render(<Contact />);
    
   const sendButton = screen.getByRole('button', { name: /send message/i });
    sendButton.click();
    
    // Wait for validation to trigger
    await waitFor(() => {
     const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        if (input.hasAttribute('required')) {
          expect(input).toHaveAttribute('aria-invalid', 'true');
        }
      });
    });
  });

  it('handles form submission successfully', async () => {
   const { send } = require('@emailjs/browser');
    render(<Contact />);
    
   const nameInput = screen.getByPlaceholderText(/name/i);
   const emailInput = screen.getByPlaceholderText(/email/i);
   const messageInput = screen.getByPlaceholderText(/message/i);
    
    // Fill out the form
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';
    messageInput.value = 'Test message';
    
   const sendButton = screen.getByRole('button', { name: /send message/i });
    sendButton.click();
    
    // Wait for form submission
    await waitFor(() => {
      expect(send).toHaveBeenCalledWith(
        expect.any(String), // serviceID
        expect.any(String), // templateID
        expect.objectContaining({
         user_name: 'John Doe',
         user_email: 'john@example.com',
          message: 'Test message'
        }),
        expect.any(String) // publicKey
      );
    });
  });

  it('shows success message after form submission', async () => {
    render(<Contact />);
    
   const nameInput = screen.getByPlaceholderText(/name/i);
   const emailInput = screen.getByPlaceholderText(/email/i);
   const messageInput = screen.getByPlaceholderText(/message/i);
    
    nameInput.value = 'Jane Doe';
    emailInput.value = 'jane@example.com';
    messageInput.value = 'Hello!';
    
   const sendButton = screen.getByRole('button', { name: /send message/i });
    sendButton.click();
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });
  });

  it('handles form submission error', async () => {
   const { send } = require('@emailjs/browser');
    send.mockRejectedValueOnce(new Error('Failed to send'));
    
    render(<Contact />);
    
   const nameInput = screen.getByPlaceholderText(/name/i);
   const emailInput = screen.getByPlaceholderText(/email/i);
   const messageInput = screen.getByPlaceholderText(/message/i);
    
    nameInput.value = 'Error Test';
    emailInput.value = 'error@example.com';
    messageInput.value = 'This will fail';
    
   const sendButton = screen.getByRole('button', { name: /send message/i });
    sendButton.click();
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
    });
  });

  it('tracks analytics events', async () => {
   const { trackEvent } = require('../utils/analytics');
    render(<Contact />);
    
   const sendButton = screen.getByRole('button', { name: /send message/i });
    sendButton.click();
    
    await waitFor(() => {
      expect(trackEvent).toHaveBeenCalledWith(
        'Contact Form',
        'Submit',
        'Form Submission Attempt'
      );
    });
  });
});
