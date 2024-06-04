import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Axios } from "../App";
import { useNavigate } from "react-router-dom";
import PostCard from '../Componets/PostCard'

function GetPost() {
  const [posts, setPosts] = useState([]);
  console.log(posts, "lllllllllllllll");
  const navigate = useNavigate();

  const handlEdit = (productId) => {
    navigate(`/adminEdit/${productId}`);
  };

  const handleDeletes = async (productId) => {
    try {
      const response = await Axios.delete(`/api/admin/products/${productId}`);
      if (response.status === 204) {
        setPosts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        toast.success("Product deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Error deleting product. Please try again.");
    }
  };

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
    <div className="bg-gray-900 h-screen w-screen flex flex-col">
      <div className="flex flex-wrap justify-center">
        {posts.map((post, index) => (
          <PostCard
            key={index}
            post={post}
            onEdit={handlEdit}
            onDelete={handleDeletes}
          />
        ))}
      </div>
    </div>
  );
}

export default GetPost;
