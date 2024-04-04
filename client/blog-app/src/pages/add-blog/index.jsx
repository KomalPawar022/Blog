import { useContext } from "react";
import "./styles.css";
import { GlobalContext } from "../../context";
import axios from "axios";
export default function AddNewBlog() {
  const { formData, setFormData } = useContext(GlobalContext);
  console.log(formData);

  async function handleSaveBlogToDB() {
    const response = await axios.post(
      "https://v84n5n-5000.csb.app/api/blogs/add",
      {
        title: formData.title,
        description: formData.description,
      },
    );
    const result = await response.data;
    console.log(result);
  }

  return (
    <div className="wrapper">
      <h1>Add New Blog</h1>
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
        <button onClick={handleSaveBlogToDB}>Add New Blog</button>
      </div>
    </div>
  );
}
