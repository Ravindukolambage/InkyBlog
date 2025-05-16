import { Formik, Form, Field } from "formik";
import { MdOutlineClose } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


const ProfileCard = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (

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
              <h2 className="text-xl font-semibold">Profile Details</h2>
              <MdOutlineClose
                className="w-6 h-6 cursor-pointer"
                onClick={onClose}
              />
            </div>
            
          </div>
        </div>
  );
};

export default ProfileCard;
