import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import "./index.css";

function CustomNode( { data }: any ) {
    let borderColor: string;

    if (data.type === "input"){
        borderColor = "border-r-lightblue-400";
    } else if (data.type === "output") {
        borderColor = "border-r-lightblue-400";
    } else {
        borderColor = "border-r-lightblue-600";
    }

    return (
        <>
            <Handle type="target" id="a" position={Position.Left} isConnectable={false} className="hidden" />
            <div className="w-10 h-10 rounded-full bg-white border-4 border-blue-950 hover:border-blue-500 hover:cursor-pointer">
                <div className='w-full-h-full neuron-animation-component -rotate-45'>
                    <div className={`w-4 h-8 ml-4 border-4 border-transparent rounded-r-full border-r- ${borderColor}`}></div>
                </div>
            </div>
            <Handle type="source" id="b" position={Position.Right} isConnectable={false} className="hidden" />
        </>
    );
}

export default memo(CustomNode);
