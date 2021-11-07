import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../server/Firebase";

const fetchCategories = async () => {
  const catCol = collection(db, "categories");
  const snapshot = await getDocs(catCol);
  const catList = [];
  snapshot.docs.forEach((doc) => {
    console.log(doc.data());
    catList.push(doc.data());
  });
  return catList;
};

const fetchAppName = async () => {
  const appNameCol = collection(db, "metadata");
  const snapshot = await getDocs(appNameCol);
  const responseObj = snapshot.docs[0].data();
  console.log("App name: ", responseObj.appName);
  return responseObj.appName;
};

export { fetchCategories, fetchAppName };
