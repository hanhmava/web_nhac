

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const AdBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ads = [
    "https://tse3.mm.bing.net/th?id=OIP.OCCl6X-0LTpRKKQDZMbTvgHaCw&pid=Api&P=0&h=180",
    "https://tse3.mm.bing.net/th?id=OIP.w5t9QpYXE_d0CcEw-tpESwHaD4&pid=Api&P=0&h=180",
    "https://tse3.mm.bing.net/th?id=OIP.CD-7Jqa2auRkzkk3_SNdYgHaD4&pid=Api&P=0&h=180",
    "https://tse4.mm.bing.net/th?id=OIP.fEC7qFiHVjArRalOclZSPwHaEH&pid=Api&P=0&h=180",

  ];

  // Thay đổi hình ảnh sau mỗi 4 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length); 
    }, 1500); 

    return () => clearInterval(interval);
  }, );

  return (
    <div className="w-full max-w-7xl mt-4">
      {/* Quảng cáo với hiệu ứng thay đổi hình ảnh */}
      <motion.div
        className="relative flex items-center justify-center w-full p-2 bg-gray-800 rounded-lg overflow-hidden"
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2, 
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <img
          src={ads[currentIndex]}
          alt={`Ad ${currentIndex + 1}`}
          className="w-[1000px] h-48 object-cover rounded-md"  // Đã thay đổi kích thước ở đây
        />
      </motion.div>
    </div>
  );
};

export default AdBanner;
