const BandwidthCalculator = require('./index');

// Replace with your SNMP device IP, community string, and interface index
const deviceIp = '127.0.0.1';
const community = 'public';
const interfaceIndex = 16; // Assuming en0

const calculator = new BandwidthCalculator(deviceIp, community, interfaceIndex);

calculator.calculateBandwidth()
    .then(data => {
        console.log(`Download Speed: ${data.downloadSpeed} bps`);
        console.log(`Upload Speed: ${data.uploadSpeed} bps`);
        console.log(`Remaining Download Bandwidth: ${data.remainingDownload} bps`);
        console.log(`Remaining Upload Bandwidth: ${data.remainingUpload} bps`);
    })
    .catch(error => console.error('Error calculating bandwidth:', error));
