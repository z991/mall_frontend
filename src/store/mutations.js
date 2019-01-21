export default {
    setShopdetailId(state,info){
        state.ShopdetailId = info;
        window.localStorage.ShopdetailId = info;        
    },
    //单向数据流保存用户信息
    setUserInfo(state, info) {
        state._userInfo = info;
        window.localStorage.userInfo = info;
    },
    //单向数据流保存用户登录成功后的Token
    setUserToken(state, info) {
        state._userStoken = info;
        window.localStorage.Stoken =info;
    },
    //单向数据流保存购物车数量
    setCount(state,info){
        state.Count = info;
    },
    setShopText(state,info){
        state.ShopText=info;
    },
 
 
}
