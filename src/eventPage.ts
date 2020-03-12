chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && /https?:\/\/medium\.com/.test(changeInfo.url)) {
    const active = /https?:\/\/medium\.com\/p\/.*\/edit/.test(changeInfo.url)

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id as number, { active })
    })
  }
})
