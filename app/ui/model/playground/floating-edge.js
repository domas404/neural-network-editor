import { useCallback } from "react";
import { useStore, getBezierPath, getStraightPath } from "reactflow";

function FloatingEdge({ id, source, target, markerEnd, style }) {
    const sourceNode = useStore(
        useCallback((store) => store.nodeInternals.get(source), [source])
    );
    const targetNode = useStore(
        useCallback((store) => store.nodeInternals.get(target), [target])
    );

    if (!sourceNode || !targetNode) {
        return null;
    }

    const { width: sourceWidth, positionAbsolute: sourcePosition } = sourceNode;
    const { width: targetWidth, positionAbsolute: targetPosition } = targetNode;

    const { x: sourcePosX, y: sourcePosY } = sourcePosition;
    const { x: targetPosX, y: targetPosY } = targetPosition;

    const [edgePath] = getStraightPath({
        sourceX: sourcePosX + sourceWidth/2,
        sourceY: sourcePosY + sourceWidth/2,
        targetX: targetPosX + targetWidth/2,
        targetY: targetPosY + targetWidth/2,
    });

    return (
        <path
            id={id}
            className="stroke-blue-400 stroke-1 active:stroke-sky-500"
            d={edgePath}
            markerEnd={markerEnd}
            style={style}
        />
    );
}

export default FloatingEdge;
