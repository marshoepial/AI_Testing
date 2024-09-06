export type TestCases = {
    id: string,
    title: string,
    description: string,
    testdetail: Record<string, string>,
    setup: string,
    procedure: Record<string, string>,
}