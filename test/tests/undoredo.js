describe('Undo/Redo behaviors', function() {
    appendTestArea('table_editor_undoredo', true);
    describe('Commands', function () {
        it('Undo. Enter text wait and again enter text. After execute "undo" command. First text should be returned', function() {
            var editor = new Jodit('#table_editor_undoredo', {
                observer: {
                    timeout: 0 // disable delay
                }
            });


            editor.setEditorValue('test');
            editor.setEditorValue('test2');
            editor.execCommand('undo');
            expect(editor.getEditorValue()).to.equal('test');
        });
        it('Redo. Enter text wait and again enter text. After execute "undo" + "redo" command in editor should be second text', function() {
            var editor = new Jodit('#table_editor_undoredo', {
                observer: {
                    timeout: 0
                }
            });

            editor.setEditorValue('test');
            editor.setEditorValue('test2');
            editor.execCommand('undo');
            expect(editor.getEditorValue()).to.equal('test');
            editor.execCommand('redo');
            expect(editor.getEditorValue()).to.equal('test2');
        });
        it('Check react UndoRedo to another changes', function() {
            var editor = new Jodit('#table_editor_undoredo', {
                observer: {
                    timeout: 0
                }
            });


            editor.setEditorValue('test ');
            editor.selection.insertNode(editor.doc.createTextNode('test2'));
            editor.execCommand('undo');
            expect(editor.getEditorValue()).to.equal('test ');
            editor.execCommand('redo');
            expect(editor.getEditorValue()).to.equal('test2test ');
        });
    });
    after(function() {
        table_editor_undoredo.parentNode.removeChild(table_editor_undoredo);
    });
    afterEach(function () {
        var i, keys = Object.keys(Jodit.instances);
        for (i = 0; i < keys.length; i += 1) {
            Jodit.instances[keys[i]].destruct();
        }
    });
});