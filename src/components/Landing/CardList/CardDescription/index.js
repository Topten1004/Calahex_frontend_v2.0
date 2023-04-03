import React from 'react' ;

import { 
    Box 
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
    } ,
    title : {
        textAlign : "center" ,
        fontWeight : 600 ,
        fontSize : "26px" ,
        color : theme.palette.primary.main
    } ,
    content : {
        fontSize : "19px" ,
        fontWeight : 500 ,
        margin : "20px",

        color : theme.palette.common.label
    },
    tail : {
        textAlign : "right",
        marginRight : "30px",
        fontSize : "19px" ,
        color : theme.palette.primary.main ,
        cursor : "grab" ,
        marginBottom : "25px"
    }
})) ;
const CardDescription = (props) => {

    const { title , content , tail } = props ;

    const classes = useStyles() ;

    return (
        <Box  className={classes.root}>
            <Box  className={classes.title}>
                { title }
            </Box>
            <Box  className={classes.content}>
                { content }
            </Box>
            {
                tail ? <Box  className={classes.tail}>
                    { tail }
                </Box> :<></>
            }
        </Box>
    )
}

export default CardDescription ;