import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../server/Firebase";
import { getUserId, getUserName } from "../utils/common-utils";

const getStatus = async () => {
  console.log("getStatus");
  const statusArr = [];
  const reqRef = collection(db, "serviceRequests");
  const userId = await getUserId();
  const userName = await getUserName();
  const q = query(reqRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  console.log("Printing values");
  querySnapshot.forEach((doc, index) => {
    console.log(doc.data());
    const fetchedData = doc.data();
    const data = {
      id: `${index + 1}` || "",
      status: fetchedData.resolved ? "Resolved" : "Unresolved",
      name: userName || "",
      type: fetchedData.type || "",
    };
    statusArr.push(data);
  });
  return statusArr;
};

export { getStatus };
