import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import "./index.css";

function CustomNode( { data }: any ) {
    let borderColor: string;

    if (data.type === "input"){
        borderColor = "border-r-lightblue-400 dark:border-r-teal-500";
    } else if (data.type === "output") {
        borderColor = "border-r-lightblue-400 dark:border-r-blue-500";
    } else {
        borderColor = "border-r-lightblue-600 dark:border-r-sky-500";
    }

    return (
        <>
            <Handle type="target" id="a" position={Position.Left} isConnectable={false} className="hidden" />
            <div className="w-10 h-10 rounded-full bg-white border-4 border-blue-950 hover:border-blue-500 hover:cursor-pointer
                dark:bg-slate-800 dark:border-blue-300 shadow-md">
                <div className='w-full-h-full neuron-animation-component -rotate-45'>
                    <div className={`w-4 h-8 ml-4 border-4 border-transparent rounded-r-full border-r- ${borderColor}`}></div>
                </div>
            </div>
            <Handle type="source" id="b" position={Position.Right} isConnectable={false} className="hidden" />
        </>
    );
}

export default memo(CustomNode);
