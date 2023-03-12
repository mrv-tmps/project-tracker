import * as S from './styles';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
}

function DatePicker(props: Props) {
  const { label, ...restProps } = props;

  return (
    <S.DatePickerContainer>
      <label className="required" htmlFor="datePicker">{label}</label>
      <input
        required
        className="datePickerInput"
        name="datePicker"
        type="date"
        {...restProps}
      />
    </S.DatePickerContainer>

  );
}

export default DatePicker;
