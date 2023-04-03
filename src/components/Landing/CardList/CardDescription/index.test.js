import React from 'react' ;

import { ThemeProvider } from '@mui/material';
import theme from '../../../../utils/theme';

import { shallow } from 'enzyme' ;

import CardDescription from '.';


describe('CardDescription', () => {
    it('should render title and content correctly with given strings', () => {
        const title = "title" ;
        const content = "content" ;
    
        let component = shallow(
            <ThemeProvider theme={theme}>
                <CardDescription
                    title={title}
                    content={content}
                />
            </ThemeProvider>
        );
        expect(component).toMatchSnapshot() ;
    }),

    it('should render button correctly with given component' , () => {
        const tail = "Details...",

        component = shallow(
            <ThemeProvider theme={theme}>
                <CardDescription
                    tail={tail}
                />
            </ThemeProvider>
        );

        expect(component).toMatchSnapshot() ;
    })
})
