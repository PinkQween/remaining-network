const snmp = require('snmp-native');

class BandwidthCalculator {
    constructor(deviceIp, community, interfaceIndex) {
        this.deviceIp = deviceIp;
        this.community = community;
        this.interfaceIndex = interfaceIndex;
        this.session = new snmp.Session({ host: this.deviceIp, community: this.community });
    }

    // Method to get SNMP values for specific OIDs
    getSnmpValue(oid) {
        return new Promise((resolve, reject) => {
            this.session.get({ oid }, (err, varbinds) => {
                if (err) reject(err);
                resolve(varbinds[0].value);
            });
        });
    }

    // Method to get initial values (octets and speed)
    async getInitialValues() {
        const inOctetsOid = [1, 3, 6, 1, 2, 1, 2, 2, 1, 10, this.interfaceIndex]; // ifInOctets
        const outOctetsOid = [1, 3, 6, 1, 2, 1, 2, 2, 1, 16, this.interfaceIndex]; // ifOutOctets
        const speedOid = [1, 3, 6, 1, 2, 1, 2, 2, 1, 5, this.interfaceIndex]; // ifSpeed

        const [inOctets, outOctets, speed] = await Promise.all([
            this.getSnmpValue(inOctetsOid),
            this.getSnmpValue(outOctetsOid),
            this.getSnmpValue(speedOid)
        ]);

        return { inOctets, outOctets, speed };
    }

    // Method to calculate bandwidth over a time interval
    async calculateBandwidth() {
        const initial = await this.getInitialValues();

        // Wait for 10 seconds before fetching the next values
        await new Promise(resolve => setTimeout(resolve, 10000));

        const next = await this.getInitialValues();

        // Calculate differences
        const inOctetsDiff = next.inOctets - initial.inOctets;
        const outOctetsDiff = next.outOctets - initial.outOctets;

        // Convert octets to bits per second (bps)
        const downloadSpeed = (inOctetsDiff * 8) / 10; // Download speed in bps
        const uploadSpeed = (outOctetsDiff * 8) / 10;  // Upload speed in bps

        // Calculate remaining bandwidth (bps)
        const remainingDownload = initial.speed - downloadSpeed;
        const remainingUpload = initial.speed - uploadSpeed;

        return {
            downloadSpeed,
            uploadSpeed,
            remainingDownload: Math.max(remainingDownload, 0), // Ensure non-negative
            remainingUpload: Math.max(remainingUpload, 0)     // Ensure non-negative
        };
    }
}

module.exports = BandwidthCalculator;
