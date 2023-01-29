import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { default as dayjs } from "dayjs";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface DateProps {
  value: dayjs.Dayjs | null;
  handleChange: any; // 👈️ for demo purposes
}

let objectDate = new Date();

let day:any = objectDate.getDate();
console.log(day); // 23

let month:any = objectDate.getMonth();
console.log(month + 1); // 8

let year:any = objectDate.getFullYear();
console.log(year);

if (day < 10) {
  day = "0" + day;
}

if (month < 10) {
  month = `0${month}`;
}

export let format = `${month}/${day}/${year}`;


const MockDate = (props: DateProps) => {
    
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DateTimePicker
          label="Date"
          disablePast
          value={props.value}
          inputFormat="DD/MM/YYYY hh:mm A"
          // @ts-ignore
          InputProps={{ "data-testid": "date-picker" }}
          onChange={props.handleChange}
          renderInput={(params) => <TextField {...params} title="input" />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default MockDate;
