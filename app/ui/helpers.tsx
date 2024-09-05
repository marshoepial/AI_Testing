import React, { ReactNode } from "react";


export default function CustomModal ({ isOpen, onClose, children } : {isOpen: boolean, onClose: () => void, children: ReactNode}) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg relative">
                {/* Close button */}
                <button
                onClick={onClose}
                className="absolute top-2 right-2 text-black bg-gray-300 rounded-full p-1 hover:bg-gray-400"
                >
                X
                </button>
                {/* Modal content */}
                {children}
            </div>
        </div>
    );
}