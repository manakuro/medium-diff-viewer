import { isMediumEditURL, isMediumURL } from 'src/utils/isMediumURL'

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && isMediumURL(changeInfo.url)) {
    const active = isMediumEditURL(changeInfo.url)

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id as number, { active })
    })
  }
})
