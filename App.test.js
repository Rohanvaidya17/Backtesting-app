import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Banking Analytics Platform', () => {
  test('renders main title', () => {
    render(<App />);
    expect(screen.getByText('Banking Analytics Platform')).toBeInTheDocument();
  });

  test('shows getting started guide initially', () => {
    render(<App />);
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
  });

  test('metrics tab is disabled without data', () => {
    render(<App />);
    const metricsButton = screen.getByText('Key Metrics');
    expect(metricsButton).toBeDisabled();
  });

  test('shows file upload button', () => {
    render(<App />);
    expect(screen.getByText('Upload Banking Data (CSV)')).toBeInTheDocument();
  });
});