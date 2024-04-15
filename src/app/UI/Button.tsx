import React from "react";

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }
> = ({ children, active = false, ...props }) => {
  return (
    <button
      {...props}
      type="button"
      className={`rounded-md ${ active ? 'bg-gray-500': 'bg-blue-600' } px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
    >
      {children}
    </button>
  );
};

export default Button;
