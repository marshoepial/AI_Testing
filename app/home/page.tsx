import { lusitana } from "../ui/font";
import { fetchFunctionalTestCases } from "../lib/data";
import { TestCases } from "../lib/definitions";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

export default async function Home() {
    const functionalTestCases = await fetchFunctionalTestCases();
    // const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            {/* <Modal opened={opened} onClose={close} title="Function Test Case">
                test description
            </Modal> */}
            <div className={`${lusitana.className}`}>
                <p className={`text-[44px] ${lusitana.className}`}>Functional Test Cases</p>
                <div>
                    {functionalTestCases.map((item: TestCases, index) => (
                        <div key={index} style={{ cursor: 'pointer' }} className="rounded-[8px] bg-blue-100 py-1 px-2">
                            <h1 className="text-[23px]">Test Case {index + 1}: {item.title}</h1>
                            {/* <Button onClick={open}>Open Modal</Button> */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}