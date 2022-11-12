import Axios from "axios";
import React, { useEffect, useState } from "react";

function Favorite(props) {

    const movieId=props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    useEffect( ()=> {
       
        console.log('useEffect쓰는 중의 favorited', Favorited)

        // protocol to backend

        Axios.post('/api/favorite/favoriteNumber',variables)
        .then(response=> {
            console.log('useEffect 안의 all favoriteNumber', response.data)
            setFavoriteNumber(response.data.favoriteNumber)

            if(response.data.success){

            } else {
                alert('숫자 정보를 가져오는데 실패했습니다.')
            }
        })
            

    },[])

    Axios.post('/api/favorite/favorited', variables)
    .then(response=>{
        if(response.data.success){

        setFavorited(response.data.favorited)                
        console.log('좋아요 리스트', response.data)
        
        }else {
            alert('정보를 가져오는데 실패했습니다.(count id)')
        }
    })
    
    const onClickFavorite = () => {
        // if Click event(for remove)
        if(Favorited){ 
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {                                   
                if(response.data.success) {
                    console.log('call the delete api')
                    setFavoriteNumber(FavoriteNumber-1)
                    setFavorited(!Favorited)
                    console.log('딜리트 api 호출한 뒤의 Favorite',Favorited)
                }else { 
                    alert('Fail to remove your action to Favorite list')
                }
            })
        } else { //  if Click event(for add)
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(response => {
                if(response.data.success){
                    console.log('call the add api')
                    setFavoriteNumber(FavoriteNumber + 1)
                }else {
                    alert('Fail to add your action to Favorite list')
                }
            })
        }

        
    }

    return(
        <div>
           <button onClick={onClickFavorite}>
               {
                   Favorited ? "Not Favorite " : "Add to Favorite "
               }
                {FavoriteNumber} </button>
        </div>
    )
}

export default Favorite