import React, { useContext } from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AppContext from "AppContext";

export default function DatePickerWrapper({
  selectedDate,
  disablePast = false,
  onChange,
  isOpen,
  onOpen,
  onClose,
}) {
  // const { datePicker } = useContext(AppContext);
  // const { isOpen, onChange } = datePicker;

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          clearable
          value={selectedDate}
          open={isOpen}
          // error={Boolean(error)}
          // onOpen={onOpen}
          onClose={onClose}
          // onError={onError}
          onChange={onChange} // this function gets date as the only param
          disablePast={disablePast}
          TextFieldComponent={() => <span></span>}
          autoOk={true}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}
// TODO: Add proptypes
