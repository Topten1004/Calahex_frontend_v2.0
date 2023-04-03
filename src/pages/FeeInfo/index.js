

import React from 'react' ;

import Section from '../../components/FeeInfo/Section';

import  {
    Box,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.layout.headerHeight,

        paddingTop : "50px",
        paddingBottom : 40,

        minHeight : "calc(100vh - 60px)",

        overflow : "hidden",
        overflowY : "scroll",
        "& table" : {
            borderCollapse: 'collapse',
            width : '100%'
        },
        "& td" : {
            border : '1px solid ',
            padding : 5
        },
        "& th" : {
            border : '1px solid ',
            padding : 5
        }
    },
    title : {
        fontWeight : "bold",
        fontSize : "20px",

        color : theme.palette.primary.main
    }
}))

const FeeInfo = () => {

    const classes = useStyles() ;

    const sectionList = [
        {
            title :  "" ,
            description : <>CA1Ex has different fee structures for spot trading and futures trading. This section gives a detailed description of the spot trading and general fees we charge as well as the trading volumes and verification levels we have established for all users of our platform. When an order executes the buyer and the seller are each charged a fee based on the total price of the executed order. The fee charged by CA1Ex on each executed trade is calculated by taking the <b>(amount * purchase price * rate)</b> for the given trade. There are no fees for placing an order which does not execute.<br/>Fees vary by the currency pair being traded, your verification level, your 30-Day volume as a trader and whether the order filled is a maker or taker.</>
        },
        {
            title :  "Verification Levels" ,
            description : <>
                <table >
                    <tbody>
                        <tr>
                            <td>
                                Level 1
                            </td>
                            <td>
                                Email verification
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Level 2
                            </td>
                            <td>
                                ID verification (Region, Name, Birthday, Address, City, Postal Code, Phone Number)
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Level 3
                            </td>
                            <td>
                                2FA Authentication (16-digit key Code)
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Level 4
                            </td>
                            <td>
                                Video verification (Video call with platform supporter with ID card or Passport
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        },
        {
            title : "30-Day Volume",
            description : "Your trading volume impacts the price you pay for each trade. Our fees are built to reward users who drive liquidity to CA1Ex markets to ensure a healthy ecosystem. Cumulative 30-day trading volume and average 24-hour holdings are automatically calculated daily at 00:00(UTC). User level and fee rates are updated daily at 02:00 (UTC) to correspond with the fee schedule in the table below."
        },
        {
            title : "Maker Orders",
            description : <>Maker orders create (make) liquidity on a market by being entered onto the order book. In other words, maker orders are not filled when they are placed but instead wait until a future order is placed that matches them. A maker order can be on either the sell side or a buy side of the order. When an existing order on the order book is matched with a newly placed order (the taker), the maker order in the transaction is charged the maker fee.</>
        },
        {
            title : "Taker Orders",
            description : <>Taker orders reduce (take away) liquidity on a market. Orders which execute immediately and take volume off the order book are takers. A taker order can be on either the sell side or buy side of the order. When a new order is placed and it matches against another order already on the order book (the maker), the taker in the transaction is charged the taker fee.</>
        },
        {
            title :  "Verification Levels" ,
            description : <>
                <table >
                    <thead>
                        <tr>
                            <th>
                                Level
                            </th>
                            <th>
                                30-Day Volume (USD)	
                            </th>
                            <th>
                                General Fee
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                1
                            </td>
                            <td>
                                $0K-$50K
                            </td>
                            <td>
                                0.25%
                            </td>
                        </tr>
                        <tr>
                            <td>
                                2
                            </td>
                            <td>
                                $50K-$1M
                            </td>
                            <td>
                                0.24%
                            </td>
                        </tr>
                        <tr>
                            <td>
                                3
                            </td>
                            <td>
                                $1M-10M	
                            </td>
                            <td>
                                0.15%
                            </td>
                        </tr>
                        <tr>
                            <td>
                                4
                            </td>
                            <td>
                                $10M+	
                            </td>
                            <td>
                                0.10%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        },
        {
            title : "Minimal order requirements",
            description : <>The minimum order size is 25 USD/EUR for <b>USDT</b> denominated trading pairs and <b>0.02 ETH</b> for ETH denominated trading pairs and <b>0.00010 BTC</b> for BTC denominated trading pairs.
            <br/>
            <br/>
            Below you will find the General Fee Schedule effective from January 1, 2021 until further notice.
            CA1Ex offers her users the possibility to directly deposit the following Digital Assets; <b>BTC, ETH, USDT, SXP, REPV2, YFI, UNI and LINK</b>.
            <br/>
            If you wish to withdraw any of the other coins we offer for trading to an external wallet, you can easily do so by converting them to one of these 3 coins through the quick conversion button.</>
        },
        {
            title :  "Verification Levels" ,
            description : <>
                <table >
                    <thead>
                        <tr>
                            <th>
                                Name and Symbol
                            </th>
                            <th>
                                Deposit fee	
                            </th>
                            <th>
                                Withdrawal fee
                            </th>
                            <th>
                                Transfer fee
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Ethereum ETH
                            </td>
                            <td>
                                No fee
                            </td>
                            <td>
                                2%
                            </td>
                            <td>
                                No fee
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Tether USDT
                            </td>
                            <td>
                                No fee
                            </td>
                            <td>
                                2%
                            </td>
                            <td>
                                No fee
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <table >
                    <thead>
                        <tr>
                            <th>
                                Name and Symbol
                            </th>
                            <th>
                                Conversion fee
                            </th>
                            <th>
                                Transfer fee
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                All listed Digital Assets
                            </td>
                            <td>
                                0.25%
                            </td>
                            <td>
                                No fee
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        },
        {
            title :  "User accounts – April 23, 2021" ,
            description : <>
                At CA1Ex we have set certain rules and pricing for the user accounts that we offer on our platform. Some accounts are free for all users and others are optional depending on level verification. A one time fee will be charged to activate certain accounts.
                <br/>
                <br/>
                <table >
                    <thead>
                        <tr>
                            <th>
                                User Account	
                            </th>
                            <th>
                                Type
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Level of Verification
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Exchange Account
                            </td>
                            <td>
                                Account for sopt trading
                            </td>
                            <td>
                                Free
                            </td>
                            <td>
                                1
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Futures Account
                            </td>
                            <td>
                                Coming Soon
                            </td>
                            <td>
                                Free
                            </td>
                            <td>
                                2
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                Note: user accounts are not depended on 30-day volume, <b><u>only</u></b> on level verification.
                <br/>
                CA1Ex is an upcoming cool platform and suport from our community is a key ingredient for our success.
            </>
        },
    ]

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                    <Box className={classes.title} >
                        CA1Ex: Fee Info
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

export default FeeInfo ;