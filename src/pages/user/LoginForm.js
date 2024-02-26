import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import customAxios from '../../common/customAxios';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginForm = (props) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [member, setMember] = useState({
        loginId:'',
        password:''
      });

    const changeValue = (e) =>{
        setMember({
            ...member,
            [e.target.name]:e.target.value
        })
    }

    const {loginId,password} = member;
    //let memberJson = JSON.stringify(member);
    const loginMember = (e) => {
        e.preventDefault();
        customAxios.post("/login",{
            //method:"POST",
            //headers:{"Content-Type":"application/json; charset=utf-8"},
            //body:JSON.stringify(member)
            loginId,
            password
            
        }).then(res=>{ //fetch 함수로부터 반환된 응답객체다. 안에는 HTTP응답에 대한 여러 정보(응답상태 코드, 헤더정보, 응답본문 등)가 포함
           // let resJson = res.json();//아직 json 파싱이 이루어지지 않은 원시 데이터 프로미스 를 포함하고 있음 두번째 then으로 가야 파싱완료
            //return res.json();
            handleLoginSuccess(res.data);
        }).catch(e=>{
            let message = '로그인에 실패하였습니다.'
            if(e.response){
                message = e.response.data.message;
                alert(message);
            }
        })

        const handleLoginSuccess = (data) => {
            sessionStorage.setItem('token',data.token);
            sessionStorage.setItem('refreshToken',data.refreshToken);
            sessionStorage.setItem('loginId',data.loginId);
            sessionStorage.setItem('accountId',data.accountId);
            sessionStorage.setItem('role',data.role);
            //sessionStorage.setItem(...data); 펼침 연산자는 왜 안되지?
            console.log(2,sessionStorage);

            navigate('/home');

        }
    }
/**fetch 함수는 비동기적으로 HTTP 요청을 보내고, 응답을 처리하기 위해 Promise를 반환합니다. fetch 함수로부터 반환된 Promise는 응답 객체(res)를 포함하며, 이 응답 객체에는 json() 메서드가 있습니다.
res.json() 메서드는 응답 본문을 JSON 형식으로 파싱하여 새로운 Promise를 반환합니다. 이 새로운 Promise는 JSON 파싱이 완료될 때까지 처리되지 않습니다. 따라서 첫 번째 then 블록에서 res.json()을 호출하면 JSON 파싱이 아직 완료되지 않았기 때문에 Promise 객체가 반환됩니다.
이후 첫 번째 then 블록에서 반환된 Promise는 두 번째 then 블록으로 전달됩니다. 두 번째 then 블록에서는 첫 번째 then 블록에서 반환된 Promise가 완료될 때까지 기다린 후에 실행됩니다. 그래서 두 번째 then 블록에서는 resJson이 실제 JSON 객체가 아닌 Promise 객체임을 볼 수 있습니다.
따라서 첫 번째 then 블록에서는 아직 JSON 파싱이 완료되지 않았기 때문에 resJson이 Promise임을 확인하게 되고, 두 번째 then 블록에서는 JSON 파싱이 완료된 후에야 실제 JSON 객체를 사용할 수 있습니다. */

    return (
        <div>
          <h1>로그인 폼</h1>
          <Form onSubmit={loginMember}>
              <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>아이디</Form.Label>
                  <Form.Control type="text" placeholder="Enter ID" onChange={changeValue} name='loginId'/>
                  <Form.Text className="text-muted">
                  </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAuthor">
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control type="password" placeholder="Enter passWord" onChange={changeValue} name='password'/>
              </Form.Group>
              <Button variant="primary" type="submit">
                  Submit
              </Button>
          </Form>
        </div>
    );
};

export default LoginForm;