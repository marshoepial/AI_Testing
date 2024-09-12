import { fetchTestDetail } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

// /test-details/execute; a POST function to test a log file against a test detail (line item)
// Accepts JSON request body, in the following format.
// {
//      id:  string     [the id of the test detail]
//      log: string     [the contents of the log file]
//}
//
// Returns JSON response, in the following format.
//{
//      pass: bool      [whether the log passes the test detail check]
//}
// It may be a better idea to create a method of file upload to the server
// so that logs are only uploaded one time rather than sent every time a test is executed.
export async function POST(request: NextRequest) {
    try {
        // Get the request body
        const body = await request.json();

        // Get the test detail refereced in the body
        const detail = await fetchTestDetail(body.id);
        // and get the contents of the log file
        const log: String = body.log;

        // PLACEHOLDER LOGIC!
        // Check if the log contains the pass requirement        
        if (log.includes(detail.pass_requirement)) {
            return NextResponse.json({ pass: true }, { status: 200 });
        } else {
            return NextResponse.json({ pass: false }, { status: 200 });
        }

    } catch (error) {
        console.error('Error executing test detail test: ', error);
        return NextResponse.json({ error: 'Failed to execute test detail test' }, { status: 500 });
    }
}