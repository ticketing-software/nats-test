import { Message } from "node-nats-streaming";
import { Listener } from "./listener-abstract";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subject";

class TicketCreated extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;

  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event Data!", data);

    msg.ack();
  }
}

export { TicketCreated };
