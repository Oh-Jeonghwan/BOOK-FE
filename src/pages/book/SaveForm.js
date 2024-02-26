import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import customAxios from '../../common/customAxios';
import { useLocation,useNavigate } from 'react-router-dom';

const SaveForm = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [book,setBook] = useState({
        title:'',
        author:''
    });
    let {title,author} = book;
    const changeValue = (e)=>{
        setBook({
            ...book, //기존 값을 유지시키기 위해 복사해서 개체 사용
            [e.target.name]:e.target.value
        });
    }

    const submitBook = (e) =>{
        e.preventDefault();
        saveBook();
        // .catch((error)=>{    then에서 실패했을 때 작동, 백단에서 에러를 날려도 실행 안 된다.
        //     console.error(error);
        // })
    }

    const saveBook = ()=>{
        customAxios.post("/book",{
            title,
            author
        }).then(res=>{
            console.log(2,res.data);
            if(res.data!==null){
                setBook([]);
                navigate('/home');
                //props.history.push('/');
            
            }else {
                alert("책 등록 실패");
            }
        })
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