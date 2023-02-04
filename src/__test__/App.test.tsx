import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("appearance", () => {
  afterEach(cleanup);
  test("it should have a form", () => {
    render(<App />);
    const form = screen.getByTestId("form");

    expect(form).toBeInTheDocument();
  });

  test("it should have five inputs", () => {
    render(<App />);
    const inputs = screen.getAllByTitle("input");
    expect(inputs.length).toBe(5);
  });

  test("it should have a date input", () => {
    render(<App />);
    const dateinput = screen.getByTestId("date");
    expect(dateinput).toBeInTheDocument();
  });

  test("it should contain input for cart value", () => {
    render(<App />);
    const cartValue = screen.getByTestId("cart-value");
    expect(cartValue).toBeInTheDocument();
  });
  test("cart value input should required", () => {
    render(<App />);
    const cartValue = screen.getByTestId("cart-value");
    expect(cartValue).toHaveAttribute("required");
  });

  test("it should contain input for amount of items", () => {
    render(<App />);
    const amount = screen.getByTestId("amount");
    expect(amount).toBeInTheDocument();
  });

  test("amount of items input should be required", () => {
    render(<App />);
    const amount = screen.getByTestId("amount");
    expect(amount).toHaveAttribute("required");
  });

  test("it should contain input for delivery distance", () => {
    render(<App />);
    const deliveryDistance = screen.getByTestId("delivery-distance");
    expect(deliveryDistance).toBeInTheDocument();
  });

  describe("validation", () => {
    test("delivery distance input should required", () => {
      render(<App />);
      const deliveryDistance = screen.getByTestId("delivery-distance");
      expect(deliveryDistance).toHaveAttribute("required");
    });

    test("it should have a submit button", () => {
      render(<App />);
      const buttonElement = screen.getByTestId("submit-button");
      expect(buttonElement).toBeInTheDocument();
    });

    test("cart value input should have a change event", () => {
      render(<App />);
      const cartValue = screen
        .getByTestId("cart-value")
        .querySelector("input") as HTMLInputElement;
      const testvalue = 300;
      fireEvent.change(cartValue, { target: { value: testvalue } });
      expect(cartValue.valueAsNumber).toBe(testvalue);
    });

    test("delivery distance input should have a change event", () => {
      render(<App />);
      const deliveryDistance = screen
        .getByTestId("delivery-distance")
        .querySelector("input") as HTMLInputElement;
      const testvalue = 300;
      fireEvent.change(deliveryDistance, { target: { value: testvalue } });
      expect(deliveryDistance.valueAsNumber).toBe(testvalue);
    });

    test("Amount input should have a change event", () => {
      render(<App />);
      const amount = screen
        .getByTestId("amount")
        .querySelector("input") as HTMLInputElement;
      const testvalue = 300;
      fireEvent.change(amount, { target: { value: testvalue } });
      expect(amount.valueAsNumber).toBe(testvalue);
    });
  });

  test("it should not allow letters to be entered into cartvalue input ", () => {
    const app = render(<App />);
    const cartvalue = screen
      .getByTestId("cart-value")
      .querySelector("input") as HTMLInputElement;

    userEvent.type(cartvalue, "abc");
    fireEvent.change(cartvalue, { target: "" });

    expect(cartvalue.value).toBe("");
  });

  test("it should not allow letters to be entered into delivry disteance input ", () => {
    const app = render(<App />);
    const input = screen
      .getByTestId("delivery-distance")
      .querySelector("input") as HTMLInputElement;

    userEvent.type(input, "abc");
    fireEvent.change(input, { target: "" });

    expect(input.value).toBe("");
  });

  test("it should not allow letters to be entered into items amount ", () => {
    const app = render(<App />);
    const amount = screen
      .getByTestId("amount")
      .querySelector("input") as HTMLInputElement;

    userEvent.type(amount, "abc");
    fireEvent.change(amount, { target: "" });

    expect(amount.value).toBe("");
  });
});
