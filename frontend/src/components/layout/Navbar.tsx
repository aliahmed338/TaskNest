import React from "react";
import { Button } from "../ui/button";
import { DropdownMenuCheckboxes } from "../DropDownMenu";

const Navbar = () => {
  return (
    <nav className="w-6xl m-auto flex justify-between items-center py-8 ">
      <h2>TaskNest</h2>
      <div className="flex gap-4 ">
        <Button>Login</Button>
        <DropdownMenuCheckboxes />{" "}
      </div>
    </nav>
  );
};

export default Navbar;
