import "./Modal.css";

interface ModalProps {
  show: boolean;
  children: React.ReactNode;
}

export const Modal = ({ show, children, }: ModalProps) => {
  return (
    <div className={`modal-${show ? "show" : "hide"}`}>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};