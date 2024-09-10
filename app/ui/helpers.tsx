import React, { ReactNode } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { lusitana } from "./font";


export default function CustomModal ({ isOpen, onClose, children } : {isOpen: boolean, onClose: () => void, children: ReactNode}) {
    if (!isOpen) return null;
    return (
        <div className={`${lusitana.className} fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm`}>
            <div className="bg-white p-8 rounded-lg shadow-lg relative max-h-[80vh] overflow-y-auto" style={{ maxWidth: '65%' }}>
                {/* Close button
                
                <button
                onClick={onClose}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-400"
                >
                    <MdOutlineCancel size={24} />
                </button> */}
                {/* Modal content */}
                {children}
            </div>
        </div>
    );
}