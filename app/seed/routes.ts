import { db } from '@vercel/postgres';


const client = await db.connect();

async function seedFunctionalTestCases() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS functional (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL
            testDetail JSONB,
            setup VARCHAR(255),
            procedure VARCHAR(255) NOT NULL,
        )`
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await seedFunctionalTestCases();
        await client.sql`COMMIT`;

        return Response.json({ message: 'Database seeded successfully'});
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
    }
}

async function seedPerformanceTestCase() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS performance (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            
        )
    `
}