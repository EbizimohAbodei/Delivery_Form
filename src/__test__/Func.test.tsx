import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { default as dayjs } from "dayjs";

const today = dayjs().format("DD/MM/YYYY hh:mm A");

describe("errors", () => {
  it("cart value should throw error if its  value is 0", async () => {
    render(<App />);

    const cartValue = screen.getByTestId("cart-value");

    const cartValueInput = screen
      .getByTestId("cart-value")
      .querySelector("input") as HTMLInputElement;
    const deliveryDistance = screen
      .getByTestId("delivery-distance")
      .querySelector("input") as HTMLInputElement;
    const amount = screen
      .getByTestId("amount")
      .querySelector("input") as HTMLInputElement;
    const date = screen.getByTestId("date");
    const button = screen.getByTestId("submit-button");

    userEvent.type(cartValueInput, "0");
    userEvent.type(amount, "10");
    userEvent.type(deliveryDistance, "10");
    userEvent.type(date, today);
    userEvent.click(button);

    expect(cartValueInput).toHaveAttribute("aria-invalid", "true");

    expect(cartValue).toHaveClass("Mui-error");
  });

  it("delivery distance should throw error if its  value is 0", async () => {
    render(<App />);

    const cartValueInput = screen
      .getByTestId("cart-value")
      .querySelector("input") as HTMLInputElement;
    const deliveryDistance = screen
      .getByTestId("delivery-distance")
      .querySelector("input") as HTMLInputElement;
    const amount = screen
      .getByTestId("amount")
      .querySelector("input") as HTMLInputElement;
    const date = screen.getByTestId("date");
    const button = screen.getByTestId("submit-button");

    userEvent.type(cartValueInput, "300");
    userEvent.type(amount, "10");
    userEvent.type(deliveryDistance, "0");
    userEvent.type(date, today);
    userEvent.click(button);

    expect(deliveryDistance).toHaveAttribute("aria-invalid", "true");
    expect(deliveryDistance.parentElement).toHaveClass("Mui-error");
  });

  it("amount should throw error if its  value is 0", async () => {
    render(<App />);

    const cartValueInput = screen
      .getByTestId("cart-value")
      .querySelector("input") as HTMLInputElement;
    const deliveryDistance = screen
      .getByTestId("delivery-distance")
      .querySelector("input") as HTMLInputElement;
    const amount = screen
      .getByTestId("amount")
      .querySelector("input") as HTMLInputElement;
    const date = screen.getByTestId("date");
    const button = screen.getByTestId("submit-button");

    userEvent.type(cartValueInput, "300");
    userEvent.type(amount, "0");
    userEvent.type(deliveryDistance, "1000");
    userEvent.type(date, today);
    userEvent.click(button);

    expect(amount).toHaveAttribute("aria-invalid", "true");
    expect(amount.parentElement).toHaveClass("Mui-error");
  });
});

describe("surcharge  for delivery distance", () => {
  it("it should return a 2.00 € delivery fee if the delivery distance is less than  a 1000m, amount of item is less than 5 and cart value is greater than 10", async () => {
    render(<App />);
    const deliveryFee = screen.getByTestId("fee");

    const cartValueInput = screen
      .getByTestId("cart-value")
      .querySelector("input") as HTMLInputElement;
    const deliveryDistance = screen
      .getByTestId("delivery-distance")
      .querySelector("input") as HTMLInputElement;
    const amount = screen
      .getByTestId("amount")
      .querySelector("input") as HTMLInputElement;
    const date = screen.getByTestId("date");
    const button = screen.getByTestId("submit-button");

    userEvent.type(cartValueInput, "1100");
    userEvent.type(amount, "3");
    userEvent.type(deliveryDistance, "500");
    userEvent.type(date, today);
    userEvent.click(button);

    expect(deliveryFee.textContent).toBe("2.00 €");
    // screen.debug(deliveryDistance);
  });

  it("it should add an additional 1.00 € delivery fee for every 500m if the delivery fee is above 1000m", async () => {
    render(<App />);
    const deliveryFee = screen.getByTestId("fee");

    const cartValueInput = screen
      .getByTestId("cart-value")
      .querySelector("input") as HTMLInputElement;
    const deliveryDistance = screen
      .getByTestId("delivery-distance")
      .querySelector("input") as HTMLInputElement;
    const amount = screen
      .getByTestId("amount")
      .querySelector("input") as HTMLInputElement;
    const date = screen.getByTestId("date");
    const button = screen.getByTestId("submit-button");

    userEvent.type(cartValueInput, "1100");
    userEvent.type(amount, "3");
    userEvent.type(deliveryDistance, "1500");
    userEvent.type(date, today);
    userEvent.click(button);

    expect(deliveryFee.textContent).toBe("3.00 €");
    // screen.debug(deliveryDistance);
  });
});

