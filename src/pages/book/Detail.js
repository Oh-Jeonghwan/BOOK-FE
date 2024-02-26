import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams,useNavigate } from 'react-router-dom';
import customAxios from '../../common/customAxios';

const Detail = (props) => {

  const navigate = useNavigate();

  //const id = props.match.params.id; //이전 페이지에서 보내주는 파라미터값을 받는 역할???? 
  const {id} = useParams();
  const [book, setBook] = useState({//fetch 하면서 가져온 book를 담아줄
    id:'',
    title:'',
    author:''
  });
  
  useEffect(()=>{
    bookDetail();
  },[])

  const bookDetail=()=>{
    customAxios.get("/book/"+id,{
    }).then(res=>{
      setBook(res.data);//insert나 update가 아니라 새로운 객체를 불러와주는 것이기 때문에 복사가 필요 없다. 
      /*book.title = 'aseeee'
        setBook(book) 상태값 안 바뀐다.(같은 객체라서)
        setBook(...book) 이래야 상태값 바뀐다.*/
    });
  }

  const deleteBook = () => {
    customAxios.delete("/book/"+id,{
    }).then(res=>{
      if(res.data==="OK"){
        alert("삭제 성공");
        navigate('/home');
      }else {
        alert("삭제 실패");
      }
    })
  }
  const updateBook = () =>{
    navigate("/editForm/"+id);
  }
  return (
      <div>
        <h1>상세보기</h1>
        <Button variant='warning' onClick={updateBook}>수정</Button>
        {' '}
        <Button variant='danger' onClick={deleteBook}>삭제</Button>
        <hr/>
        <h1>{book.title}</h1>
        <p>{book.author}</p>
      </div>
  );
};

export default Detail;