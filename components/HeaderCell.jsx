import React from "react";

function HeaderCell({ children }) {
  return (
    <th className="text-center bg-[#dadce0] p-[4px] border border-[#777]">
      {children}
    </th>
  );
}

export default HeaderCell;
