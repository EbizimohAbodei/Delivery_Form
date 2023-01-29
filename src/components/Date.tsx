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

const Date = (props: DateProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DateTimePicker
          label="Date & Time"
          disablePast
          value={props.value}
          inputFormat="DD/MM/YYYY mm:hh A"
          onChange={props.handleChange}
          renderInput={(params) => (
            <TextField {...params} title="input" data-testid="date" />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default Date;
