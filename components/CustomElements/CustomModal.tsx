import Modal from 'react-modal';

export default function CustomModal({ children, modalController, aria_label }) {
  const { value: isModalOpen, setFalse: close } = modalController;

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={close}
        style={customStyles}
        contentLabel={aria_label}
      >
        {children}
      </Modal>
    </div>
  );
}
