import { render, screen } from '@testing-library/react';
import Skills from './Skills';
import '@testing-library/jest-dom';

describe('Skills Component', () => {
  it('renders skills section with heading', () => {
  render(<Skills />);
    
  expect(screen.getByText(/skills/i)).toBeInTheDocument();
  });

  it('displays technical skills categories', () => {
  render(<Skills />);
    
    // Check for common skill categories
  const skillCategories = [
      'Frontend',
     'Backend',
      'Languages',
      'Frameworks',
      'Tools',
      'Databases'
    ];
    
  const renderedText = screen.getByTestId ? 
      screen.getByTestId('skills-section').textContent.toLowerCase() : 
      document.body.textContent.toLowerCase();
    
    // At least some skill categories should be present
  const foundCategories = skillCategories.filter(category => 
     renderedText.includes(category.toLowerCase())
    );
    
  expect(foundCategories.length).toBeGreaterThan(0);
  });

  it('shows programming languages', () => {
  render(<Skills />);
    
    // Common programming languages that should be listed
  const languages = ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript'];
    
  const content = document.body.textContent;
  const foundLanguages = languages.filter(lang => 
     content.includes(lang)
    );
    
  expect(foundLanguages.length).toBeGreaterThan(0);
  });

  it('displays React as a skill', () => {
  render(<Skills />);
    
  expect(document.body.textContent).toMatch(/react/i);
  });

  it('has proper grid/flex layout structure', () => {
  const { container } = render(<Skills />);
    
    // Should use grid or flexbox for layout
  const grids = container.querySelectorAll('[class*="grid"]');
  const flexContainers = container.querySelectorAll('[class*="flex"]');
    
  expect(grids.length + flexContainers.length).toBeGreaterThan(0);
  });

  it('includes visual skill indicators', () => {
  render(<Skills />);
    
    // Look for progress bars, badges, or other visual indicators
  const progressBars = document.querySelectorAll('[class*="progress"], [class*="bar"]');
  const badges = document.querySelectorAll('[class*="badge"], [class*="tag"]');
  const skillItems = document.querySelectorAll('[class*="skill"]');
    
  expect(progressBars.length + badges.length + skillItems.length).toBeGreaterThan(0);
  });

  it('applies accessibility best practices', () => {
  render(<Skills />);
    
    // Skills should be in a list or have proper semantic structure
  const lists = document.querySelectorAll('ul, ol');
  const headings = document.querySelectorAll('h2, h3, h4');
    
  expect(lists.length + headings.length).toBeGreaterThan(0);
  });

  it('uses Tailwind CSS classes for styling', () => {
  const { container } = render(<Skills />);
    
    // Look for Tailwind class patterns
  const elementsWithTailwind = container.querySelectorAll('[class*="text-"], [class*="bg-"], [class*="p-"], [class*="m-"]');
    
  expect(elementsWithTailwind.length).toBeGreaterThan(0);
  });
});
