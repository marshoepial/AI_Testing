import { lusitana } from "./font";
import React from "react";
import { FaRobot } from "react-icons/fa";

export default function AILogo() {
    return (
        <div className={`${lusitana.className} flex flex-row items-center leading-none text-white`}>
            <FaRobot size={55} color="white" className="m-4"/>
            <p className="text-[44px]">AI-Assisted Testing Application for 5G/NextG RAN</p>
        </div>
    )
}