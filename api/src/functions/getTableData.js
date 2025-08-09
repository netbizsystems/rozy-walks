
// api/getTableData.js
const { app } = require('@azure/functions');
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

app.http('getTableData', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const accountName = "rozywalksstorage"; //process.env.STORAGE_ACCOUNT_NAME;
        const accountKey = "uAW/EbEN9mNhxJ9CWrf3ISihfheejecdjM3bgVMkvk/ZLrnPZPI6bNPRjvRHAGgTM4KY7EpwX7ew+AStNYUfZg=="; //process.env.STORAGE_ACCOUNT_KEY;
        const tableName = "table1";

        const credential = new AzureNamedKeyCredential(accountName, accountKey);
        const client = new TableClient(`https://${accountName}.table.core.windows.net`,    tableName,    credential  );

        const entities = [];
        for await (const entity of client.listEntities()) {
        entities.push(entity);
        }

        //context.res = { status: 200, body: entities, };

        return { body: JSON.stringify({ "table1": entities }) };
    }
});
