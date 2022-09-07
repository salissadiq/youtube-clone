import React, { useEffect, useState } from "react";

import API from "../utils/API";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = (props) => {
  const [videos, setVideos] = useState([])
  useEffect(()=> {
    const fetchVideos = async()=> {
      const response = await API.get(`/videos/${props.type}`)
      setVideos(response.data)
    }
    fetchVideos()
  }, [])
  return (
    <Container>
      {videos.map((video, index)=>(<Card key={index}  video={video}/>))}
      
    </Container>
  );
};

export default Home;
