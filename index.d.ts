declare module 'remaining-network' {
    interface BandwidthData {
        downloadSpeed: number;
        uploadSpeed: number;
        remainingDownload: number;
        remainingUpload: number;
    }

    class BandwidthCalculator {
        constructor(deviceIp: string, community: string, interfaceIndex: number);
        calculateBandwidth(): Promise<BandwidthData>;
    }

    export = BandwidthCalculator;
}