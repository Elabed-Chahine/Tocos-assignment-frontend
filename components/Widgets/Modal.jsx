import { useRef, useEffect } from "react";

const Modal = ({ title, children, footer, isFullWidth = false, maxWidth = "600px", isModalOpen, handleClose }) => {
  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }

    handleClose();
  };

  return (
    <>
      <div className="modal">
        <div className="card" ref={node}>
          <div className="header">
            {title ? <h5 className="text-base font-semibold text-right">{title}</h5> : <div />}
            <div className="action-icon back" onClick={handleClose}>
              <i className="fas fa-times"></i>
            </div>
          </div>

          {children && <div className="body">{children}</div>}

          {footer && <div className="footer">{footer}</div>}
        </div>
      </div>

      <style jsx>{`
        .modal {
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          transition: opacity 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          visibility: ${isModalOpen ? "visible" : "hidden"};
          opacity: ${isModalOpen ? 1 : 0};
          z-index: 999;
        }

        .card {
          background: #fff;
          border-radius: 10px;
          width: calc(100% - 64px);
          max-height: calc(100% - 64px);
          padding: 0px;
          overflow: hidden;
          transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          transform: ${isModalOpen ? "none" : "translateY(364px) translateY(0px)"};
          max-width: ${isFullWidth ? "none" : maxWidth};
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 32px;
        }

        .body {
          border-top: 1px solid rgba(0, 0, 0, 0.12);
          padding: 18px 32px;
          padding-bottom: 60px;
          overflow: auto;
          max-height: calc(100vh - 181px);
          position: relative;
        }

        .footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          border-top: 1px solid rgba(0, 0, 0, 0.12);
          padding: 12px 32px;
        }

        h5,
        i {
          color: #172b4d;
        }
      `}</style>
    </>
  );
};

export default Modal;
