var HID = require('node-hid');

HID.devicesAsync().then(d => {
    console.log(d)
})
