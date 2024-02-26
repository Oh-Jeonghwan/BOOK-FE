import React, {useEffect, useState} from 'react';
import BookItem from '../../components/BookItem';
import customAxios from '../../common/customAxios';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const[books,setBooks] = useState([]);

    //함수 실행 시 최초 한번 실핸되는 것
    useEffect(()=>{
      booksCall();
    },[]); //dependency setState가 한번만 실행될 수 있도록 빈배열을 넣는 건데 이건 무슨 말이지?

    const booksCall = ()=>{
      customAxios.get("/book",{
      }).then(res=>{
        setBooks(res.data);
      }).catch(error=>{
        navigate('/');
      });//비동기 함수 then은 왜 2개? 펫치로 데이터로 요청
    }

    return (
        <div>
          {books.map(book=><BookItem key={book.id} book={book}></BookItem>)}
        </div>
    );
};

export default Home;