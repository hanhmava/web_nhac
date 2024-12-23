import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const filters = [
  { id: 2, name: "Nhạc trẻ", value: "Nhạc trẻ" },
  { id: 3, name: "Nhạc trữ Tình", value: "Nhạc trữ Tình" },
  { id: 4, name: "Nhạc Rap", value: "Nhạc Rap" },
  { id: 5, name: "Nhạc Nước Ngoài", value: "Nhạc Nước Ngoài" },
];

export const filterByLanguage = [
  { id: 1, name: "ViệtNam", value: "ViệtNam" },
  { id: 2, name: "English", value: "english" },
  { id: 3, name: "Trung Quốc", value: "trung quốc" },
  { id: 4, name: "Hàn Quốc", value: "hàn quốc" },
];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};