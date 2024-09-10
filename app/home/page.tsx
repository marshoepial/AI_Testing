'use client';

import { lusitana } from "../ui/font";
import { TestCases } from "../lib/definitions";
import { useState, useEffect } from "react";
import CustomModal from "../ui/helpers";
import TestCaseContents from "../ui/home/test-cases/test-case";

export default function Home() {
    const [testCase, setTestCase] = useState<TestCases>();
    const [functionalTestCases, setFunctionalTestCases] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (test: TestCases) => {
        setIsModalOpen(true);
        setTestCase(test)
    }
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/functional-test-cases");
                const data = await response.json();
                setFunctionalTestCases(data);
            } catch (error) {
                console.error("Failed to fetch functional test cases:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                <TestCaseContents testCase={testCase}/>
                <button
                    onClick={closeModal}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                    Close
                </button>
            </CustomModal>
            <div className={`${lusitana.className}`}>
                <p className={`text-[44px] ${lusitana.className}`}>Functional Test Cases</p>
                <div>
                    {functionalTestCases.map((item: TestCases, index) => (
                        <div onClick={() => openModal(item)} key={index} style={{ cursor: 'pointer' }} className="rounded-[8px] bg-red-100 py-1 px-2 flex flex-row justify-between items-center">
                            <h1 className="text-[23px]">Test Case {index + 1}: {item.title}</h1>
                            <button
                                onClick={() => openModal(item)}
                                className="bg-red-400 text-white px-4 py-2 rounded-lg mt-0"
                            >
                                Open
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            
        </>
    );
}

