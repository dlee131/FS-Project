import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <a href="#" onClick={() => setShowModal(true)} style={{ textDecoration: "none" }} className="menu-buttons">Sign Up</a>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;