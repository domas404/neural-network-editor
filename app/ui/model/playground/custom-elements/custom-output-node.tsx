import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import "./index.css";

const activationColors: { [key: string]: string; } = {
    "sigmoid": "border-r-rose-500",
    "tanh": "border-r-purple-500",
    "relu": "border-r-amber-500",
    "softmax": "border-r-emerald-500",
    "linear": "border-r-lime-500",
}

function CustomOutputNode({ data }: any) {
    return (
        <>
            <Handle type="target" id="a" position={Position.Left} isConnectable={false} className="hidden" />
            <div className="w-10 h-10 rounded-full bg-white
                dark:bg-slate-800 relative">
                <div className='absolute w-10 h-10 border-4 rounded-full border-lightblue-700 dark:border-blue-300 opacity-10'></div>
                <div className='absolute m-1 rounded-full w-8 h-8 border-4 border-lightblue-700 dark:border-blue-300 shadow-[0_0_4px_4px_rgba(147,197,253,0.3)]'>
                    <div className='w-full-h-full neuron-animation-component -rotate-45 relative'>
                        <div className={`w-3 h-6 ml-3 border-4 border-transparent rounded-r-full
                            ${activationColors[data.activation]}`}>
                            <div className='absolute w-6 h-6 bborder-transparent rounded-full -ml-4 -mt-1 rotate-90'>
                                <div className='rounded-r-full bg-white dark:bg-slate-800 ml-3 w-3 h-6'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="w-10 h-10 rounded-full bg-white border-4 border-blue-950 hover:border-blue-500 hover:cursor-pointer
                dark:bg-slate-800 dark:border-blue-300 shadow-md">
                <div className='w-full-h-full neuron-animation-component -rotate-45'>
                    <div className={`w-4 h-8 ml-4 border-4 border-transparent rounded-r-full border-r- border-r-lightblue-400 dark:border-r-blue-500`}></div>
                </div>
            </div> */}
            <Handle type="source" id="b" position={Position.Right} isConnectable={false} className="hidden" />
        </>
    );
}

export default memo(CustomOutputNode);