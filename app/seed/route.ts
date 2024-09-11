import { db } from '@/app/db';
import { functionalTestCase } from '../lib/testdata';
import { NextResponse } from 'next/server';

const client = await db.connect();

async function seedFunctionalTestCases() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS functional (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            testDetail JSONB,
            setup TEXT,
            procedure JSONB
        )`
    
    const insertedFunctionalTestCases = await Promise.all(
        functionalTestCase.map(async (testcase) => {
            return client.sql`
                INSERT INTO functional (id, title, description, testDetail, setup, procedure)
                VALUES (${testcase.id}, ${testcase.title}, ${testcase.description}, ${JSON.stringify(testcase.testDetail)}::jsonb, ${testcase.setup}, ${JSON.stringify(testcase.procedure)}::jsonb)
                ON CONFLICT (id) 
                DO UPDATE SET description = ${testcase.description}, testDetail = ${JSON.stringify(testcase.testDetail)}::jsonb, setup = ${testcase.setup}, procedure = ${JSON.stringify(testcase.procedure)}::jsonb
                RETURNING *;
                `;
        }),
    );
    return insertedFunctionalTestCases;
}


export async function GET() {
    try {
      await client.sql`BEGIN`;
      await seedFunctionalTestCases();
      await client.sql`COMMIT`;
  
      return NextResponse.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return NextResponse.json({ error }, { status: 500 });
    }
  }