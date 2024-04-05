import { useContext, useEffect } from "react";
import "./styles.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
export default function AddNewBlog() {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  async function handleSaveBlogToDB() {
    const response = isEdit
      ? await axios.put(
          `https://6vllt6-5000.csb.app/api/blogs/update/${location.state.getCurrentData._id}`,
          {
            title: formData.title,
            description: formData.description,
          },
        )
      : await axios.post("https://6vllt6-5000.csb.app/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });
    const result = await response.data;
    console.log(result);
    if (result) {
      setIsEdit(false);
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { getCurrentData } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentData.title,
        description: getCurrentData.description,
      });
    }
  }, [location]);

  return (
    <div className="wrapper">
      <h1>{isEdit ? "Edit A Blog" : "Add A Blog"}</h1>
      <div className="formWrapper">
        <input
          name="title"
          placeholder="Enter Blog Title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />
        <textarea
          name="description"
          placeholder="Enter Blog Description"
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />
        <button onClick={handleSaveBlogToDB}>
          {isEdit ? "Edit Blog" : "Add New Blog"}
        </button>
      </div>
    </div>
  );
}
