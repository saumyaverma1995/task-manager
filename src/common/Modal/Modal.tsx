import { ReactNode } from "react";
import styles from "./Modal.module.css";

function Modal({
  children,
  modalClassName,
}: {
  children: ReactNode;
  modalClassName?: string;
}) {
  return (
    <div className={styles.modalWrapper}>
      <div className={modalClassName}>{children}</div>
    </div>
  );
}

export default Modal;
