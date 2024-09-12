import { TestCases, TestDetails } from "@/app/lib/definitions";
import React, { useEffect, useRef, useState } from "react";

export default function TestCaseContents({ testCase } : {testCase: TestCases | undefined}) {
    const [logFile, setLogFile] = useState<File>();
    const [testDetails, setTestDetails] = useState<Array<TestDetails>>();

    const logFileUploadRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (testCase){
            const fetchTestDetails = async () => {
                try {
                    const response = await fetch(`/api/test-details?fid=${testCase.id}`);
                    const data = await response.json();

                    const testDetails: Array<TestDetails> = data.map((detail: any) => {
                        return {
                            id: detail.id,
                            functional_id: detail.functional_id,
                            description: detail.description,
                            link: detail.link,
                            pass_requirement: detail.pass_requirement
                        };
                    });

                    setTestDetails(testDetails);
                } catch (error) {
                    console.error("Failed to fetch test case details: ", error);
                }
            }

            fetchTestDetails();
        }
    }, [testCase]);

    const handleUploadButtonPress = () => {
        if (logFileUploadRef.current) {
            logFileUploadRef.current.click();
        }
    }

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setLogFile(event.target.files[0]);
        }
    }

    const handleTestExecute = (id: number) => {
        
    }

    return (
      <>
        <h2 className="text-2xl font-bold">{testCase?.title}</h2>
        <p className="pt-2"><p className="text-[22px] font-bold">Test Case Description</p>{testCase?.description}</p>

        <div className={"my-4 p-4 rounded-md border-2 border-gray-400"}>
            <input ref={logFileUploadRef} type="file" onChange={onFileChange} className="hidden" />
            <button
                onClick={handleUploadButtonPress}
                className={"rounded-lg px-4 py-3 transition-all ease-out-quad duration-500 " + (logFile ? "bg-green-400 w-full" : "bg-lime-200 w-1/4")}
            >
                {logFile ? 
                    <>
                        {logFile.name} opened!
                    </> : 
                    <>
                        📜 Upload log file...
                    </>
                }
            </button>

            <ul className={"pt-3"} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                {testDetails ? testDetails.map((detail) => (
                    <div key={detail.id} className="flex flex-row my-2 justify-between items-center">
                        <li>
                            {detail.link ? 
                                <a href={detail.link} target="_blank">{detail.description}</a>
                            :
                                <>{detail.description}</>
                            }
                        </li>
                        <div className={"rounded px-2 transition-colors duration-200 " + (logFile ? "bg-green-400" : "bg-gray-300")} style={{ cursor: 'pointer' }}>Execute</div>
                    </div>
                ))
                :
                <p>Loading...</p>}
            </ul>
        </div>
    
        <p className="pt-2 font-bold text-[22px]">Set Up</p>
        <p>{testCase?.setup}</p>
        <p className="pt-2 font-bold text-[22px]">Procedures</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {Object.entries(testCase?.procedure || {}).map(([key, value], index) => (
                <li key={index} className="items-center">
                    {value}
                </li>
            ))}
        </ul>
      </>  
    );
}