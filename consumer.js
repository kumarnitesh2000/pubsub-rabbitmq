const amqp = require('amqplib');

async function connect() {
    try{
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const result = channel.assertQueue("jobs");
        channel.consume("jobs", message =>{
            console.log("Reacieved job : " + JSON.parse(message.content.toString()).msg);
            //acknowledgement part :: dequeue
            channel.ack(message);
        })
        console.log('waiting for messages...');
    }
    catch(err){
        console.error(err);
    }
    
}

connect();