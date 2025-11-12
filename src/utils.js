// Add meta info.
export const appendMetaId = (id) => {
    const head = document.head;
    const meta = document.createElement('meta');
    meta.id = id;
    head.appendChild(meta);
}

// Debug log console.
export const dlc = (output) => {
    // TODO: use test_log_console to control logging
    if (output?.trim()) console.info(`GCAssist: ${output}`);
}
