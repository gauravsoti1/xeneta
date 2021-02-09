import React, { useContext } from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePickerWrapper({
  selectedDate,
  disablePast = false,
  onChange,
  isOpen,
  onOpen,
  onClose,
}) {
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          clearable
          value={selectedDate}
          open={isOpen}
          onClose={onClose}
          onChange={onChange} // this function gets date as the only param
          disablePast={disablePast}
          TextFieldComponent={() => <span></span>}
          autoOk={true}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}
