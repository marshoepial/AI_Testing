import { TestCases } from "@/app/lib/definitions";
import { eventNames } from "process";
import React, { useRef, useState } from "react";

export default function TestCaseContents({ testCase } : {testCase: TestCases | undefined}) {
    const [logFile, setLogFile] = useState<File>();

    const logFileUploadRef = useRef<HTMLInputElement>(null);

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

    return (
      <>
        <h2 className="text-2xl font-bold">{testCase?.title}</h2>
        <p className="pt-2"><p className="text-[22px] font-bold">Test Case Description</p>{testCase?.description}</p>

        <>
            <input ref={logFileUploadRef} type="file" onChange={onFileChange} className="hidden" />
            <button
                onClick={handleUploadButtonPress}
                className={"bg-green-400 rounded-lg px-4 py-3 transition-all ease-out-quad duration-500 " + (logFile ? "w-full" : "w-1/4")}
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
        </>
    
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {/*Object.entries(testCase?.testdetail || {}).map(([key, value], index) => (
                <div key={index} className="flex flex-row my-2 justify-between items-center">
                    <li>
                        {value}
                    </li>
                    <div className="bg-green-400 rounded px-2" style={{ cursor: 'pointer' }}>Execute</div>
                </div>
            ))*/}
        </ul>
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