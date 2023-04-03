

import React from 'react' ;

import {
    Box,
    CircularProgress,
    TableRow,
    TableCell
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        textAlign : 'center'
    }
}))

const TableLoading = (props) => {

    const classes = useStyles(props) ;

    const {
        colSpan
    } = props ;

    return (
        <TableRow >
            <TableCell colSpan={colSpan} className={classes.root}>
                <CircularProgress size={20}/>
            </TableCell>
        </TableRow>
    )
}

export default TableLoading ;