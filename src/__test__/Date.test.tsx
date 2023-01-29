import MockDate, {format} from "./MockDate";
import { default as dayjs } from "dayjs";
import React, { useState } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { Input } from "@mui/icons-material";
import { log } from "console";


type Model = {
  date?: Date;
};
afterEach(cleanup);
beforeAll(() => {

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: any) => ({
      media: query,
      // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
      matches: query === "(pointer: fine)",
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

afterAll(() => {
  // @ts-ignore
  delete window.matchMedia;
});

const onchange = jest.fn()


describe("Behaviours", () => {
    const today = dayjs().format("DD/MM/YYYY hh:mm A")
      it("should have a default format and date", function () {
        const { getByLabelText } = render(
          <MockDate
            value={dayjs()}
            handleChange={onchange}
          />
        );
        const input = getByLabelText("Date");  

          expect(input).toHaveValue(today.toLocaleString());  
      });
    

    it('it should throw error if past date is selected', () => {
      const { getByLabelText } = render(
        <MockDate value={dayjs('2022/04/23')} handleChange={onchange} />
      ); 
        const input = getByLabelText("Date"); 
        expect(input.parentElement).toHaveClass('Mui-error')

    })
    
    
})
