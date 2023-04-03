

const ActionTypes = {
    //socket.io
    AllNotifications : "AllNotifications",
    CryptoPairList : "CryptoPairList",
    CryptoOrderList : "CryptoOrderList",
    MarketTradeList : "MarketTradeList" ,

    // auth action types
    ConfirmAuth : "ConfirmAuth",
    ConfirmAuthError : "ConfirmAuthError",
    SignOutUser : "SignOutUser",
    SignUpUser : "SignUpUser",
    SignUpUserError : 'SignUpUserError' ,
    SignInUser : "SignInUser" ,
    SignInUserError : "SignInUserError" ,
    ConfirmUser : "ConfirmUser" ,
    ConfirmUserError : "ConfirmUserError" ,
    Profile : "Profile" ,
    ProfileError : "ProfileError",
    ProfileEdit : "ProfileEdit" ,
    ProfileEditError : "ProfileEditError",
    ProfileInfo : "ProfilelInfo",
    ProfileInfoError : "ProfileInfoError" ,
    ClearAuthError : "ClearAuthError" ,

    Confirm2FAProfile : 'Confirm2FAProfile',
    Confirm2FAProfileError : 'Confirm2FAProfileError',

    Check2FAProfile : "Check2FAProfile",
    Check2FAProfileError : "Check2FAProfileError",

    ClearConfirm2FA : "ClearConfirm2FA",

    // exchange action types
    CryptoDecimal : 'CryptoDecimal',
    CurrentCrypto : 'CurrentCrypto',

    UpdateCryptoBalance : "UpdateCryptoBalance",
    UpdatePairBalance : "UpdatePairBalance",
    ExchangeCryptoBalanceError : "ExchangeCryptoBalanceError" ,

    CryptoPairListError : "CryptoPairListError",

    CryptoOrderListError : "CryptoOrderListError",

    MarketTradeListError : "MarketTradeListError" ,

    UserOrderList : "UserOrderList" ,
    UserOrderListError : 'UserOrderListError' ,

    // wallet action types
    WalletAccountInfo : "WalletAccountInfo" ,
    WalletAccountInfoError : "WalletAccountInfoError" ,

    WholeCryptoBalance : "WholeCryptoBalance" ,
    WholeCryptoBalanceError : "WholeCryptoBalanceError" ,

    ExchangeWalletAccountInfo : "ExchangeWalletAccountInfo",
    ExchangeWalletAccountInfoError : "ExchangeWalletAccountInfoError",

    ExchangeDepositAccountInfo : "ExchangeDepositAccountInfo",
    ExchangeDepositAccountInfoError : "ExchangeDepositAccountInfoError",

    ExchangeWithdrawAccountInfo : "ExchangeWithdrawAccountInfo",
    ExchangeWithdrawAccountInfoError : "ExchangeWithdrawAccountInfoError",

    TransferCrypto : "TransferCrypto",
    TransferCryptoError : "TransferCryptoError" ,

    CryptoConvert : "CryptoConvert",
    CryptoConvertError : "CryptoConvertError" ,
    
    CreatePayment : "CreatePayment",
    CreatePaymentError : "CreatePaymentError" ,
    
    ExchangeDepositHistory : "ExchangeDepositHistory",
    ExchangeDepositHistoryError : "ExchangeDepositHistoryError",

    ExchangeWithdrawHistory : "ExchangeWithdrawHistory",
    ExchangeWithdrawHistoryError : "ExchangeWithdrawHistoryError",

    ClearExchangePayHistory : "ClearExchangePayHistory",
    ClearExchangePayHistoryError : "ClearExchangePayHistoryError",

    CloseExchangeDepositHistory : "CloseExchangeDepositHistory",
    CloseExchangeDepositHistoryError : "CloseExchangeDepositHistoryError"
}

export default ActionTypes ;