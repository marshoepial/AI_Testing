import { sql } from '@/app/db';
import { TestCases, TestDetails } from './definitions';

export async function fetchFunctionalTestCases() {
    try {
        const data = await sql.query<TestCases>(`
        SELECT
            id,
            title,
            description,
            procedure,
            setup
        FROM functional`);

        const functionalTestCases = data.rows;
        return functionalTestCases;
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch all functional test cases.');
    }
}

export async function fetchTestDetailsForFuncTest(functional_id: string) {
    try {
        const data = await sql.query<TestDetails>(`
            SELECT
                id,
                functional_id,
                description,
                link,
                pass_requirement
            FROM test_detail
            WHERE functional_id = '${functional_id}'`);

        const testDetails = data.rows;
        return testDetails;
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch all test details.');
    }
}

export async function fetchTestDetail(id: string) {
    try {
        // There should only be one entry per id (primary key)
        const data = await sql.query<TestDetails>(`
            SELECT
                id,
                functional_id,
                description,
                link,
                pass_requirement
            FROM test_detail
            WHERE id = '${id}'
            LIMIT 1`);

        const testDetail = data.rows;
        return testDetail[0];
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch test detail, id '+id);
    }
}
