'use client';

import { lusitana } from "@/app/ui/font";
import { useState } from "react";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CustomModal from "@/app/ui/helpers";


export default function Home() {
    const [opened, { open, close }] = useDisclosure(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Simple Modal">
                <p>Modal content</p>
            </Modal>
            <div>
                <p className={`text-[44px] ${lusitana.className}`}>Performance Test Cases</p>
            </div>
            <Button onClick={open}>Open Modal</Button>
            <h1 className="text-3xl font-bold">Custom Modal Example</h1>
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