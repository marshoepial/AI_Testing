'use client';

import { lusitana } from "../ui/font";
import { TestCases } from "../lib/definitions";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Textarea } from "@mantine/core";
import { useState, useEffect } from "react";

export default function Home() {
    // const functionalTestCases = await fetchFunctionalTestCases();
    const [opened, { open, close }] = useDisclosure(true);
    const [value, setValue] = useState('')
    const [functionalTestCases, setFunctionalTestCases] = useState([]);

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

    const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Modal with scroll</p>);

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="Function Test Case"
                centered
                fullScreen
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }} 
            >
                <p>This is the content of the modal. Test Case description or details will go here.</p>
                {content}
            </Modal>
            <div className={`${lusitana.className}`}>
                <p className={`text-[44px] ${lusitana.className}`}>Functional Test Cases</p>
                <div>
                    {functionalTestCases.map((item: TestCases, index) => (
                        <div onClick={() => {
                            console.log('Modal state:', opened);
                            open();
                        }} key={index} style={{ cursor: 'pointer' }} className="rounded-[8px] bg-red-100 py-1 px-2">
                            <h1 className="text-[23px]">Test Case {index + 1}: {item.title}</h1>
                            <Button style={{ background: 'red', color: 'white', padding: 10, borderRadius: 8}} onClick={open}>Open Modal</Button>
                        </div>
                    ))}
                </div>
            </div>
            
        </>
    );
}

