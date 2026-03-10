import { render, screen } from '@testing-library/react';
import Hero from './Hero';
import '@testing-library/jest-dom';

// Mock analytics
jest.mock('../utils/analytics', () => ({
  trackEvent: jest.fn()
}));

describe('Hero Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders hero section with main heading', () => {
   render(<Hero />);
    
   expect(screen.getByText(/Hello, I'm/i)).toBeInTheDocument();
   expect(screen.getByText(/Mukesh Pal/i)).toBeInTheDocument();
  });

  it('displays role/title text', () => {
   render(<Hero />);
    
    // Check for common developer roles
   expect(screen.getByText(/Software Developer|Developer|Engineer/i)).toBeInTheDocument();
  });

  it('includes call-to-action buttons', () => {
   render(<Hero />);
    
    // Check for typical CTA buttons
   const buttons = screen.getAllByRole('button');
   expect(buttons.length).toBeGreaterThan(0);
    
    // Should have at least a contact or view projects button
   const hasContactButton = buttons.some(btn => 
      btn.textContent.toLowerCase().includes('contact')
    );
   const hasProjectsButton = buttons.some(btn => 
      btn.textContent.toLowerCase().includes('project')
    );
    
   expect(hasContactButton || hasProjectsButton).toBe(true);
  });

  it('has social media links', () => {
   render(<Hero />);
    
  const links = screen.getAllByRole('link');
    
    // Should have multiple social links
   expect(links.length).toBeGreaterThan(2);
    
    // Check for common social platforms
   const linkTexts = links.map(link => link.textContent.toLowerCase());
   const hasSocialLinks = 
      linkTexts.some(text => text.includes('github')) ||
      linkTexts.some(text => text.includes('linkedin'));
    
   expect(hasSocialLinks).toBe(true);
  });

  it('applies proper accessibility attributes', () => {
   render(<Hero />);
    
    // Main heading should be h1
   const mainHeading = screen.getByRole('heading', { level: 1 });
   expect(mainHeading).toBeInTheDocument();
    
    // Buttons should have accessible names
   const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
     expect(button).toHaveAccessibleName();
    });
  });

  it('uses proper semantic HTML structure', () => {
   const { container } = render(<Hero />);
    
    // Should use section element
   const sections = container.querySelectorAll('section');
   expect(sections.length).toBeGreaterThan(0);
    
    // Should have proper heading hierarchy
   const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
   expect(headings.length).toBeGreaterThan(0);
  });
});
