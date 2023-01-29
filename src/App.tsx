import React, { useState } from "react";

import {
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
} from "@mui/material";

import { default as dayjs } from "dayjs";

import Date from "./components/Date";

function App() {
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(dayjs());

  const [input, setInput] = useState({
    deliveryDistance: "",
    cartValue: "",
    amount: "",
  });
  // console.log(dayjs().date());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const handleChangeDate = (newValue: dayjs.Dayjs | null) => {
    setDate(newValue);
  };

  function getSurchargeCart(cartValue: number = 0): number {
    return cartValue < 10 ? 10 - cartValue : 0;
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
    const hour: any = date?.hour();

    if (date?.day() === 5 && hour >= 15 && hour < 19) {
      return totalfee * 1.2;
    }
    return 0;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (Number(input.cartValue) >= 100) {
      setDeliveryFee(0);
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
            onChange={handleChange}
            value={input.cartValue}
            name="cartValue"
            data-testid="cart-value"
            title="input"
            required
            endAdornment={<InputAdornment position="start">€</InputAdornment>}
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
            name="deliveryDistance"
            data-testid="delivery-distance"
            id="standard-adornment-amount"
            title="input"
            required
            endAdornment={<InputAdornment position="start">m</InputAdornment>}
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
            required
            title="input"
            onChange={handleChange}
            type="number"
          />
        </FormControl>
        <div className="mt-5">
          <Date value={date} handleChange={handleChangeDate} />
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
          <span className="text-xl ml-4">
            {deliveryFee && deliveryFee.toFixed(2)} €
          </span>
        </div>
      </form>
    </div>
  );
}

export default App;
