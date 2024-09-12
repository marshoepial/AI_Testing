import { TestDetail } from "@/app/lib/definitions";
import { useState } from "react";

enum TestDetailState {
    UNCHECKED,
    LOADING,
    PASS,
    FAIL
}

export default function TestDetailLine({ detail, logFile } : { detail: TestDetail, logFile: File | undefined }) {
    const [testDetailState, setTestDetailState] = useState(TestDetailState.UNCHECKED);

    const handleTestExecute = async () => {
        if (logFile){
            setTestDetailState(TestDetailState.LOADING);

            try {
                // Get string from log file
                const logStr = await logFile.text();

                const response = await fetch("/api/test-details/execute", {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        id: detail.id,
                        log: logStr,
                    })
                });

                const data = await response.json();

                setTestDetailState(data.pass ? TestDetailState.PASS : TestDetailState.FAIL);
            } catch (error) {
                console.error("Failed to execute test detail: ", error);
            }
        }
    }

    const getExecuteButtonColor = () => {
        switch(testDetailState) {
            case TestDetailState.UNCHECKED: return "bg-lime-200";
            case TestDetailState.PASS: return "bg-green-400";
            case TestDetailState.FAIL: return "bg-red-400";
            default: return "bg-gray-300";
        }
    }

    const getExecuteButtonContents = () => {
        switch(testDetailState) {
            case TestDetailState.UNCHECKED: return "Execute";
            case TestDetailState.PASS: return "Pass";
            case TestDetailState.FAIL: return "Fail";
            case TestDetailState.LOADING: return "Loading";
            default: return "Internal Error";
        }
    }

    return (
        <div className="flex flex-row my-2 justify-between items-center">
            <li>
                {detail.link ? 
                    <a href={detail.link} target="_blank">{detail.description}</a>
                :
                    <>{detail.description}</>
                }
            </li>
            <button 
                className={"rounded px-2 transition-colors duration-200 " + (logFile ? getExecuteButtonColor() : "bg-gray-300")}
                onClick={async () => await handleTestExecute()}
            >
                {getExecuteButtonContents()}
            </button>
        </div>
    )
}