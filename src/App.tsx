import React, { useState } from "react";

import {
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
} from "@mui/material";

import { default as dayjs } from "dayjs";

interface IInput {
  deliveryDistance: string;
  cartValue: string;
  amount: string;
  date: string;
  time: string;
}

function App() {
  // Declaring useState variables for storing inputed data
  const [input, setInput] = useState<IInput>({
    deliveryDistance: "",
    cartValue: "",
    amount: "",
    date: dayjs().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
  });

  // Declaring a useState variable to store the calculated the delivery fee
  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  // Declaring useState variables for error handling
  const [cartError, setCartError] = useState(false);
  const [deliveryDistanceError, setDeliveryDistanceError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  // Function for handling or keeping track of the input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // This function calculated the surcharge based on the cart value entered in Cents.
  function getSurchargeCart(cartValue: number = 0): number {
    // converting the Cent to Euro value
    const value: number = cartValue * 0.01;

    //Conditional statement that checks if the cart value is more/less than 10EUR, then returns the surcharge.
    const surcharge: number = value < 10 ? 10 - value : 0;
    return surcharge;
  }

  // Function calculating the delivery charge based on distance
  function getDeliveryFeeDistance(distance: number = 0): number {
    let deliveryFee: number = 2;

    // Returns the based delivery cahrge of 2EUR if distance is less that 1000 meters
    if (distance <= 1000) {
      return deliveryFee;
    }

    // Adds 1EUR for every additional 500 meters after the 1000
    deliveryFee += Math.floor(distance / 500 - 2);
    return deliveryFee;
  }

  // Function that calculates a charge based on the number of items in the cart, adds 50cents for every item above 4.
  function deliverFeeItem(item: number = 0): number {
    // Checks if the itmes are less than 5 and returns the 0 if condition is met.
    let surchargeInCent: number = 0;
    if (item < 5) {
      return surchargeInCent;
    }

    // adds up 50cents for each additional item - if cart items exceeds 4
    surchargeInCent = (item - 4) * 50;

    // adds an additional 1.20EUR if the items are more than 12
    if (item > 12) {
      surchargeInCent += 120;
    }
    return surchargeInCent / 100;
  }

  // Multiplies the total delivery fee by 1.2EUR if the delivery date is a friday and between 15:00 and 19:00 UTC
  function getDeliveryFeeFridayRush(totalfee: number) {
    const day = dayjs(input.date);
    const hour = Number(input.time.slice(0, 2));
    if (day.day() === 5 && hour >= 15 && hour < 19) {
      return totalfee * 0.2;
    }
    return 0;
  }

  // Implements the calculation of deliver fee, factoring the above functional conditions.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCartError(false);
    setDeliveryDistanceError(false);
    setAmountError(false);

    // allows the implementation of an input error if cart value is 0
    if (Number(input.cartValue) <= 0) {
      setCartError(true);
      return;
    }

    // allows the implementation of an input error if delivery distance is 0
    if (Number(input.deliveryDistance) <= 0) {
      setDeliveryDistanceError(true);
      return;
    }

    // allows the implementation of an input error if amount of cart items is 0
    if (Number(input.amount) <= 0) {
      setAmountError(true);
      return;
    }

    // Calculates the delivery fee by calling other functions
    let totalFee =
      getSurchargeCart(Number(input.cartValue)) +
      getDeliveryFeeDistance(Number(input.deliveryDistance)) +
      deliverFeeItem(Number(input.amount));

    // Recalculates the delivery if it is a friday and between 3PM - 7PM
    totalFee += getDeliveryFeeFridayRush(totalFee);

    // Returns delivery fee as 15EUR as a maximum
    if (totalFee > 15) {
      totalFee = 15;
    }

    // Sets the delivery fee for rendering
    setDeliveryFee(totalFee);
  };

  return (
    <div className="App grid place-items-center min-h-screen">
      <form
        data-testid="form"
        className=" w-10/12 lg:w-1/2 md:w-2/3 mx-auto shadow-md p-5 transition-all ease-in duration-700"
        onSubmit={handleSubmit}
      >
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">
            Cart Value
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            type="number"
            error={cartError}
            required
            onChange={handleChange}
            value={input.cartValue}
            name="cartValue"
            data-testid="cart-value"
            title="input"
            endAdornment={
              <InputAdornment position="start">Cents</InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">
            Delivery distance
          </InputLabel>
          <Input
            type="number"
            value={input.deliveryDistance}
            onChange={handleChange}
            error={deliveryDistanceError}
            name="deliveryDistance"
            data-testid="delivery-distance"
            id="standard-adornment-amount"
            title="input"
            required
            endAdornment={
              <InputAdornment position="start">Meters</InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">
            Amount of Items
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={input.amount}
            name="amount"
            data-testid="amount"
            error={amountError}
            required
            title="input"
            onChange={handleChange}
            type="number"
          />
        </FormControl>

        <fieldset className="field flex py-3 pr-3 border border-gray-600 px-2 hover:border-2 ">
          <legend className="ml-2">Date & Time</legend>
          <input
            type="date"
            title="input"
            data-testid="date"
            name="date"
            min={dayjs().toISOString().slice(0, 10)}
            value={input.date}
            className="dateInput outline-0 outline-none border-none focus:outline-0 text-lg"
            onChange={handleChange}
          />

          <input
            type="time"
            title="input"
            value={input.time}
            className="timeInput focus:outline-0 text-lg"
            name="time"
            onChange={handleChange}
            data-testid="time"
          />
        </fieldset>

        <Button
          type="submit"
          variant="contained"
          data-testid="submit-button"
          sx={{ marginTop: 3, width: "100%" }}
        >
          Calculate Delivery Price
        </Button>

        <div className="background-color: powderblue deliveryFee mt-5">
          <span className="font-semibold text-xl">Delivery Fee:</span>{" "}
          <span className="text-xl ml-4" data-testid="fee">
            {deliveryFee && deliveryFee.toFixed(2)} €
          </span>
        </div>
      </form>
    </div>
  );
}

export default App;
