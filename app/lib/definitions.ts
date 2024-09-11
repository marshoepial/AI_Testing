export type TestDetails = {
    id: string,
    functional_id: string,
    description: string,
    link: string,
    pass_requirement: string,
}

export type TestCases = {
    id: string,
    title: string,
    description: string,
    setup: string,
    procedure: Record<string, string>,
}