import { Node, mergeAttributes } from '@tiptap/core';

export const ColumnBlock = Node.create({
  name: 'columnBlock',
  group: 'block',
  content: 'column{2}', // Exactly 2 columns
  
  parseHTML() {
    return [
      { tag: 'div[data-type="column-block"]' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'column-block', class: 'flex flex-col md:flex-row gap-4 my-4 w-full' }), 0];
  },

  addCommands() {
    return {
      setColumnBlock: () => ({ commands }) => {
        return commands.insertContent(`
          <div data-type="column-block">
            <div data-type="column"><p></p></div>
            <div data-type="column"><p></p></div>
          </div>
        `);
      },
    };
  },
});

export const Column = Node.create({
  name: 'column',
  content: 'block+',
  
  parseHTML() {
    return [
      { tag: 'div[data-type="column"]' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'column', class: 'flex-1 min-w-0 border border-dashed border-gray-200 hover:border-blue-300 rounded p-2 transition-colors' }), 0];
  },
});
