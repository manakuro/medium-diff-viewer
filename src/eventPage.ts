import { isMediumEditURL, isMediumURL } from 'src/utils/isMediumURL'

const sendActiveStatus = (url: string) => {
  if (isMediumURL(url)) {
    const active = isMediumEditURL(url)
    console.log('active: ', active)

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id as number, { active })
    })
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) sendActiveStatus(changeInfo.url)
})
