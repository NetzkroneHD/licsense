import {Injectable} from '@angular/core';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import {IpMonitoringEntry} from '../model/monitoring-data.interface';
import type {
    ListBehaviorResultDto
} from '@license/license-api-client-typescript-fetch/src/models/ListBehaviorResultDto';

@Injectable({
    providedIn: 'root'
})
export class MonitoringAnalyzeService {

    public analyzeLogs(logs: LicenseLogDto[]) {
        return {
            allow: this.analyzeLicenseLogs(logs, 'ALLOW'),
            disallow: this.analyzeLicenseLogs(logs, 'DISALLOW')
        }
    }

    private analyzeLicenseLogs(logs: LicenseLogDto[], listBehavior: ListBehaviorResultDto): IpMonitoringEntry[] {
        if(logs.length === 0) return [];
        const groupedLogs = this.groupLogsByIp(logs, listBehavior);
        return Object.entries(groupedLogs).map(([ip, logs]) => {
            const sorted = logs.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
            const firstLog = sorted[0].dateTime;
            const lastLog = sorted[sorted.length - 1].dateTime;

            return {
                ip: ip,
                count: logs.length,
                firstLog: firstLog,
                lastLog: lastLog
            };
        }).sort((a, b) => b.count - a.count);
    }

    private groupLogsByIp(logs: LicenseLogDto[], listBehavior: ListBehaviorResultDto): Record<string, LicenseLogDto[]> {
        return logs.filter(log => log.listBehaviorResult === listBehavior).reduce((acc, log) => {
            if (!acc[log.ip]) {
                acc[log.ip] = [];
            }
            acc[log.ip].push(log);
            return acc;
        }, {} as Record<string, LicenseLogDto[]>);
    }

}
