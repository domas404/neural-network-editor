import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNodeGroup() {
  return (
    <>
        <Handle type="target" id="a" position={Position.Left} isConnectable={false} className="hidden" />
          <div
            className="h-full w-24 rounded-lg hover:border-2 hover:border-blue-200 active:border-blue-40 hover:cursor-pointer"
            // onClick={}
          ></div>
        <Handle type="source" id="b" position={Position.Right} isConnectable={false} className="hidden" />
    </>
  );
}

export default memo(CustomNodeGroup);