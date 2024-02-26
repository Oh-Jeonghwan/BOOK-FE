import React, { useEffect, useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { useParams,useNavigate } from 'react-router-dom';
import customAxios from '../../common/customAxios';

const UpdateForm = () => {
    const [book,setBook] = useState({
        title:'',
        author:''
    });

    const {id} = useParams();

    const navigate = useNavigate();

    let {title,author} = book;
    
    useEffect(()=>{
        callBook();
    },[]);

    const changeValue = (e)=>{
        setBook({
            ...book, //기존 값을 유지시키기 위해 복사해서 개체 사용
            [e.target.name]:e.target.value
        });
    }

    const submitBook = (e) =>{
        e.preventDefault();
        editBook();
    }

    const callBook = ()=>{
        customAxios.get("/book/"+id,{
        }).then(res=>{
            setBook(res.data);
        });
    }

    const editBook = () =>{
        customAxios.put("/book/"+id,{
            title,author
        }).then(res=>{
            console.log(2,res.data);
            if(res.data!==null){
                setBook([]);
                navigate('/home');
                //props.history.push('/');
            
            }else {
                alert("책 수정 실패");
            }
        })
        // .catch((error)=>{    then에서 실패했을 때 작동, 백단에서 에러를 날려도 실행 안 된다.
        //     console.error(error);
        // })
    };

        return (
            <div>
                <Form onSubmit={submitBook}>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" value={book.title} onChange={changeValue} name='title'/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="Enter Author" value={book.author} onChange={changeValue} name='author'/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
};

export default UpdateForm;