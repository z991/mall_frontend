export default {
    ///dispath 触发异步请求 
    //映射用户信息
    setUserInfo({
        commit
    }, info) {
        commit('setUserInfo', info || {});
    },
     //映射用户Token
    setUserToken({
        commit
    }, info) {
        commit('setUserToken', info || {});
    },
    setShopdetailId({
        commit
    }, info) {
        commit('setShopdetailId', info || {});
    },
    setShopText({
        commit
    }, info) {
        commit('setShopText', info || {});
    },
 
    
}