describe("Cart Value", () => {
  it("it should return a the base delivery fee (2 EUR) if cart value is greater than 10€", async () => {
    render(<App />);
    const deliveryFee = screen.getByTestId("fee");

    const cartValueInput = screen
      .getByTestId("cart-value")
      .querySelector("input") as HTMLInputElement;
    const deliveryDistance = screen
      .getByTestId("delivery-distance")
      .querySelector("input") as HTMLInputElement;
    const amount = screen
      .getByTestId("amount")
      .querySelector("input") as HTMLInputElement;
    const date = screen.getByTestId("date");
    const button = screen.getByTestId("submit-button");

    userEvent.type(cartValueInput, "3000");
    userEvent.type(amount, "3");
    userEvent.type(deliveryDistance, "500");
    userEvent.type(date, today);
    userEvent.click(button);

    expect(deliveryFee.textContent).toBe("2.00 €");
  });

  it("cart value less than 10€ should return a delivery fee of (10€ - cartvalue)  ", async () => {
    render(<App />);
    const deliveryFee = screen.getByTestId("fee");

    const cartValueInput = screen
      .getByTestId("cart-value")
      .querySelector("input") as HTMLInputElement;
    const deliveryDistance = screen
      .getByTestId("delivery-distance")
      .querySelector("input") as HTMLInputElement;
    const amount = screen
      .getByTestId("amount")
      .querySelector("input") as HTMLInputElement;
    const date = screen.getByTestId("date");
    const button = screen.getByTestId("submit-button");

    userEvent.type(cartValueInput, "300");
    userEvent.type(amount, "3");
    userEvent.type(deliveryDistance, "500");
    userEvent.type(date, today);
    userEvent.click(button);

    expect(deliveryFee.textContent).toBe("9.00 €");
  });
});

