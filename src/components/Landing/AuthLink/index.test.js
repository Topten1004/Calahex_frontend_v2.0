import React from 'react';
import renderer from 'react-test-renderer';

import theme from '../../../utils/theme';
import { ThemeProvider } from '@mui/material';

import { BrowserRouter } from 'react-router-dom';

import AuthLink from './index' ;

describe("AuthLink", () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                                <AuthLink />
                    </ThemeProvider>
                </BrowserRouter>    
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})