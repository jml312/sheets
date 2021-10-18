import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { VscGraphLine } from "react-icons/vsc";
import { FaInfoCircle } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import HomeModal from "components/modals/HomeModal";
import GraphModal from "components/modals/GraphModal";
import InstructionsModal from "components/modals/InstructionsModal";
import SaveModal from "components/modals/SaveModal";

function ActionsButton({ slug }) {
  const [isHomeModalOpen, setIsHomeModalOpen] = useState(false);
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  return (
    <div className="dropdown dropdown-hover dropdown-top dropdown-end fixed bottom-2 right-2">
      <HomeModal isOpen={isHomeModalOpen} setIsOpen={setIsHomeModalOpen} />
      <GraphModal isOpen={isGraphModalOpen} setIsOpen={setIsGraphModalOpen} />
      <InstructionsModal
        isOpen={isInstructionsModalOpen}
        setIsOpen={setIsInstructionsModalOpen}
      />
      <SaveModal
        isOpen={isSavedModalOpen}
        setIsOpen={setIsSavedModalOpen}
        slug={slug}
      />
      <div tabIndex="0" className="m-1 btn">
        <GiHamburgerMenu />
      </div>
      <ul
        tabIndex="0"
        className="p-2 menu dropdown-content bg-base-100 rounded-box w-52 border-2 border-gray-200 shadow-lg"
      >
        <li>
          <button
            className="action-btn"
            onClick={() => setIsHomeModalOpen(true)}
          >
            <AiFillHome />
            &nbsp; Go Home
          </button>
        </li>
        <li>
          <button
            className="action-btn stroke-0"
            onClick={() => setIsInstructionsModalOpen(true)}
          >
            <FaInfoCircle />
            &nbsp; Instructions
          </button>
        </li>
        <li>
          <button
            className="action-btn"
            onClick={() => setIsGraphModalOpen(true)}
          >
            <VscGraphLine className="stroke-1" />
            &nbsp; Line Graph
          </button>
        </li>
        <li>
          <button
            className="action-btn"
            onClick={() => setIsSavedModalOpen(true)}
          >
            <FaSave />
            &nbsp; Save Sheet
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ActionsButton;
