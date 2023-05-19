import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';

const SaveForm = (props) => {

    const [book,setBook] = useState({
        title:'',
        author:''
    });

    const changeValue = (e)=>{
        setBook({
            ...book, //기존 값을 유지시키기 위해 복사해서 개체 사용
            [e.target.name]:e.target.value
        });
    }

    const submitBook = (e) =>{
        e.preventDefault();
        fetch("http://localhost:8081/book",{
            method: "POST",
            headers:{
                "Content-Type":"application/json; charset=utf-8"
            },
            body:JSON.stringify(book)
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
                setBook([]);
                window.location.href = 'http://localhost:3000';
                //props.history.push('/');
            
            }else {
                alert("책 등록 실패");
            }
        })
        // .catch((error)=>{    then에서 실패했을 때 작동, 백단에서 에러를 날려도 실행 안 된다.
        //     console.error(error);
        // })
    }

        return (
            <div>
                <Form onSubmit={submitBook}>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" onChange={changeValue} name='title'/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="Enter Author" onChange={changeValue} name='author'/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
};

export default SaveForm;