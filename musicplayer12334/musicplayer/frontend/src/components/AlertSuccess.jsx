import React from "react";
import Swal from "sweetalert2";  

import { BsEmojiSmile } from "react-icons/bs";

const AlertSuccess = ({ msg }) => {
  
  React.useEffect(() => {
    if (msg) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: msg,
        showConfirmButton: false,
        timer: 2000, // Thời gian hiển thị thông báo là 2 giây
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.hideLoading();
        },
      });
    }
  }, [msg]);

  return null; 
};

export default AlertSuccess;
