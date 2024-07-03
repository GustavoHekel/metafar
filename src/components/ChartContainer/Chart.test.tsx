import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Chart from './Chart';

describe('Chart Component', () => {
    const mockData = [1, 2, 3, 4, 5];
    const mockSymbol = 'AAPL';

    test('renders the Chart component with the correct title', () => {
        render(<Chart data={mockData} symbol={mockSymbol}/>);
        expect(screen.getByText(mockSymbol)).toBeInTheDocument();
    });

    test('renders the Chart component with the correct data', () => {
        render(<Chart data={mockData} symbol={mockSymbol}/>);
        const dataPoints = screen.getAllByRole('img');
        expect(dataPoints.length).toBeGreaterThan(0);
    });
});
