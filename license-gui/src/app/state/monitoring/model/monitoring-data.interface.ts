import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import type {
    ListBehaviorResultDto
} from '@license/license-api-client-typescript-fetch/src/models/ListBehaviorResultDto';

export interface IpMonitoringEntry {
    ip: string,
    count: number,
    lastLog: Date,
    firstLog: Date,
}

export interface MonitoringData {
    license: LicenseDto,
    timespan: {
        from: Date,
        to: Date
    },
    allowed: IpMonitoringEntry[],
    disallow: IpMonitoringEntry[]
}
