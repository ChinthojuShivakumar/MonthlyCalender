import { FC } from "react";

const Navbar:FC = () => {
  return (
    <div className="w-full flex justify-start gap-5 items-center bg-green-600 py-3 px-10 shadow-lg print:shadow-none">
      <img
        src="/GayatriMata.jpg"
        alt="mata"
        className="w-20 h-20 rounded-full object-fit"
      />
      <h1 className="text-2xl text-white">Sri Gayatri Jyothishyalam</h1>
    </div>
  );
};

export default Navbar;
