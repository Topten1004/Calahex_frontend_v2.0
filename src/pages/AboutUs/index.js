

import React from 'react' ;

import Section from '../../components/AboutUs/Section';

import  {
    Box,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.layout.headerHeight,

        paddingTop : "50px",

        minHeight : "calc(100vh - 60px)",

        overflow : "hidden",
        overflowY : "scroll"
    },
    title : {
        fontWeight : "bold",
        fontSize : "18px",

        color : theme.palette.primary.main
    }
}))

const AboutUs = () => {

    const classes = useStyles() ;

    const sectionList = [
        {
            title :  "" ,
            description : "We have been running traditional companies for decades. Companies that have an actual office, store, production facility, storage rooms and so forth. Traditional businesses who provide a product or service in exchange for compensation. Our companies are all active in the Construction Industry, so why in the hell would we launch a Crypto and Token exchange platform. The answer to that is pretty simple. We studied the ‘nuts and bolts’ of Blockchain and saw some core advantages that appealed to us. Decentralization, cryptographic security, transparency, and immutability. Ok, not really…..we just thought it would be super cool to do, and so we did."
        },
        {
            title :  "Our Mission" ,
            description : "We believe that humor combined with a robust design and some creative use of technology can make complicated ideas more understandable and the services we provide through Calahex more fun. Our mission is to bring every adult (including grandma and grandpa) to our platform, bring innovative business ideas and projects to our platform, and help others gain a little bit of financial freedom in the process."
        },
        {
            title : "Why Calahex?",
            description : "We are from the Caribbean, from a little island called Aruba, which is better known for her beautiful clear ocean and white beaches than for any significant contribution to the Crypto Industry. Our island is home to over 40 nationalities and host to a variety of cultures. We are Caribbean, South American, American, Asian, European and the list goes on. We could not fit all nationalities into one name. So we thought Calahex would be a cool name. It’s kind of catchy when you repeat it over and over again. So let’s trade and remember, “don’t worry...be happy!”."
        }
    ]

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                    <Box className={classes.title} >
                        About Us
                    </Box>
                    {
                        sectionList.map((section , index) => {
                            return (
                                <Section 
                                    title={section.title}
                                    description={section.description}
                                    key={index}
                                />
                            )
                        })
                    }
                </Grid>
                <Grid item xs={3}>
                    
                </Grid>
            </Grid>
        </Box>
    )
}

export default AboutUs ;