
import React, { useEffect } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Section/MainImage";
import { useState } from "react";
import MovieInfo from "./Sections/MovieInfo";
import { Row } from "antd";
import GridCards from "../commons/GridCards";
import Favorite from "./Sections/Favorite";



function MovieDetail(props) {

    // url에서 movieId를 얻는다
    let movieId = props.match.params.movieId
    // State에 가져온 영화 정보 배열 저장하기 
    const [Movie, setMovie] = useState([])
    // State에 가져온 캐스팅 정보 배열 저장하기
    const [Casts, setCasts] = useState([])

    const [ActorToggle, setActorToggle] = useState(false)

    useEffect( ()=>{

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        console.log(movieId)

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            // setMovie로 가져온 정보 저장
            setMovie(response)
        })     

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setCasts(response.cast)
            // setMovie로 가져온 정보 저장
        }) 

    },[])
    // 버튼 클릭 여부
    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return(
      
      <div>
          {/* Header */}
          {/* 상단 메인 이미지 부분 */}
         <MainImage 
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
        >            
        </MainImage>
        
        {/* Body */}
        <div style={{width:'85%', margin:'1rem auto'}}>
            <div style={{display:'flex', justifyContent: 'flex-end'}}>
               <Favorite
               movieInfo={Movie}
               movieId={movieId}
               userFrom={localStorage.getItem('userId')}
               ></Favorite>
            </div>

        </div>

        {/* send props */}
        <MovieInfo movie={Movie}>

        </MovieInfo>

        <div style={{width: '85%', margin:'1rem auto'}}>

            {/* Mobie Info */}

            <br/>
            <div style={{display:'flex', justifyContent: 'center', margin: '2rem'}}>
                <button onClick={toggleActorView}>View Cast</button>

            </div>

            {ActorToggle &&
            <Row gutter={[16,16]}>
                {/* Casts 안의 cast 요소  */}
                {Casts && Casts.map((cast,index)=>(
                    <React.Fragment key={index}>
                        <GridCards
                            image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                castId={cast.id}
                                characterName={cast.original_title}
                        >
                        </GridCards>
                    </React.Fragment>
                ))}
                
            
            </Row>
            }
            

        </div>

        </div>
    
    )

}

export default MovieDetail