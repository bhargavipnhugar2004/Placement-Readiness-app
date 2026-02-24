document.addEventListener('DOMContentLoaded', () => {
    console.log('KodNest Premium Build System Initialized');

    // Copy Prompt functionality
    const copyBtn = document.querySelector('.btn-secondary'); // Simple selector for demo
    const promptBox = document.querySelector('.copyable-prompt');

    if (copyBtn && promptBox && copyBtn.textContent === 'Copy Prompt') {
        copyBtn.addEventListener('click', () => {
            const originalText = copyBtn.textContent;
            navigator.clipboard.writeText(promptBox.textContent.trim()).then(() => {
                copyBtn.textContent = 'Copied';
                copyBtn.style.color = 'var(--success)';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.color = '';
                }, 2000);
            });
        });
    }

    // Proof Footer handling
    const checkboxes = document.querySelectorAll('.proof-item input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const label = e.target.closest('.proof-item');
            if (e.target.checked) {
                label.style.color = 'var(--success)';
                // In a real app, we might prompt for proof input here
                console.log(`Proof provided for: ${label.textContent.trim()}`);
            } else {
                label.style.color = '';
            }
        });
    });

    // Simple interaction feedback
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.98)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'scale(1)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
});
