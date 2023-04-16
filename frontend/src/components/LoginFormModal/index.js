import React, { useState } from "react";
import { Modal } from "../../context/modal";
import LoginForm from "./LoginForm";

function LoginFormModal({ onClose }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      <a
        href="#login"
        onClick={() => setShowModal(true)}
        style={{ textDecoration: "none" }}
      >
        <div className="menu-button">Log In</div>
      </a>
      {showModal && (
        <Modal onClose={closeModal}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
