import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import "./index.css";

function CustomInputNode() {
    return (
        <>
            <Handle type="target" id="a" position={Position.Left} isConnectable={false} className="hidden" />
            <div className="w-10 h-10 rounded-full bg-white
                dark:bg-slate-800 relative">
                    <div className='absolute w-10 h-10 border-4 rounded-full border-lightblue-700 dark:border-blue-300 opacity-10'></div>
                    <div className='absolute m-1 rounded-full w-8 h-8 border-4 border-lightblue-700 dark:border-blue-300 shadow-[0_0_4px_4px_rgba(147,197,253,0.3)]'></div>
                {/* <div className='w-full-h-full neuron-animation-component -rotate-45'>
                    <div className={`w-4 h-8 ml-4 border-4 border-transparent rounded-r-full border-r- dark:border-r-teal-500`}></div>
                </div> */}
            </div>
            <Handle type="source" id="b" position={Position.Right} isConnectable={false} className="hidden" />
        </>
    );
}

export default memo(CustomInputNode);