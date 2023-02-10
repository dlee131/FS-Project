import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <a href="#signup" onClick={() => setShowModal(true)} style={{ textDecoration: "none" }}>
        <div className="menu-buttons">Sign Up
        </div>
      </a>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;