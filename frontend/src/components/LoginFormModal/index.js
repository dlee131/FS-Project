import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <a href="#login" onClick={() => setShowModal(true)} style={{ textDecoration: "none" }}>
          <div className="menu-button">
          Log In
          </div>
        </a>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm />
          </Modal>
        )}
    </>
  );
}

export default LoginFormModal;