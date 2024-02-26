import axios from 'axios';
import Logout from './Logout';

const customAxios = axios.create({
    baseURL: 'http://localhost:8081'
});

// accessToken Header 설정
customAxios.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = token;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
)

customAxios.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        if(error.response){
            if(error.response.status ===401){
                //accessToken 만료
                if(error.response.data.code ===1005){
                    //accessToken 재발급 요청
                    const refreshToken = sessionStorage.getItem("refreshToken");
                    if(!refreshToken){
                        Logout();
                        return false;
                    }

                    try{
                        const originalRequest = error.config; //accessToken 재발급 전 request 정보
                        const refreshRes = await customAxios.post("/login/refresh",{
                            refreshToken: refreshToken
                        });

                        sessionStorage.setItem("token", refreshRes.data.token.accessToken);

                        //이전 api request 재용청
                        const res = await customAxios.request(originalRequest);
                        return res;

                    } catch(e){
                        console.log(e);
                        Logout();
                    }
                } else {
                    Logout();
                }
            } else {
                return Promise.reject(error);
            }
        } else {
            return Promise.reject(error);
        }
    }
)


export default customAxios