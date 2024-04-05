import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import "./styles.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  async function fetchListOfBlogs() {
    setPending(true);
    const response = await axios.get("https://6vllt6-5000.csb.app/api/blogs");
    const result = await response.data;
    console.log(result);
    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }

  async function handleEdit(getCurrentData) {
    console.log(getCurrentData);
    navigate("/add-blog", { state: { getCurrentData } });
  }

  async function handleDeleteBlog(getCurrentId) {
    console.log(getCurrentId);
    const response = await axios.delete(
      `https://6vllt6-5000.csb.app/api/blogs/delete/${getCurrentId}`,
    );
    const result = await response.data;
    if (result?.message) {
      //  fetchListOfBlogs();
      navigate(0);
    }
  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);
  return (
    <div className="wrapper">
      <h1>Blog Lists</h1>
      {pending ? (
        <h1>Loading</h1>
      ) : (
        <div className="blogList">
          {blogList && blogList.length > 0 ? (
            blogList.map((blogItem) => {
              return (
                <div key={blogItem._id}>
                  <p>{blogItem.title}</p>
                  <p>{blogItem.description}</p>
                  <FaEdit onClick={() => handleEdit(blogItem)} size={30} />
                  <FaTrash
                    onClick={() => handleDeleteBlog(blogItem._id)}
                    size={30}
                  />
                </div>
              );
            })
          ) : (
            <h3>No Blogs</h3>
          )}
        </div>
      )}
    </div>
  );
}
