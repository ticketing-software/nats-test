import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreated } from "./events/ticket-created";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://ec2-65-0-102-129.ap-south-1.compute.amazonaws.com:4222",
});

stan.on("connect", () => {
  console.log("Listener Connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });
  new TicketCreated(stan).listen();

  // const options = stan.subscriptionOptions().setManualAckMode(true);

  // const subscription = stan.subscribe(
  //   "ticket:created",
  //   "order-service-queue-group",
  //   options
  // );

  // subscription.on("message", (msg: Message) => {
  //   console.log("Message Received!!");

  //   const data = msg.getData();

  //   if (typeof data === "string") {
  //     console.log(`Received Event #${msg.getSequence()}, with data: ${data}`);
  //     console.log();
  //   }

  //   msg.ack();
  // });
});

// Graceful Shutdown
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
