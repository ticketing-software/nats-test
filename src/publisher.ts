import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://ec2-65-0-102-129.ap-south-1.compute.amazonaws.com:4222",
});

stan.on("connect", () => {
  console.log("Publisher Connected to NATS");

  const data = JSON.stringify({
    id: "123",
    title: "concert",
    price: 20,
  });

  stan.publish("ticket:created", data, () => {
    console.log("Event Published");
  });
});
