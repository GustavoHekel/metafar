import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header Component', () => {
    test('renders the Header component with the correct text', () => {
        render(<Header/>);
        expect(screen.getByText('Welcome to Metafar challenge')).toBeInTheDocument();
    });

    test('Header component structure', () => {
        render(<Header/>);
        const appBar = screen.getByRole('banner');
        expect(appBar).toBeInTheDocument();
    });

    test('Header component style', () => {
        render(<Header/>);
        const appBar = screen.getByRole('banner');
        expect(appBar).toHaveClass('MuiAppBar-colorSecondary');
    });
});
