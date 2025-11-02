export interface LicenseSidenavItem {
    id: string;
    icon: { name: string; size: number };
    description: string;
    selected: boolean;
    activity: { count: number } | undefined;
    disabled: { reason: string; state: boolean };
    group: string;
    additionalStyleClass?: string;
    hasCustomOrder: boolean;
}
