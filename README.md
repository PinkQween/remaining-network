# Remaining Network Bandwidth Calculator

This NPM package calculates the remaining network bandwidth using SNMP (Simple Network Management Protocol).

## Features

- Fetches network bandwidth data using SNMP
- Calculates remaining bandwidth
- Easy to integrate into existing projects

## Installation

```bash
bun install remaining-network
```

## Usage

```javascript
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
```

## Options

- `host`: The IP address of the SNMP-enabled device.
- `community`: The SNMP community string.
- `index`: The index for the network interface.

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Author

Hanna Skairipa