describe("Amount of item", () => {
  it("it should return a the base delivery fee if amount of item is less than 5", async () => {
    render(<App />);
    const deliveryFee = screen.getByTestId("fee");

    const cartValueInput = screen
      .getByTestId("cart-value")
      .querySelector("input") as HTMLInputElement;
    const deliveryDistance = screen
      .getByTestId("delivery-distance")
      .querySelector("input") as HTMLInputElement;
    const amount = screen
      .getByTestId("amount")
      .querySelector("input") as HTMLInputElement;
    const date = screen.getByTestId("date");
    const button = screen.getByTestId("submit-button");

    userEvent.type(cartValueInput, "3000");
    userEvent.type(amount, "3");
    userEvent.type(deliveryDistance, "500");
    userEvent.type(date, today);
    userEvent.click(button);

    expect(deliveryFee.textContent).toBe("2.00 €");
  });

  it("An additional 50 cent should be added to the delivery fee if amount of items are 5 and above", async () => {
    render(<App />);
    const deliveryFee = screen.getByTestId("fee");

    const cartValueInput = screen
      .getByTestId("cart-value")
      .querySelector("input") as HTMLInputElement;
    const deliveryDistance = screen
      .getByTestId("delivery-distance")
      .querySelector("input") as HTMLInputElement;
    const amount = screen
      .getByTestId("amount")
      .querySelector("input") as HTMLInputElement;
    const date = screen.getByTestId("date");
    const button = screen.getByTestId("submit-button");

    userEvent.type(cartValueInput, "3000");
    userEvent.type(amount, "5");
    userEvent.type(deliveryDistance, "500");
    userEvent.type(date, today);
    userEvent.click(button);

    expect(deliveryFee.textContent).toBe("2.50 €");
  });

  it("1.20 cent surcharge should be added to the overall delivery fee if amount of item is above 12", async () => {
    render(<App />);
    const deliveryFee = screen.getByTestId("fee");

    const cartValueInput = screen
      .getByTestId("cart-value")
      .querySelector("input") as HTMLInputElement;
    const deliveryDistance = screen
      .getByTestId("delivery-distance")
      .querySelector("input") as HTMLInputElement;
    const amount = screen
      .getByTestId("amount")
      .querySelector("input") as HTMLInputElement;
    const date = screen.getByTestId("date");
    const button = screen.getByTestId("submit-button");

    userEvent.type(cartValueInput, "3000");
    userEvent.type(amount, "13");
    userEvent.type(deliveryDistance, "500");
    userEvent.type(date, today);
    userEvent.click(button);

    expect(deliveryFee.textContent).toBe("7.70 €");
  });
});

describe("date", () => {
  it("it should multply the total delivery fee by 1.2 on a friday rush hours", async () => {
    render(<App />);

    const deliveryFee = screen.getByTestId("fee");

    const cartValueInput = screen
      .getByTestId("cart-value")
      .querySelector("input") as HTMLInputElement;
    const deliveryDistance = screen
      .getByTestId("delivery-distance")
      .querySelector("input") as HTMLInputElement;
    const amount = screen
      .getByTestId("amount")
      .querySelector("input") as HTMLInputElement;
    const date = screen.getByTestId("date") as HTMLInputElement;
    const time = screen.getByTestId("time") as HTMLInputElement;

    date.value = "2023-03-02T15:23";
    const button = screen.getByTestId("submit-button");
    userEvent.type(cartValueInput, "1200");
    userEvent.tab();
    userEvent.type(deliveryDistance, "600");
    userEvent.tab();
    userEvent.type(amount, "10");
    userEvent.tab();
    userEvent.clear(date);

    userEvent.type(date, "2023-02-03");

    userEvent.tab();
    userEvent.clear(time);
    userEvent.type(time, "18:19");

    userEvent.click(button);
    expect(deliveryFee.textContent).not.toBe("5.00 €");

    expect(deliveryFee.textContent).toBe("6.00 €");
  });

  it("it should return a delivery fee of 15 € maximum", async () => {
    render(<App />);

    const deliveryFee = screen.getByTestId("fee");

    const cartValueInput = screen
      .getByTestId("cart-value")
      .querySelector("input") as HTMLInputElement;
    const deliveryDistance = screen
      .getByTestId("delivery-distance")
      .querySelector("input") as HTMLInputElement;
    const amount = screen
      .getByTestId("amount")
      .querySelector("input") as HTMLInputElement;
    const date = screen.getByTestId("date") as HTMLInputElement;
    const time = screen.getByTestId("time") as HTMLInputElement;

    date.value = "2023-03-02T15:23";
    const button = screen.getByTestId("submit-button");
    userEvent.type(cartValueInput, "12");
    userEvent.tab();
    userEvent.type(deliveryDistance, "1600");
    userEvent.tab();
    userEvent.type(amount, "15");
    userEvent.tab();
    userEvent.clear(date);

    userEvent.type(date, "2023-02-03");

    userEvent.tab();
    userEvent.clear(time);
    userEvent.type(time, "16:19");

    userEvent.click(button);

    expect(deliveryFee.textContent).toBe("15.00 €");
  });
});
