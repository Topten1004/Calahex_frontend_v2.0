import React from 'react';
import renderer from 'react-test-renderer';

import theme from '../../../utils/theme';
import { ThemeProvider } from '@mui/material';

import Title from './index';

describe("Title" , () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<ThemeProvider theme={theme}>
                        <Title />
                    </ThemeProvider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})
