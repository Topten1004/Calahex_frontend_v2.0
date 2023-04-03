import React from 'react' ;

import { Link } from 'react-router-dom';

import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

import {
   Popover,
   List,
   ListItem,
   Divider,
   Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    popover : {
        zIndex : "1500 !important",
        "& .MuiList-root" : {
            padding : "0px"
        },
        "& .MuiListItem-root" : {
            fontSize : "14px" ,
            color : theme.palette.primary.main
        },
        "& a" : {
            textDecoration : "none"
        }
    }
}))

const Setting = (props) => {

    const classes = useStyles() ;

    const {
        open , anchorEl , handlePopOver , handleSignOut
    } = props ;

    const settingList = [
        {
            name : 'Edit Profile' ,
            link : "/editprofile"
        },
        {
            name : 'Change Password',
            link : '/changepassword'
        }
    ]
    return (
        <Popover
            id="setting-popover"
            anchorEl={anchorEl}
            open={open}
            onClose={handlePopOver}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            classes={{
                paper : classes.popover
            }}
        >
            <List>
            {
                settingList.map((item, index) => {
                    return (
                        <Box key={index}>
                            <Link to={item.link}>
                                <ListItem button onClick={handlePopOver}>
                                    {item.name}
                                </ListItem>
                            </Link>
                            <Divider />
                        </Box>
                    )
                })
            }
                <ListItem button onClick={handleSignOut} >
                    { `Sign Out` } <ExitToAppRoundedIcon sx={{pl:1}}/>
                </ListItem>
            </List>
        </Popover>
    )
}

export default Setting ;