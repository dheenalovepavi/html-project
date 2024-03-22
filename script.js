document.addEventListener('DOMContentLoaded', function () {
    const splitter = document.getElementById('splitter');
    const codeEditor = document.getElementById('codeEditor');
    const previewContainer = document.getElementById('previewContainer');
    const previewFrame = document.getElementById('previewFrame');

    let isResizing = false;

    splitter.addEventListener('mousedown', function (e) {
        isResizing = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', () => {
            isResizing = false;
            document.removeEventListener('mousemove', handleMouseMove);
        });
    });

    function handleMouseMove(e) {
        if (isResizing) {
            const containerRect = previewContainer.getBoundingClientRect();
            const mouseX = e.clientX;
            const containerLeft = containerRect.left;
            const newWidth = mouseX - containerLeft;
            codeEditor.style.width = `calc(${newWidth}px - 8px)`;
            previewContainer.style.width = `${newWidth}px`;
        }
    }

    // Update the preview when the code changes
    codeEditor.addEventListener('input', function () {
        const code = codeEditor.value;
        const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        previewDoc.open();
        previewDoc.write(code);
        previewDoc.close();
    });
});
