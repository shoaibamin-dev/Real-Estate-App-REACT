const { MongoClient } = require('mongodb');



exports.handler = async (event, context) => {

    const { text, location, site } = event.queryStringParameters

    const uri = "";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const db = client.db('property-scrapers-aws');

        const items1 = await db.collection('aurorabeachfront').find({$or: [ { title: {$regex : text, '$options' : 'i'} },{ description: {$regex : text, '$options' : 'i'} }, { address: {$regex : location, '$options' : 'i'} }, { city: {$regex : location, '$options' : 'i'} }, { country: {$regex : location, '$options' : 'i'}}, { url: {$regex : site, '$options' : 'i'} } ]}).toArray();
        
        const items2 = await db.collection('emeraldinvestmentnica').find({$or: [ { title: {$regex : text, '$options' : 'i'} },{ description: {$regex : text, '$options' : 'i'} }, { address: {$regex : location, '$options' : 'i'} }, { city: {$regex : location, '$options' : 'i'} }, { country: {$regex : location, '$options' : 'i'}}, { url: {$regex : site, '$options' : 'i'} } ]}).toArray();

        const items3 = await db.collection('investnicaragua').find({$or: [ { title: {$regex : text, '$options' : 'i'} },{ description: {$regex : text, '$options' : 'i'} }, { address: {$regex : location, '$options' : 'i'} }, { city: {$regex : location, '$options' : 'i'} }, { country: {$regex : location, '$options' : 'i'}}, { url: {$regex : site, '$options' : 'i'} } ]}).toArray();

        const items4 = await db.collection('nicalifereality').find({$or: [ { title: {$regex : text, '$options' : 'i'} },{ description: {$regex : text, '$options' : 'i'} }, { address: {$regex : location, '$options' : 'i'} }, { city: {$regex : location, '$options' : 'i'} }, { country: {$regex : location, '$options' : 'i'}}, { url: {$regex : site, '$options' : 'i'} } ]}).toArray();

        const items5 = await db.collection('propertynicargua').find({$or: [ { title: {$regex : text, '$options' : 'i'} },{ description: {$regex : text, '$options' : 'i'} }, { address: {$regex : location, '$options' : 'i'} }, { city: {$regex : location, '$options' : 'i'} }, { country: {$regex : location, '$options' : 'i'}}, { url: {$regex : site, '$options' : 'i'} } ]}).toArray();

        const items6= await db.collection('trinityrealestatenicaragua').find({$or: [ { title: {$regex : text, '$options' : 'i'} },{ description: {$regex : text, '$options' : 'i'} }, { address: {$regex : location, '$options' : 'i'} }, { city: {$regex : location, '$options' : 'i'} }, { country: {$regex : location, '$options' : 'i'}}, { url: {$regex : site, '$options' : 'i'} } ]}).toArray();


        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Mongo connected!", items : [...items1, ...items2, ...items3, ...items4, ...items5, ...items6] }),
        }

    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Hello notworld!" })
        }

    } finally {
        await client.close();

    }

}