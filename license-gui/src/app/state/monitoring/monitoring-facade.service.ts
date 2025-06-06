import {inject, Injectable} from '@angular/core';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {MonitoringState} from './monitoring-state.service';
import {LicenseApiService} from '../../api/service/license-api.service';
import {MonitoringAnalyzeService} from './service/monitoring-analyze.service';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import {MonitoringData} from './model/monitoring-data.interface';
import type {
    ListBehaviorResultDto
} from '@license/license-api-client-typescript-fetch/src/models/ListBehaviorResultDto';

@Injectable({
    providedIn: 'root'
})
export class MonitoringFacade {

    private readonly state = inject(MonitoringState);
    private readonly logService = inject(LicenseApiService);
    private readonly analyzeService = inject(MonitoringAnalyzeService);

    public analyzeLicenseLogs(license: LicenseDto, from: Date, to: Date, listBehavior: ListBehaviorResultDto) {
        this.state.setLoading(true)
        this.logService.getLicenseLogs(license.licenseKey, from, to)
            .then(logs => {
                this.state.setCurrentDateRangeLogs(logs);
                this.setMonitoringData(license, logs, from, to, listBehavior);
            })
            .catch(reason => {

            })
            .finally(() => {
                this.state.setLoading(false);
            });
    }

    private setMonitoringData(license: LicenseDto, logs: LicenseLogDto[], from: Date, to: Date, listBehavior: ListBehaviorResultDto): void {
        const analyzedEntries = this.analyzeService.analyzeLicenseLogs(logs, listBehavior);
        const data: MonitoringData = {
            license: license,
            listBehavior: listBehavior,
            timespan: {
                from: from,
                to: to
            },
            ipMonitoring: analyzedEntries
        }
        this.state.setAnalyzedData(data);
    }

}
