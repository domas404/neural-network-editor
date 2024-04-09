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

function CustomHiddenNode({ data }: any) {
    return (
        <>
            <Handle type="target" id="a" position={Position.Left} isConnectable={false} className="hidden" />
            <div className="w-9 h-9 m-[2px] rounded-full bg-white border-4 border-lightblue-700
                dark:bg-slate-800 dark:border-blue-300 shadow-[0_0_2px_2px_rgba(255,255,255,0.2)]">
                <div className='w-full-h-full neuron-animation-component -rotate-45 relative'>
                    <div className={`w-[14px] h-[28px] ml-[14px] border-4 border-transparent rounded-r-full
                        ${activationColors[data.activation]}`}>
                        <div className='absolute w-[28px] h-[28px] bborder-transparent rounded-full -ml-[18px] -mt-1 rotate-90'>
                            <div className='rounded-r-full bg-white dark:bg-slate-800 ml-[14px] w-[14px] h-[28px]'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Handle type="source" id="b" position={Position.Right} isConnectable={false} className="hidden" />
        </>
    );
}

export default memo(CustomHiddenNode);