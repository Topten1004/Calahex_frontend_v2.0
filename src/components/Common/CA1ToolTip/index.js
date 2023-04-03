import React from 'react' ;

import {
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        display : 'flex',
        justifyContent : 'space-around',

        flexDirection : 'column',

        position : 'fixed',

        top : props => props.top - 50,
        left : props => props.left + 8,

        visibility : props => props.isPop ? 'visible' : 'hidden',

        zIndex : 1000,
        borderRadius : '5px',
        
        padding : '5px',
        paddingLeft : '10px',
        paddingRight : '10px',

        fontSize : '12px',
        width : '200px',
        height : '100px' ,
        opacity : 0.7,
        
        backgroundColor : 'black',
        color : 'white',
    },
    row : {
        display : 'flex' ,
        justifyContent : 'space-between'
    },
    arrow : {
        position :'fixed',

        top : props => props.top - 5,
        left : props=> props.left ,

        width: 0,
        height: 0,
        border: '4px solid transparent',
        borderTop: 0,
        borderBottom: '8px solid black',

        transform : 'rotate(-90deg)'
    }
}));

const CA1ToolTip = (props) => {
    const {
        top, left,
        info,
        crypto, pair,
        isPop
    } = props ;

    const classes = useStyles(props) ;

    return (
        <Box className={classes.root}>
            <Box className={classes.row}>
                <Box> Avg Price :</Box> <Box> {info && Number(info.avg_price).toFixed(8)} </Box> 
            </Box>
            <Box className={classes.row}>
                <Box> Sum {crypto}:  </Box> <Box>  { info && Number(info.sum_amount).toFixed(8)} </Box>
            </Box>
            <Box className={classes.row}>
                <Box> Sum {pair} : </Box> <Box> {info && Number(info.sum_total).toFixed(8)} </Box>
            </Box>
            <Box className={classes.arrow} />                
        </Box>
    )
}

export default CA1ToolTip ;