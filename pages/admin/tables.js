import React, {useState, useEffect} from "react";
import {firestore} from "../../firebase/config";
// components

import CardTable from "components/Cards/CardTable.js";

// layout for page

import Admin from "layouts/Admin.js";
import {useSession} from "../../firebase/UserProvider";

export default function Tables() {
  const [users, setUsers] = useState([]);
  const {isAdmin} = useSession();
  useEffect(()=>{
    const usersRef = firestore.collection('users');
    const unsubscribe = usersRef.onSnapshot(querySnapshot => {
      const users = querySnapshot.docs.map(doc => doc.data());
      setUsers(users);
      console.log(users[0]);
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          {isAdmin ? <CardTable data={users} /> : <h3>Admin restricted</h3>}
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;
