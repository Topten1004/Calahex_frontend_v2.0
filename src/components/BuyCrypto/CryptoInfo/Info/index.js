

import React, { useEffect } from 'react' ;

import { isset } from '../../../../utils/helper';

import {
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        border : "1px solid lightgray" ,
        borderRadius : "5px",

        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',

        marginLeft : "10px" ,
        marginRight : "10px",

        padding : "10px" ,
        
        "& div" : {
            marginTop : "10px" ,
            marginBottom : "10px"
        },

        height : '140px'
    },
    pair :{
        fontWeight : "bold",

        color : theme.palette.primary.main
    },
    up : {
        color : "#3c868f !important"
    },
    down : {
        color : '#c74a4d !important'
    },
    notSupport : {
        fontWeight : 'bold',
        textAlign : 'center',

        color : theme.palette.common.label
    }
}))
const Info = (props) => {
    
    const classes = useStyles() ;

    const {
        crypto,
        handleCrypto
    } = props ;

    return (
        <Box  className={classes.root} onClick={() => handleCrypto(crypto[1])}>
            {
                ( isset(crypto) && crypto ) ? <>
                    <Box className={classes.pair}>
                        { `${crypto[1].crypto.symbol} / ${crypto[1].pair.symbol}` }
                    </Box>
                    <Box className={ crypto && Number(crypto[1].percent) >= 0 ? classes.up : classes.down}>
                        { Number(crypto[1].price).toFixed(4)}
                    </Box>
                    <Box className={ crypto && Number(crypto[1].percent) >= 0 ? classes.up : classes.down}> 
                        { `${Number(crypto[1].percent).toFixed(4)} %`} 
                    </Box>
                </> : <Box className={classes.notSupport}>
                    Not Supported.
                </Box>
            }
        </Box>
    )
}

export default Info ;