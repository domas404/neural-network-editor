import { useCallback } from "react";
import { useStore, getStraightPath, EdgeProps } from "reactflow";

function FloatingEdge({ id, source, target, markerEnd, style }: EdgeProps) {

    const sourceNode = useStore(
        useCallback((store) => store.nodeInternals.get(source), [source])
    );
    const targetNode = useStore(
        useCallback((store) => store.nodeInternals.get(target), [target])
    );

    if (!sourceNode || !targetNode) {
        return null;
    }

    const sourceWidth = sourceNode?.width || 0;
    const sourcePosition = sourceNode?.positionAbsolute;
    const targetWidth = targetNode?.width || 0;
    const targetPosition = targetNode?.positionAbsolute;

    const sourcePosX = sourcePosition?.x || 0;
    const sourcePosY = sourcePosition?.y || 0;
    const targetPosX = targetPosition?.x || 0;
    const targetPosY = targetPosition?.y || 0;

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
