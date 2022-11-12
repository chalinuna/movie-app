import { Descriptions } from "antd";
import React from "react";

function MovieInfo(props) {

    let movie = props;
    
    console.log('MovieInfo.js')
    console.log(movie)
    console.log(props)

    return(



        <div>
            <Descriptions title="Movie Info" bordered>
                <Descriptions.Item label="Title">{movie.movie.original_title}</Descriptions.Item>
                <Descriptions.Item label="release_data">{movie.movie.release_data}</Descriptions.Item>
                <Descriptions.Item label="revenue">{movie.movie.revenue}</Descriptions.Item>
                <Descriptions.Item label="runtime">{movie.movie.runtime}</Descriptions.Item>
                <Descriptions.Item label="vote_average" sapn={2}>{movie.movie.vote_average}</Descriptions.Item>
                <Descriptions.Item label="vote_count">{movie.movie.vote_count}</Descriptions.Item>
                <Descriptions.Item label="status">{movie.movie.status}</Descriptions.Item>
                <Descriptions.Item label="popularity">{movie.movie.popularity}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}
export default MovieInfo