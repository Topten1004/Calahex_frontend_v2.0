

import React from 'react' ;

import SearchIcon from '@mui/icons-material/Search';

import {
    Grid,
    TextField,
    InputAdornment,
    FormGroup,
    Checkbox,
    Box,
    FormControlLabel,
    useMediaQuery
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    label : {
        fontSize : "14px",

        color : theme.palette.common.label
    }
}))

const SearchBar = (props) => {
    
    const classes = useStyles() ;

    const match1 = useMediaQuery('(min-width : 320px)') ;

    const {
        searchValue,
        handleSearchValue ,
    } = props ;

    return (
        <Grid container spacing={1}>
            <Grid item xs={match1 ? 3 : 12}>
                <TextField
                    size={"small"}
                    InputProps={{
                        endAdornment : (
                            <InputAdornment position='end'>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={searchValue}
                    onChange={handleSearchValue}
                />
            </Grid>
            <Grid item xs={match1 ? 9 : 12}>
                <FormGroup row >
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="primary"
                            />
                        }
                        label={<Box component={"span"} className={classes.label}>Hide small balance</Box>}
                    />
                </FormGroup>
            </Grid>
        </Grid>
    )
}

export default SearchBar ;