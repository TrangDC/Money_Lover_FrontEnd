import React, { useState } from 'react';
import axios from 'axios';

const ExpenseItem = ({ id, description, amount, onDelete }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`/${id}`);
            onDelete(id);
        } catch (error) {
            console.error('Error while deleting record:', error);
        } finally {
            setLoading(false);
            setShowConfirmation(false);
        }
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <div>
            <div>
                <span>{description}</span>
                <span>{amount}</span>
                <button onClick={handleDelete} disabled={loading}>Delete</button>
            </div>
            {showConfirmation && (
                <div>
                    <p>Are you sure you want to delete this account?</p>
                    <button onClick={confirmDelete} disabled={loading}>Receive</button>
                    <button onClick={cancelDelete} disabled={loading}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ExpenseItem;
