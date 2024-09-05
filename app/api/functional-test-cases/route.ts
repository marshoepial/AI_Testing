import { NextResponse } from 'next/server';
import { fetchFunctionalTestCases } from '@/app/lib/data';

export async function GET() {
    try {
        const functionalTestCases = await fetchFunctionalTestCases();
        return NextResponse.json(functionalTestCases);
    } catch (error) {
        console.error('Error fetching functional test cases:', error);
        return NextResponse.json({ error: 'Failed to fetch test cases' }, { status: 500 });
    }
}