import React, { useState } from "react";
import { Modal } from "../../context/modal";
import SignupForm from "./SignupForm";

function SignupFormModal({ onClose }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      <a
        href="#signup"
        onClick={() => setShowModal(true)}
        style={{ textDecoration: "none" }}
      >
        <div>
          <div className="menu-button">Sign Up</div>
        </div>
      </a>
      {showModal && (
        <Modal onClose={closeModal}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
