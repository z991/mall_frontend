       /*function：创建axios对象
        describe：包装axios对象axioIn
        date：20171127
        author：qy
        version:1.10/*/
import axios from 'axios'
import router from '../router'



var axioIn = axios.create({
   baseURL:'http://{{MALL_FRONTEND_URL}}',
  //baseURL:'http://120.92.145.165:8080/',
  // 测试环境用的
//   baseURL: 'http://192.168.30.109:8080/',
  //  baseURL:'http://localhost:8081/',
  timeout: 40000,
  withCredentials: true,
   
})
//API规则： 请求成功后的response 集合   

axioIn.interceptors.response.use(function (response) {
  // 对响应数据做点什么
   
  return response;
  }, function (error) {
          console.log(error)
          switch (error.response.status) {
              case 400: 
              alert(error.response.data.error);
              break;
              case 403: 
              window.localStorage.removeItem('Stoken');
              window.localStorage.removeItem('userInfo');
              window.location.reload()
              window.location.assign('/#/');
              alert('登录超时')
              break;
          }
     
      return Promise.reject(error.response);
  });
//API规则： 请求后台的request 集合
axioIn.interceptors.request.use(response => {
    if(window.localStorage.Stoken===undefined){
  }else{
      response.headers={'Authorization':window.localStorage.Stoken}
  }
  return response;

},error=>{
 
  
})
export default axioIn
