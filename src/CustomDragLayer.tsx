import { useDragLayer } from "react-dnd";
import { Column } from "./Column";
import { CustomDragLayerContainer, DragPreviewWrapper } from "./styles";
import { useAppState } from "./state/AppStateContext";

type Position = {
    x: number;
    y: number;
  };
  

export const CustomDragLayer = () => {
    const { draggedItem } = useAppState();
    const { currentOffset } = useDragLayer((monitor) => ({
        currentOffset: monitor.getSourceClientOffset() as Position
    }))

    return draggedItem && currentOffset ? (
        <CustomDragLayerContainer>
            <DragPreviewWrapper position={ currentOffset}>
                <Column
                    id={draggedItem.id}
                    text={draggedItem.text}
                    isPreview
                />
            </DragPreviewWrapper>
        </CustomDragLayerContainer>
    ) : null
}