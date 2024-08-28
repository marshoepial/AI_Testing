const functionalTestCase = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        title: 'LTE/5G NSA Attach and Detach of single UE',
        description: 'The purpose of this test is to validate E2E O-RAN C-plane functionality with a single UE. These tests are valid for either LTE or 5G NSA. In this test scenario, the successful attach and detach procedure shall be validated by the "POWER ON" and "POWER OFF" of a single UE, as described in the following specifications:',
        testDetail: {
            detailOne: 'LTE Attach as per 3GPP TS 23.401, Clause 5.3.2.1 E-UTRAN Initial Attach',
            detailTwo: 'LTE Detach as per 3GPP TS 23.401, Clause 5.3.8.2.1 UE-initiated Detach procedure for E-UTRAN',
            detailThree: '5G NSA Attaach as per 3GPP TS 23.401, Clause 5.3.2.1 E-UTRAN Initial Attach and 3GPP TS 37.340, Clause 10.2.1 EN-DC',
            detailFour: '5G NSA Detach as per 3GPP 23.401, Clause 5.3.8.2.1 UE-initiated Detach procedure for E-UTRAN and 3GPP TS 37.340 Clause 10.4.1 DN-DC',
        },
        setup: 'The test setup is a single cell scenario (i.e. isolated cell without any inter-cell interference) with a stationary UE (real or emulated) placed under excellent radio conditions.',
        procedure: {
            step1: 'Test setup is configured according to the test configuration. The test configuration shall be recorded in the test report. The serving cell under test is activated and unloaded. All other cells are powered off.',
            step2: 'The UE is placed under excellent radio conditions',
            step3: 'The E2E setup for operational for LTE or 5G NSA as applicable for the test scenario, and there should not be any connectivity issues.',
            step4: 'Start the logs to capture the call fow and signalling messages',
            step5: 'Power ON the UE to attach to the LTE or 5G NSA cell. Wait for a successful attach.',
            step6: 'Power off the connected UE to detach from the network. Wait for a sucessful detach.',
            step7: 'Stop and save the test logs. The logs shall be captured and kept for test result reference',
            step8: 'Repeat steps 4 to 7, for a total of 10 times and record the KPIs'
        }
    }
];

export { functionalTestCase }