import { fetchTestDetailsForFuncTest } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

// Gets the test details associated with a functional test case.
// Params:
//      fid: the id of the test case.
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const functional_id = url.searchParams.get("fid");
        
        if (functional_id) {
            const functionalTestCases = await fetchTestDetailsForFuncTest(functional_id);
            return NextResponse.json(functionalTestCases);
        }

        return NextResponse.json({ error: 'No functional test case ID given (fid param)' }, { status: 400 });
        
    } catch (error) {
        console.error('Error fetching functional test cases:', error);
        return NextResponse.json({ error: 'Failed to fetch test cases' }, { status: 500 });
    }
}