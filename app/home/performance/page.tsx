'use client';

import { lusitana } from "@/app/ui/font";
import { useState } from "react";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CustomModal from "@/app/ui/helpers";


export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div>
                <p className={`text-[44px] ${lusitana.className}`}>Performance Test Cases</p>
            </div>
            <button
                onClick={openModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            >
                Open Modal
            </button>

            {/* Modal */}
            <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-2xl font-bold">Modal Title</h2>
                <p>This is the content of the custom modal.</p>
                <button
                    onClick={closeModal}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                    Close Modal
                </button>
            </CustomModal>
        </>
        
    );
}