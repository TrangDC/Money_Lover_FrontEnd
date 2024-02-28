import React, { useState } from 'react';

const ExpenseItem = ({ id, description, amount, onDelete }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDelete = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        onDelete(id);
        setShowConfirmation(false);
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <div>
            <div>
                <span>{description}</span>
                <span>{amount}</span>
                <button onClick={handleDelete}>Delete</button>
            </div>
            {showConfirmation && (
                <div>
                    <p>Are you sure you want to delete this expense?</p>
                    <button onClick={confirmDelete}>Receive</button>
                    <button onClick={cancelDelete}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ExpenseItem;
