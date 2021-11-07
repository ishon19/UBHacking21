import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../server/Firebase";

const fetchCategories = async () => {
    const catCol = collection(db, "categories");
    const snapshot = await getDocs(catCol);
    const catList = [];
    snapshot.docs.map((doc) => {
      console.log(doc.data());
      catList.push(doc.data());
    });      
    return catList;
  };

  export { fetchCategories };