# device-utility-list-electron-vite-vue-ts-forge

Утилита с интерфейсом, выполненная на electron-vite-vue (готовая сборка с различными библиотеками и настройками). Данная nodejs-утилита предназначена для вывода списка устройств компа с помощью библиотеки node-hid
данная утилита поможет отыскать нужные фильтры в navigator браузера.

## Пример кода для подключения устройства в браузере chrome

```js
addEventListener('click', getDevices)
async function getDevices() {
  if ('hid' in navigator) {
    const opts = {
      filters: [
        {
          usagePage: 1
        }
      ]
    }
    const devices = await navigator.hid.requestDevice(opts)
    console.log(devices)
    const device = devices[0]

    await device.open()

    device.addEventListener('inputreport', (event) => {
      // const { data, device, reportId } = event
      console.log(event)
    })
  }
}
```

## Статья-источник

https://habr.com/ru/companies/jugru/articles/685534/
