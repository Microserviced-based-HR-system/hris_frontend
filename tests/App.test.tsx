// inside App.test.tsx
import { render, screen } from '@testing-library/react';

import App from '../src/App';

describe('App', () => {
   it('should render app', () => {
      render(<App />);
      expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
   });
});
