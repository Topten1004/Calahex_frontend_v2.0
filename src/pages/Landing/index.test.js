import React from 'react';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom';

import theme from '../../utils/theme';
import { ThemeProvider } from '@mui/material';

import Landing from '.';

describe("Landing" , () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <Landing />
                    </ThemeProvider>
                </BrowserRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})
