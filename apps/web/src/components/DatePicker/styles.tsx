import styled from 'styled-components';

export const DatePickerContainer = styled.div`
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  label {
    font-family: 'Segoe UI';
    font-weight: 600;
    font-size: 14px;
  }

  [type="date"] {
    background:#fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png)  97% 50% no-repeat ;
  }
  
  [type="date"]::-webkit-inner-spin-button {
    display: none;
  }
  [type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
  }

  /* custom styles */
  body {
    padding: 4em;
    background: #e5e5e5;
    font: 13px/1.4 Geneva, 'Lucida Sans', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif;
  }
  label {
    display: block;
  }

  input::value {
    color: #000;
  }

  input {
    border: 1px solid #ced4da;
    background-color: #fff;
    width: 100%;
    min-height: 36px;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 4px;
  }

  .required:after {
    content:" *";
    color: red;
  }
`;
