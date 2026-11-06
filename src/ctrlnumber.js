browser.commands.onCommand.addListener(async function(command) {
    let idx = command.slice(-1) % 9 - 1;
    const allTabs = await browser.tabs.query({ currentWindow: true, hidden: false});
    // Ignore tabs that belong to a tab group (groupId is -1 for ungrouped tabs;
    // undefined on Firefox versions without tab group support).
    const tabs = allTabs.filter(t => t.groupId === undefined || t.groupId === -1);
    if (tabs.length <= idx) {
        idx = tabs.length - 1
    }
    const tab = tabs.slice(idx);
    if (tab.length) {
        browser.tabs.update(tab[0].id, { active: true });
    }
});
