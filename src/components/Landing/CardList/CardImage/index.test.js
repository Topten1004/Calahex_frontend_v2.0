import React from 'react' ;

import tradingImg from '../../../../assets/trading_img.jpg' ;

import { shallow } from 'enzyme' ;

import CardImage from '.';

describe('CardImage', () => {
    it('should render image correctly with given strings', () => {
    
        let component = shallow(
            <CardImage imageUrl={tradingImg} />
        );
        expect(component).toMatchSnapshot() ;
    })
})
