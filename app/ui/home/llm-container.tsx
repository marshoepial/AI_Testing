'use client'

import { SetStateAction, useState } from "react";
import { lusitana } from '../font';

export default function LLMContainer() {
    const [inputvalue, setInputValue] = useState('');

    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Submitted value:', inputvalue);
    };

    return (
        <div className="flex flex-col flex-[2] md:px-2 p-4 w-full box-border rounded-[14px] m-2 bg-black">
            <div className={`${lusitana.className} text-[22px] p-2 rounded-md text-md box-border bg-blue-600 text-white`}>
                Interact with AI5G to discover more details about the test cases...
            </div>
            <div className="bg-gray-100 h-full my-2 p-2 flex flex-col justify-between">
                <div></div>
                <form onSubmit={handleSubmit} className="w-full box-border">
                    <label className="w-full block">
                        <input
                            className="w-full bg-white rounded p-3 box-border"
                            type="text"
                            value={inputvalue}
                            onChange={handleInputChange}
                            placeholder="Ask related question..."

                        />
                    </label>
                </form>               
            </div>
        </div>
    );
}