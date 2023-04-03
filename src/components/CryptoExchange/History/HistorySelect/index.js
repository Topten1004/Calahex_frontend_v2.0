import React,{ useState } from 'react' ;

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import clsx from 'clsx';

import {
    Box, Collapse, Divider, List, ListItem, useMediaQuery
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        height : "30px" ,
        width : '100%',

        paddingLeft : "20px" ,
        borderBottom : "1px solid gray" ,

        display : "flex" ,
        flexDirection : "row" ,
        alignItems : "center",

        position : 'relative'
    },
    type : {
        minWidth : 150,

        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',

        paddingLeft : "10px" ,
        paddingRight : "10px" ,
        fontWeight : "bold" ,
        cursor : "pointer",
        color : theme.palette.primary.main,

        borderRight : "1px dotted lightgray"
    } ,
    active : {
        borderBottom : "2px solid " + theme.palette.common.label
    },
    collapse : {
        background : 'white',
        position : 'absolute',

        height: "calc(50vh - 105px)" ,
        width : 170,
        border : '1px solid lightgray',
        top : 30,
        left : 0,

        background : theme.palette.primary.main,
        color : 'white',
        fontWeight : 'bold',

        "& .MuiList-root" : {
            padding : 0,
        }
    },
    drawBt : {
        display : 'flex',
        alignItems : 'center'
    }
}))

const HistorySelect = (props) => {

    const {
        historyType , handleHistoryType
    } = props ;

    const classes = useStyles() ;

    const match1 = useMediaQuery('(min-width : 630px)') ;

    const historyTypes = [
        "Order History" ,
        "Trade History",
        "Funds"
    ]

    const [ isDrawSelect, setIsDrawerSelect ] = useState(false) ;

    const handleDrawerSelect = () => {
        setIsDrawerSelect(!isDrawSelect) ;
    }

    const handleSelectHistory = (type) => {
        handleDrawerSelect() ;
        handleHistoryType(type) ;
    }
    return (
        <Box className={classes.root}>
            <Box className={clsx(classes.type , (historyType === 1 && match1) ? classes.active : "")} onClick={() => match1 ? handleHistoryType(1) : handleDrawerSelect() }>
                            { match1 ? "Open Orders" : ( historyType === 1 ? "Open Orders" : historyTypes[historyType-2] )} 
                            { 
                                (!match1) &&  <Box className={classes.drawBt}>
                                                            {
                                                                isDrawSelect ? <ArrowDropUpIcon/> : <ArrowDropDownIcon />
                                                            }
                                                        </Box>
                            }
            </Box>
            {
                match1 && historyTypes.map((type , index) => {
                    return (
                        <Box  key={index} className={clsx(classes.type , historyType === index + 2 ? classes.active : "")} onClick={() => handleHistoryType(index+2)}>
                            { type } 
                        </Box>
                    )
                })
            }
            <Collapse in={isDrawSelect} unmountOnExit timeout={'auto'} >
                <Box className={classes.collapse}>
                    <List>
                        <ListItem button onClick={() => handleSelectHistory(1)}>
                            { "Open Orders" }
                        </ListItem>
                        <Divider />
                    {
                        historyTypes.map((type , index) => {
                            return (
                                <Box key={index}>
                                    <ListItem button onClick={() => handleSelectHistory(index+2)} >
                                        { type }
                                    </ListItem>
                                    <Divider />
                                </Box>
                            )
                        })
                    }
                    </List>
                </Box>
            </Collapse>
        </Box>
    )
}

export default HistorySelect ;