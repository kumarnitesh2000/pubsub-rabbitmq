const amqp = require('amqplib');
const msg = {
    "msg": process.argv[2]
}

async function connect() {
    try{
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const result = channel.assertQueue("jobs");
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(msg)));
        console.log(`Job Published ${msg.msg}`);
    }
    catch(err){
        console.error(err);
    }
    
}


connect();