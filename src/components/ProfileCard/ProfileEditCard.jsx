import { Formik, Form, Field } from "formik";
import { MdOutlineClose } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const initialValues = {
  authorName: "",
  authorDOB: "",
  authorPic: null,
};

const ProfileEditCard = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const formData = new FormData();
        formData.append("authorName", values.authorName);
        formData.append("authorDOB", values.authorDOB);
        formData.append("authorPic", values.authorPic);

        axios
          .post("http://localhost:8081/api/author", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            toast.success("Profile created successfully");
            console.log("Success:", res.data);
            actions.resetForm();
            onClose();
          })
          .catch((err) => {
            console.error(err);
            toast.error("Profile creation failed");
          });
      }}
    >
      {({ setFieldValue }) => (
        <div
          className="fixed inset-0 flex justify-center items-baseline mt-15 ml-170"
          id="profile"
          onClick={(e) => {
            if (e.target.id === "profile") onClose();
          }}
        >
          <div
            className="bg-white rounded-lg shadow-md w-[400px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <MdOutlineClose
                className="w-6 h-6 cursor-pointer"
                onClick={onClose}
              />
            </div>
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <Field
                  type="text"
                  name="authorName"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md text-base"
                  placeholder="Enter Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Date of Birth
                </label>
                <Field
                  name="authorDOB"
                  type="date"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="authorPic"
                  accept="image/*"
                  className="mt-1"
                  onChange={(e) => {
                    setFieldValue("authorPic", e.target.files[0]);
                  }}
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-400 hover:from-black hover:to-gray-300 text-white rounded-md text-base font-medium"
              >
                Save
              </button>
            </Form>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable
              theme="dark"
            />
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ProfileEditCard;
