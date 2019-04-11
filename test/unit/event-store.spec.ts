"use strict";

import { ServiceBroker, Errors } from "moleculer";
import EventStore from "../../services/event-store.service";

describe("Test 'event-store' service", () => {
	let broker = new ServiceBroker();
	broker.createService(EventStore);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Test 'event-store.hello' action", () => {

		it("should return with 'Hello Moleculer'", () => {
			expect(broker.call("event-store.hello")).resolves.toBe("Hello Moleculer");
		});

	});

	describe("Test 'event-store.welcome' action", () => {

		it("should return with 'Welcome'", () => {
			expect(broker.call("event-store.welcome", { name: "Adam" })).resolves.toBe("Welcome, Adam");
		});

		it("should reject an ValidationError", () => {
			expect(broker.call("event-store.welcome")).rejects.toBeInstanceOf(Errors.ValidationError);
		});

	});

});

