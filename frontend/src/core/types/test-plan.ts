export enum TEST_PLAN_TYPES {
    ThreadGroup = 'threadGroup',
    HttpSampler = 'httpSampler',
    FtpSampler = 'ftpSampler',
}

export interface TestPlanElement<TData> {
    guid: string;
    type: TEST_PLAN_TYPES,
    data?: TData;
}

export interface UpdateTestPlanChildRequest<TData> {
    parentGuid: string;
    guid: string;
    data: TData;
}

export interface AddTestPlanChildRequest<TData> {
    parentGuid: string;
    child: TestPlanElement<TData>;
}



