chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('request: ', request)
})

let active = false
chrome.browserAction.onClicked.addListener(tab => {
  active = !active

  // Send message to content
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id as number, { active })
  })

  // Switch icon
  const path = active ? 'icon_active.png' : 'icon_inactive.png'
  chrome.browserAction.setIcon({
    path,
    tabId: tab.id,
  })
})
