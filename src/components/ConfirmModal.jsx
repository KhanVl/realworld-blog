import React from "react";

const ConfirmModal = ({ open, title, text, onConfirm, onCancel, loading }) => {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-text">{text}</p>
        <div className="modal-actions">
          <button type="button" className="modal-btn" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button
            type="button"
            className="modal-btn modal-btn-danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;