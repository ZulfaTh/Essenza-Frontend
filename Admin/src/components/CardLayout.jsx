const CardLayout = ({ title, items, renderItem }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {items?.length > 0 ? (
          items.map((item, idx) => (
            <div
              key={item._id || idx}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300 w-80"
            >
              {renderItem(item, idx)}
            </div>
          ))
        ) : (
          <p className="col-span-full text-gray-500 text-center">
            No {title.toLowerCase()} found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CardLayout;
