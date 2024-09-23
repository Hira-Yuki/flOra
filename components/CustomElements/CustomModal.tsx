import { CloseIcon } from '@components/icons';
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
      padding: '16px',
      borderRadius: '16px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)', // 투명한 배경 설정 (완전히 투명)
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
        shouldCloseOnOverlayClick={false}
      >
        <div className="relative p-8">
          <button
            type="button"
            className="absolute top-0 right-0"
            onClick={modalController.setFalse}
          >
            <CloseIcon />
          </button>
          {children}
        </div>
      </Modal>
    </div>
  );
}
