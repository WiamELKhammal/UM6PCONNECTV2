import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const DeleteTag = ({ tag, onDelete }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "5px 10px",
        borderRadius: "20px",
        backgroundColor: "#f5f5f5",
        color: "#000",
      }}
    >
      <span>{tag}</span>
      <CloseIcon
        onClick={() => onDelete(tag)} // Call the delete function
        style={{
          cursor: "pointer",
          color: "#d84b2b",
          fontSize: "16px",
        }}
      />
    </div>
  );
};

export default DeleteTag;