import React from "react";
import { MdOutlineClose } from "react-icons/md";

const ProfileCard = ({isVisible, onClose}) => {
  
  if( !isVisible ) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-baseline mt-15 ml-170" onClick={() => onClose()}>
      <div className="w-[400px]">
        <div className="bg-white p-2 rounded-sm">
          <div>
            <MdOutlineClose className="h-5 w-5 place-self-end cursor-pointer" onClick={() => onClose()}/>
          </div>
          modal
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
