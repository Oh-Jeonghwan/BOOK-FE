import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';

const JoinForm = (props) => {

  const [member, setMember] = useState({
    loginId:'',
    password:''
  });

  const changeValue = (e) => {
    setMember({
      ...member,
      [e.target.name]:e.target.value
    });
  }

  const joinMember = (e) => {
    e.preventDefault();
    fetch("http://localhost:8081/join",{
      method: "POST",
              headers:{
                  "Content-Type":"application/json; charset=utf-8"
              },
              body:JSON.stringify(member)
    }).then(res=>{
      console.log(1,res);
      if(res.status === 201){
          return res.json();
      } else {
          return null;
      }
    }).then(res=>{
      console.log(2,res);
      if(res!==null){
          setMember([]);
          window.location.href = 'http://localhost:3000';
          //props.history.push('/');
      }else {
        alert("회원가입 실패");
      }
    })
  }
    return (
        <div>
          <h1>회원가입 폼</h1>
          <Form onSubmit={joinMember}>
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

export default JoinForm;