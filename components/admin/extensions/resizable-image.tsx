import Image from '@tiptap/extension-image';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import React, { useRef, useState, useCallback } from 'react';

const ResizableImageComponent = (props: any) => {
  const [isResizing, setIsResizing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const startResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startWidth = imgRef.current?.clientWidth || 0;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (imgRef.current) {
        const newWidth = Math.max(50, startWidth + (moveEvent.clientX - startX));
        props.updateAttributes({ width: newWidth });
      }
    };

    const onMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [props]);

  return (
    <NodeViewWrapper className="resizable-image-wrapper relative inline-block max-w-full group">
      <img
        ref={imgRef}
        {...props.node.attrs}
        style={{ width: props.node.attrs.width ? `${props.node.attrs.width}px` : 'auto', maxWidth: '100%' }}
        className={`rounded-lg transition-shadow duration-200 ${props.selected ? 'ring-2 ring-blue-500' : ''} ${props.node.attrs.class || ''}`}
        draggable={!isResizing}
        alt={props.node.attrs.alt}
        src={props.node.attrs.src}
      />
      {(props.selected || isResizing) && (
        <div
          className="absolute -right-2 -bottom-2 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize border-2 border-white shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onMouseDown={startResize}
        />
      )}
    </NodeViewWrapper>
  );
};

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: element => element.getAttribute('width'),
        renderHTML: attributes => {
          if (!attributes.width) {
            return {};
          }
          return {
            width: attributes.width,
            style: `width: ${attributes.width}px`,
          };
        },
      },
    };
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});
