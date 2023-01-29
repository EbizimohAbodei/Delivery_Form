import React from "react";
import {
  cleanup,
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import MockForm from "./MockForm";

import { useState } from "react";
import dayjs from "dayjs";
import app from "../App";
import * as utils from "../utils";

describe("Delivery fee calculation functions", () => {
  it("calculates surcharge for cart value less than 10", () => {
    const surcharge = utils.getSurchargeCart(5);
    expect(surcharge).toBe(5);
  });

  it("returns 0 surcharge for cart value equal to or greater than 10", () => {
    const surcharge = utils.getSurchargeCart(10);
    expect(surcharge).toBe(0);
  });

  it("calculates delivery fee based on distance", () => {
    const deliveryFee = utils.getDeliveryFeeDistance(1500);
    expect(deliveryFee).toBe(4);
  });

  it("calculates surcharge for item less than 5", () => {
    const surcharge = utils.deliverFeeItem(2);
    expect(surcharge).toBe(0);
  });

  it("calculates surcharge for item greater than 12", () => {
    const surcharge = utils.deliverFeeItem(15);
    expect(surcharge).toBe(2.2);
  });

  it("calculates delivery fee for Friday between 3 PM and 7 PM", () => {
    const [date, setDate] = useState<dayjs.Dayjs | null>(
      dayjs("2023-01-27T15:00:00.000Z")
    );
    const totalfee = 10;
    const deliveryFee = utils.getDeliveryFeeFridayRush(totalfee, date, setDate);
    expect(deliveryFee).toBe(12);
  });

  it("returns 0 delivery fee for other days or time", () => {
    const [date, setDate] = useState<dayjs.Dayjs | null>(
      dayjs("2023-01-26T10:00:00.000Z")
    );
    const totalfee = 10;
    const deliveryFee = utils.getDeliveryFeeFridayRush(totalfee, date, setDate);
    expect(deliveryFee).toBe(0);
  });
});
