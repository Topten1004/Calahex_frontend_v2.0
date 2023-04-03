


import React from 'react' ;

import ExpandMoreIcon from '@mui/icons-material/ExpandMore' ;

import {
    Box ,
    Accordion ,
    AccordionDetails ,
    AccordionSummary
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        "& .MuiAccordion-root" : {
            backgroundColor : theme.palette.common.lightBlack,
            boxShadow : "none"
        } ,
        "& .MuiAccordionSummary-root" : {
            fontSize : "14px" ,
            color : "white" ,
            "& svg" : {
                color : "white"
            }
        },
        "& .MuiAccordionDetails-root" : {
            color : "white" ,
            fontSize : "12px"
        }
    }
}))
const ControlledAccordions = (props) => {
    
    const classes = useStyles() ;

    const {
        title, content
    } = props ;

    return (
        <Box className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    { title }
                </AccordionSummary>
                <AccordionDetails>
                    { content }
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default ControlledAccordions ;