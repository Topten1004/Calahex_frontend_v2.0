import React from 'react' ;

import {
    Box ,
    Grid ,
    Button,
    useMediaQuery
} from '@mui/material' ;

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AppleIcon from '@mui/icons-material/Apple';

import tradingImg from '../../../assets/trading_img.jpg' ;
import listingImg from '../../../assets/listing.png' ;
import stackingImg from '../../../assets/stacking_img.jpg' ;
import mobileImg from '../../../assets/mobile1.png' ;
import communityImg from '../../../assets/community.png' ;

import CardImage from './CardImage';
import CardDescription from './CardDescription' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root :{
        marginTop : "40px" ,
        paddingLeft : "10%" ,
        paddingRight : "10%" ,
    },
    joinItem : {
        marginBottom : "80px"
    } ,
    iconGp : {
        "& svg" : {
            fontSize : "50px"
        } ,
        textAlign : "right"
    } ,
    imgLink : {
        textAlign : "center" ,
        "& .MuiButtonBase-root" : {
            marginTop : "5px",
            borderRadius : "20px" ,
            textTransform : "capitalize" ,
            marginRight : "15px",
            marginLeft : "15px"
        }
    } ,
    descriptionLink : {
        textAlign : "right" ,
    },
    facebook : {
        color: '#2091f5'
    } ,
    twitter : {
        color: '#7ac6f3'
    } ,
    instagram : {
        color: '#0c4475'
    } ,
    linkin : {
        color: '#055da6'
    }
})) ;

const CardList = () => {
    
    const classes = useStyles() ;

    const imgList = [
        {
            imgUrl : tradingImg
        },
        {
            imgUrl : listingImg
        } ,
        {
            imgUrl : stackingImg
        } ,
        {
            imgUrl : mobileImg
        },
        {
            imgUrl : communityImg
        }
    ]

    const titleList = [
        {
            name : "TRADING"
        },
        {
            name : "LISTING"
        } ,
        {
            name : "STAKING"
        } ,
        {
            name : "MOBILE"
        },
        {
            name : "COMMUNITY"
        } ,
        {
            name : "24/7 SUPPORT:"
        },
        {
            name : "JOB OPPORTUNITIES:"
        }
    ]

    const contentList = [
        {
            content : "Buy, sell and trade. Buy ETH/USDT with your debit and credit card from your Calahex Wallet. Get your crypto wallet going with 200+ spot trading pairs."
        } ,
        {
            content : "Life is full of opportunities and so is Calahex. We root for the small and medium size businesses because they are the pillars of any economy. Get listed now on the cheapest platform there is, and meet a world full of investors"
        } ,
        {
            content : "Let our CAX Token do all the work for you. Hold CAX and receive regular interest directly into your account with our simplified staking system. No binding periods, no problem, just relax and enjoy."
        } ,
        {
            content : "Trade when, how and where you want. Trade, deposit, withdraw and transfer using our mobile app."
        },
        {
            content : "Don't wait to join our community. We are a lively bunch. Keep up with us all over the world. Facebook, Twitter, Instagram and Linkedin you will find us screaming about Crypto all the time."
        },
        {
            content : "We are here for you. So if you have any questions or need guidance, let us know. Will take care of all your issues and resolve them a.s.a.p."
        } ,
        {
            content : "We are the coolest digital asset exchange in the world. If you come on board, you will enjoy the ride. If you are cool and smart than consider us family!"
        }
    ]
    
    const match1 = useMediaQuery("(min-width : 950px)") ;

    return (
        <Box className={classes.root}>

            <Grid container spacing={2} className={classes.joinItem}>
                <Grid item xs={match1 ? 5 : 12 }  data-aos={"fade-up"}>
                    <CardImage imageUrl={imgList[0].imgUrl} />
                </Grid>
                <Grid item xs={match1 ? 2 : 0}>

                </Grid>
                <Grid item xs={match1 ? 5 : 12}>
                    <CardDescription 
                        title={titleList[0].name}
                        content={contentList[0].content}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.joinItem}>
                <Grid item xs={match1 ? 5 : 12 }>
                    <CardDescription 
                        title={titleList[1].name}
                        content={contentList[1].content}
                    />
                    <Box  className={classes.imgLink}>
                        <Button variant={'contained'} size={'small'}> Caladex.org </Button>
                    </Box>
                </Grid>
                <Grid item xs={match1 ? 2 : 0 }>

                </Grid>
                <Grid item xs={match1 ? 5 : 12 } data-aos={"fade-up"}>
                    <CardImage imageUrl={imgList[1].imgUrl} />
                </Grid>
            </Grid>


            <Grid container spacing={2} className={classes.joinItem}>
                <Grid item xs={match1 ? 5 : 12 } data-aos={"fade-up"}>
                    <CardImage imageUrl={imgList[2].imgUrl} />
                </Grid>
                <Grid item xs={match1 ? 2 : 0 }>

                </Grid>
                <Grid item xs={match1 ? 5 : 12 }>
                    <CardDescription 
                        title={titleList[2].name}
                        content={contentList[2].content}
                    />
                    <Box  className={classes.imgLink}>
                        <Button variant={'contained'} size={'small'}> Deposit CAX </Button>
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.joinItem}>
                <Grid item xs={match1 ? 5 : 12 }>
                    <CardDescription 
                        title={titleList[3].name}
                        content={contentList[3].content}
                    />
                    <Box  className={classes.imgLink}>
                        <Button variant={'contained'} size={'small'} startIcon={<PlayArrowIcon />}>Download on Google Play </Button>
                        <Button variant={'contained'} size={'small'} startIcon={<AppleIcon />} >Download on App Store </Button>
                    </Box>
                </Grid>
                <Grid item xs={match1 ? 2 : 0 }>

                </Grid>
                <Grid item xs={match1 ? 5 : 12 } data-aos={"fade-up"}>
                    <CardImage imageUrl={imgList[3].imgUrl}/>
                </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.joinItem}>
                <Grid item xs={match1 ? 5 : 12 }>
                    <CardDescription 
                        title={titleList[4].name}
                        content={contentList[4].content}
                    />
                    <CardDescription 
                        title={titleList[5].name}
                        content={contentList[5].content}
                        tail={"Contract"}
                    />  
                    <CardDescription 
                        title={titleList[6].name}
                        content={contentList[6].content}
                        tail={"Details..."}
                    />    
                </Grid>
                <Grid item xs={match1 ? 2 : 0 }>

                </Grid>
                <Grid item xs={match1 ? 5 : 12 } sx={{display:"flex" , justifyContent:"center" , flexDirection:"column"}} data-aos={"fade-up"}>
                   <CardImage imageUrl ={imgList[4].imgUrl} />
                   <Box  className={classes.iconGp}>
                        <FacebookIcon className={classes.facebook} />
                        <TwitterIcon className={classes.twitter} />
                        <InstagramIcon className={classes.instagram} />
                        <LinkedInIcon className={classes.linkin} />
                   </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CardList ;