import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import StockInfo from './StockInfo';
import { Stock } from '@/interfaces';

const mockStock: Stock = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currency: 'USD',
    exchange: 'NASDAQ',
    country: 'USA',
    type: 'Equity'
};

describe('StockInfo Component', () => {
    test('renders the StockInfo component with stock data', () => {
        render(<StockInfo stock={mockStock} />);

        expect(screen.getByText('Stock information')).toBeInTheDocument();
        expect(screen.getByText('Symbol: AAPL')).toBeInTheDocument();
        expect(screen.getByText('Name: Apple Inc.')).toBeInTheDocument();
        expect(screen.getByText('Currency: USD')).toBeInTheDocument();
        expect(screen.getByText('Exchange: NASDAQ')).toBeInTheDocument();
        expect(screen.getByText('Country: USA')).toBeInTheDocument();
        expect(screen.getByText('Type: Equity')).toBeInTheDocument();
    });

    test('handles empty stock data', () => {
        const emptyStock: Stock = {
            symbol: '',
            name: '',
            currency: '',
            exchange: '',
            country: '',
            type: ''
        };

        render(<StockInfo stock={emptyStock} />);

        expect(screen.getByText('Stock information')).toBeInTheDocument();
        expect(screen.getByText('Symbol:')).toBeInTheDocument();
        expect(screen.getByText('Name:')).toBeInTheDocument();
        expect(screen.getByText('Currency:')).toBeInTheDocument();
        expect(screen.getByText('Exchange:')).toBeInTheDocument();
        expect(screen.getByText('Country:')).toBeInTheDocument();
        expect(screen.getByText('Type:')).toBeInTheDocument();
    });
});
