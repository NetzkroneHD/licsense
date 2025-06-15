import {Injectable, signal} from '@angular/core';
import {MonitoringData} from './model/monitoring-data.interface';
import {LicenseLogDto} from '@license/license-api-client-typescript-fetch/src/models';
import type {
    ListBehaviorResultDto
} from '@license/license-api-client-typescript-fetch/src/models/ListBehaviorResultDto';

@Injectable({
    providedIn: 'root'
})
export class MonitoringState {

    private readonly loading = signal<boolean>(false);
    private readonly currentDateRangeLogs = signal<LicenseLogDto[]>([]);
    private readonly analyzedData = signal<MonitoringData | undefined>(undefined);
    private readonly selectedBehavior = signal<ListBehaviorResultDto>('ALLOW');

    public readonly getLoading = this.loading.asReadonly();
    public readonly getCurrentDateRangeLogs = this.currentDateRangeLogs.asReadonly();
    public readonly getAnalyzedData = this.analyzedData.asReadonly();
    public readonly getSelectedBehaviorResult = this.selectedBehavior.asReadonly();

    constructor() {
    }

    public setLoading(loading: boolean) {
        this.loading.set(loading);
    }

    public setCurrentDateRangeLogs(logs: LicenseLogDto[]) {
        this.currentDateRangeLogs.set(logs);
    }

    public setAnalyzedData(data: MonitoringData | undefined) {
        this.analyzedData.set(data);
    }

    public setSelectedBehavior(behavior: ListBehaviorResultDto) {
        this.selectedBehavior.set(behavior);
    }



}
