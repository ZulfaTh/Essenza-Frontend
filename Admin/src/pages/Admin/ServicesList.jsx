import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import CardLayout from "../../components/CardLayout";
import { AppContext } from "../../context/AppContext";

const ServicesList = () => {
  const { services, getAllServices, editService, deleteService } =
    useContext(AdminContext);

  const { currency } = useContext(AppContext);

  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);

  useEffect(() => {
    getAllServices();
  }, [getAllServices]);

  const handleEdit = (service) => {
    setEditingService(service);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingService.name || !editingService.price) {
      alert("Service name and price are required");
      return;
    }

    const formData = new FormData();
    formData.append("serviceId", editingService._id);
    formData.append("name", editingService.name);
    formData.append("about", editingService.about);
    formData.append("duration", editingService.duration);
    formData.append("price", editingService.price);
    if (editingService.imageFile)
      formData.append("image", editingService.imageFile);

    await editService(editingService._id, formData);
    setEditingService(null);
  };

  const handleDelete = async () => {
    await deleteService(deletingService._id);
    setDeletingService(null);
  };

  return (
    <>
      <CardLayout
        title="Services"
        items={services}
        renderItem={(service) => (
          <div className="flex flex-col gap-2">
            <img
              className="w-full h-48 object-cover bg-gray-50 group-hover:opacity-80 transition-all duration-300 rounded"
              src={service.image}
              alt={service.name}
            />
            <h3 className="font-semibold text-lg">{service.name}</h3>
            <p className="text-sm text-gray-500">{service.about}</p>
            <p className="text-md text-gray-900">
              Duration: {service.duration}
            </p>
            <p className="text-md text-gray-900">
              Price: {currency}.{service.price}
            </p>

            <div className="flex justify-end gap-3 mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-blue-800"
                onClick={() => handleEdit(service)}
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6 text-red-500"
                onClick={() => setDeletingService(service)}
              >
                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                <path
                  fillRule="evenodd"
                  d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )}
      />

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white p-6 rounded shadow-md w-96 flex flex-col gap-3"
          >
            <h2 className="text-xl font-bold">Edit Service</h2>

            {/* Image Preview */}
            <img
              src={
                editingService.imageFile
                  ? URL.createObjectURL(editingService.imageFile)
                  : editingService.image
              }
              alt={editingService.name}
              className="w-full h-40 object-cover rounded"
            />

            <input
              type="text"
              value={editingService.name}
              onChange={(e) =>
                setEditingService({ ...editingService, name: e.target.value })
              }
              placeholder="Service Name"
              className="border p-2 rounded"
            />
            <textarea
              value={editingService.about}
              onChange={(e) =>
                setEditingService({ ...editingService, about: e.target.value })
              }
              placeholder="About"
              className="border p-2 rounded"
            />
            <input
              type="text"
              value={editingService.duration}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  duration: e.target.value,
                })
              }
              placeholder="Duration (minutes)"
              className="border p-2 rounded"
            />
            <input
              type="number"
              value={editingService.price}
              onChange={(e) =>
                setEditingService({ ...editingService, price: e.target.value })
              }
              placeholder="Price"
              className="border p-2 rounded"
            />
            <input
              type="file"
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  imageFile: e.target.files[0],
                })
              }
            />

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                className="px-4 py-1 bg-gray-400 text-white rounded"
                onClick={() => setEditingService(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 bg-green-500 text-white rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingService && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-red-600">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deletingService.name}</strong> service?
            </p>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setDeletingService(null)}
                className="px-4 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesList;
