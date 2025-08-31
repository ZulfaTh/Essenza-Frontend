import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import CardLayout from "../../components/CardLayout";

const UsersList = () => {
  const { users, aToken, getAllUsers } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllUsers();
    }
  }, [aToken]);

  return (
    <CardLayout
      title="Customers"
      items={users}
      renderItem={(user) => (
        <>
          <img
            className="w-full h-full object-cover bg-indigo-50 group-hover:opacity-80 transition-all duration-300"
            src={user.image}
            alt="profile"
          />

          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </>
      )}
    />
  );
};

export default UsersList;
