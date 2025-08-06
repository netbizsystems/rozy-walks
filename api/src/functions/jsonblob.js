

//
const { app } = require('@azure/functions');  
const { BlobServiceClient } = require('@azure/storage-blob');
const { DefaultAzureCredential } = require("@azure/identity");

const connectionString = "DefaultEndpointsProtocol=https;AccountName=rgcgolfers;AccountKey=5MClRIYri1OvVeZt6i08NBQgbR6CzM9LvWILAFnBCrKFwtDZ4UzRmwg99abh2Fzm9NcY9WbMzQHY+ASt4sBxXQ==;EndpointSuffix=core.windows.net"; //process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'golfers';
const blobName = 'golfers.json';

app.http('jsonBlob', {

    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const defaultAzureCredential = new DefaultAzureCredential();

        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString, defaultAzureCredential);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(blobName);
        const downloadBlockBlobResponse = await blobClient.download(0);

        const name = request.query.get('name') || await request.text() || 'world';

        return { headers: {'Content-Type': 'application/json' }, body: downloadBlockBlobResponse.readableStreamBody };
    }
    
});
