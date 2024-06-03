import React, { useState, useEffect } from "react";
import PostCard from "../Componets/PostCard";
import { toast } from "react-hot-toast";
import { Axios } from "../App";

function GetPost() {
  const [posts, setPosts] = useState([]);
  console.log(posts, "lllllllllllllll");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/api/getpost");
        if (response.status === 200) {
          setPosts(response.data.data);
          toast.success("Successfully fetched data");
        }
        console.log(response, "kkkkkkkkkkk");
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-900  h-screen w-screen flex flex-col">

    <div className="flex flex-wrap justify-center">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
    </div>
   
   
  );
}

export default GetPost;
