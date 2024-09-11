import { db } from '@/app/db';
import { functionalTestCase, testDetails } from '../lib/testdata';
import { NextResponse } from 'next/server';

const client = await db.connect();

async function seedFunctionalTestCases() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS functional (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            setup TEXT,
            procedure JSONB
        )`
    
    const insertedFunctionalTestCases = await Promise.all(
        functionalTestCase.map(async (testcase) => {
            return client.sql`
                INSERT INTO functional (id, title, description, setup, procedure)
                VALUES (${testcase.id}, ${testcase.title}, ${testcase.description}, ${testcase.setup}, ${JSON.stringify(testcase.procedure)}::jsonb)
                ON CONFLICT (id) 
                DO UPDATE SET description = ${testcase.description}, setup = ${testcase.setup}, procedure = ${JSON.stringify(testcase.procedure)}::jsonb
                RETURNING *;
                `;
        }),
    );
    return insertedFunctionalTestCases;
}

async function seedTestDetails() {
    // Create test detail table, which must reference functional test case ID
    // pass_requirement is a placeholder and will need to be replaced at some point.
    // Currently it checks if the text is found within the uploaded log file.
    await client.sql`
    CREATE TABLE IF NOT EXISTS test_detail(
        id                  UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
        functional_id       UUID        NOT NULL,
        description         TEXT        NOT NULL,
        link                TEXT        ,
        pass_requirement    TEXT        ,
        CONSTRAINT fk_functional FOREIGN KEY (functional_id) REFERENCES functional(id)
    )`;
    
    // Also remove "testDetail" row from 'functional' if it exists.
    await client.sql`
    ALTER TABLE functional
    DROP COLUMN IF EXISTS testDetail;
    `;

    const insertedTestDetails = await Promise.all(
        testDetails.map(async (testdetail) => {
            return client.sql`
                INSERT INTO test_detail (id, functional_id, description, link, pass_requirement)
                VALUES (${testdetail.id}, ${testdetail.functional_id}, ${testdetail.description}, ${testdetail.link}, ${testdetail.pass_requirement})
                ON CONFLICT (id)
                DO UPDATE SET functional_id = ${testdetail.functional_id}, description = ${testdetail.description}, link = ${testdetail.link}, pass_requirement = ${testdetail.pass_requirement}
                RETURNING *;
            `;
        })
    );

    return insertedTestDetails;
}


export async function GET() {
    try {
      await client.sql`BEGIN`;
      await seedFunctionalTestCases();
      await seedTestDetails();
      await client.sql`COMMIT`;
  
      return NextResponse.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return NextResponse.json({ error }, { status: 500 });
    }
  }