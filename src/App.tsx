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
  const [input, setInput] = useState<IInput>({
    deliveryDistance: "",
    cartValue: "",
    amount: "",
    date: dayjs().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
  });

  const [cartError, setCartError] = useState(false);
  const [deliveryDistanceError, setDeliveryDistanceError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  function getSurchargeCart(cartValue: number = 0): number {
    const value = cartValue * 0.01;
    const surcharge = value < 10 ? 10 - value : 0;
    return surcharge;
  }

  function getDeliveryFeeDistance(distance: number = 0): number {
    let deliveryFee = 2;
    if (distance <= 1000) {
      return deliveryFee;
    }

    deliveryFee += Math.floor(distance / 500 - 2);
    return deliveryFee;
  }

  function deliverFeeItem(item: number = 0): number {
    let surchargeInCent = 0;
    if (item < 5) {
      return surchargeInCent;
    }

    surchargeInCent = (item - 4) * 50;

    if (item > 12) {
      surchargeInCent += 120;
    }
    return surchargeInCent / 100;
  }

  function getDeliveryFeeFridayRush(totalfee: number) {
    const day = dayjs(input.date);
    const hour = Number(input.time.slice(0, 2));
    if (day.day() === 5 && hour >= 15 && hour < 19) {
      return totalfee * 0.2;
    }
    return 0;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCartError(false);
    setDeliveryDistanceError(false);
    setAmountError(false);
    if (Number(input.cartValue) === 0) {
      console.log(Number(input.cartValue) === 0);
      setCartError(true);
      return;
    }

    if (Number(input.deliveryDistance) === 0) {
      setDeliveryDistanceError(true);
      return;
    }

    if (Number(input.amount) === 0) {
      setAmountError(true);
      return;
    }

    let totalFee =
      getSurchargeCart(Number(input.cartValue)) +
      getDeliveryFeeDistance(Number(input.deliveryDistance)) +
      deliverFeeItem(Number(input.amount));

    totalFee += getDeliveryFeeFridayRush(totalFee);
    if (totalFee > 15) {
      totalFee = 15;
    }
    setDeliveryFee(totalFee);
  };

  return (
    <div className="App grid place-items-center min-h-screen">
      <form
        action=""
        role="form"
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
              <InputAdornment position="start">In cents</InputAdornment>
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
              <InputAdornment position="start">In meters</InputAdornment>
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

        <div className="flex py-3 pr-3">
          <input
            type="date"
            title="input"
            data-testid="date"
            name="date"
            min={input.date}
            value={input.date}
            className="focus:outline-0 text-lg"
            onChange={handleChange}
          />

          <input
            type="time"
            title="input"
            value={input.time}
            className="focus:outline-0 text-lg"
            name="time"
            onChange={handleChange}
            data-testid="time"
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          data-testid="submit-button"
          sx={{ marginTop: 3, width: "100%" }}
        >
          Calculate Delivery Price
        </Button>

        <div className="mt-5">
          <span className="font-semibold text-xl ">Delivery price:</span>{" "}
          <span className="text-xl ml-4" data-testid="fee">
            {deliveryFee && deliveryFee.toFixed(2)} €
          </span>
        </div>
      </form>
    </div>
  );
}

export default App;
