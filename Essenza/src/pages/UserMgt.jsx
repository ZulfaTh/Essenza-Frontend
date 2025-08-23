// import React, { useEffect, useState } from "react";
// import axios from "../assets/axios";

// const UserMgt = () => {
//   const [users, setUsers] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     userName:"",
//     appointments:""
//   });
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);

//   useEffect(() => {
//     axios
//       .get("/users")
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     if (user._id) {
//       axios.patch(`/users/${user._id}`, user).then(() => window.location.reload());
//     } else {
//       axios.post("userfs/addUser",user).then(() => window.location.reload());
//     }
//     setOpen(false);
//   };

//   const handleEdit = (user) => {
//     setUser(user);
//     setOpen(true);
//   };

//   const handleDeleteDialogOpen = (user) => {
//     setUserToDelete(user);
//     setOpenDeleteDialog(true);
//   };

//   const handleDelete = () => {
//     axios
//       .delete(`/users/${userToDelete._id}`)
//       .then(() => setUsers(users.filter((u) => u._id !== userToDelete._id)));
//     setOpenDeleteDialog(false);
//   };

//   return (
//     <div className="w-screen h-screen  px-30 py-10">
//     <div className="bg-purple-50 shadow-2xl">
//       {/* Header */}
//       <div className="flex justify-between  px-10 py-3 font-semibold bg-gray-100  rounded">
//         <div> Name</div>
//         <div>Email</div>
//         <div>userName</div>
//          <div>Appointments</div>
//         <div>Actions</div>
//       </div>

     
//       {users.length > 0 ? (
//         users.map((u) => (
//           <div
//             key={u._id}
//             className=" flex justify-between gap-4 px-10 py-3  hover:bg-purple-200 items-center"
//           >
//             <div>{u.name}</div>
//             <div>{u.email}</div>
//              <div>{u.userName}</div>
//              <div>{u.appointments}</div>
//             <div className="flex space-x-3">
//               {/* Edit Icon */}
//               <svg
//                 onClick={() => handleEdit(u)}
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-5 h-5 text-blue-600 cursor-pointer"
//               >
//                 <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
//                 <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
//               </svg>

//               {/* Delete Icon */}
//                <svg
//                 onClick={() => handleDeleteDialogOpen(u)}
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-5 h-5 text-red-600 cursor-pointer"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
             
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="text-center text-gray-500 mt-6">No Users found.</div>
//       )}
//       </div>

//       {/* Add/Edit Modal */}
//       {open && (
//         <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
//             <h2 className="text-xl font-semibold mb-4">
//               {user._id ? "Edit User" : "Add User"}
//             </h2>
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={user.name}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />
//                <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={user.email}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="userName"
//                 placeholder="User Name"
//                 value={user.userName}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />
//                <input
//                 type="text"
//                 name="appointments"
//                 placeholder="Appointments"
//                 value={user.appointments}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />
             
             
//             </div>
//             <div className="flex justify-end mt-4 space-x-2">
//               <div
//                 onClick={() => setOpen(false)}
//                 className="px-4 py-2 bg-red-300 rounded hover:bg-gray-400 cursor-pointer"
//               >
//                 Cancel
//               </div>
//               <div
//                 onClick={handleSubmit}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
//               >
//                 {user._id ? "Update" : "Add"}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {openDeleteDialog && (
//         <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">Delete User</h3>
//             <p className="mb-4">Are you sure you want to delete {userToDelete.name} user?</p>
//             <div className="flex justify-end space-x-2">
//               <div
//                 onClick={() => setOpenDeleteDialog(false)}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
//               >
//                 Cancel
//               </div>
//               <div
//                 onClick={handleDelete}
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-900 cursor-pointer"
//               >
//                 Delete
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Service Button */}
//       <div className="flex justify-end mt-6">
//         <div
//           onClick={() => {
//             setUser({
//               name: "",
//               email:"",
//               appointments:""
//             });
//             setOpen(true);
//           }}
//           className="bg-purple-500 text-white px-5 py-2 rounded hover:bg-purple-900 cursor-pointer"
//         >
//           Add User
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserMgt;
