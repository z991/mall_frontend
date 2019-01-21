let _localStorage = window.localStorage;
export default {
    //Getters 获取用户信息
    userInfo(state) {
        return state._userInfo || (window.localStorage.userInfo );
    },
    //Getters 获取用户Token信息
    userToken(state) {
        return state._userStoken || (window.localStorage.Stoken);
    },
    ShopdetailId(state) {
        return state.ShopdetailId || (window.localStorage.ShopdetailId);
    },
    ShopText(state) {
        return state.ShopText ;
    },
  
}
 