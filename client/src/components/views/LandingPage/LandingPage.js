import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_KEY, API_URL } from '../../Config'
import MainImage from './Section/MainImage';
import { IMAGE_BASE_URL } from '../../Config';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([]) //API로 가져온 영화 정보 저장
    const [MainMovieImage, setMainMovieImage] = useState(null) //most famous movie
    const [CurrentPage, setCurrentPage] = useState(0) //Load more를 위한 현재 로드된 페이지 번호

    useEffect(()=>{
        
        // Get API
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
    },[])

    // Use API information
    const fetchMovies= (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
        
            console.log(response.results)
            // ...은 배열을 그대로 가져오는 것을 뜻함
            setMovies([...Movies, ...response.results]) //원래 있던 Movie라는 State에 내용을 추가한다.
            setMainMovieImage(response.results[0])
            setCurrentPage(response.page)
        })

    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)

    }

    return (
       <div style={{width: '100%', margin: '0'}}>
        {/* {Main Image} */}
        {/* 조건부 랜더링 논리 연산자 &&. MainMovieImage가 있을 때만 진행하라. */}
        {MainMovieImage&&
        <MainImage 
        image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
        title={MainMovieImage.original_title}
        text={MainMovieImage.overview}
        >            
        </MainImage>
        
        }
        <div style={{width: '85%', margin: '1rem auto'}}>
            <h2> Movies by latest</h2>
            <hr/>

            {/* Movie Grid Card */}
            <Row gutter={[16,16]}>
                {Movies && Movies.map((movie,index)=>(
                    <React.Fragment key={index}>
                        <GridCards
                        landingPage
                            image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                        >
                        </GridCards>
                    </React.Fragment>
                ))}
            
            </Row>

        </div>

        <div style={{display: 'flex', justifyContent: 'center'}}>
            <button onClick={loadMoreItems}>Load More</button>

        </div>

       </div>

    )
}

export default LandingPage
