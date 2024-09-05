import { sql } from '@vercel/postgres';
import { TestCases } from './definitions';

export async function fetchFunctionalTestCases() {
    try {
        const data = await sql<TestCases>`
        SELECT
            id,
            title,
            description,
            testDetail,
            procedure,
            setup
        FROM functional`;

        const functionalTestCases = data.rows;
        return functionalTestCases;
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch all functional test cases.');
    }
}
