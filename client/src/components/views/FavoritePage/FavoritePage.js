import { Popover } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../../Config";
import './favorite.css'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(()=> {
       
        fetchFavoredMovie()
        
    },[])

    // login한 id의 정보를 토대로 리스트를 가져온다.

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie', {userFrom: localStorage.getItem('userId')})
        .then(response=>{
            if(response.data.success){
                console.log('favorite한 리스트를 가져옵니다.',response.data)
                setFavorites(response.data.favorites)
            }else {
                alert('영화 정보를 가져오는데 실패했습니다.')
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId, 
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if(response.data.success){
                // 삭제 버튼을 누르면 db 리스트를 다시 불러온다.
                fetchFavoredMovie()
            }else {
                alert("삭제에 실패했습니다.")
            }
        })

    }

    const renderCards =  Favorites.map((favorite,index)=> {

        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : "no image"}
            </div>
        )


        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
            <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime}</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>remove</button></td>
        </tr>
    })

    return(
        <div style={{width:'85%', margin:'3rem auto'}}>
            <h2>favorite Movies</h2>

            <table>
                <thead>
                    <tr>
                        <th>Movie Titile</th>
                        <th>Movie RunTime</th>
                        <th>Remove from favroites</th>
                    </tr>
                </thead>

                <tbody>
                    
                   {renderCards}

                </tbody>

            </table>


        </div>
    )
}

export default FavoritePage