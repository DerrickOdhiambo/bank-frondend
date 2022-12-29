import Select from 'react-select';

const SelectDropdown = ({
  options,
  placeholder,
  value,
  onChange,
  selectdefaultValue,
  isDisabled,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#dde8db',
      minHeight: '30px',
      height: '37px',
      fontSize: '14px',
      boxShadow: state.isFocused ? null : null,
      borderRadius: state.isFocused ? '0px 0px 0 0' : 0,
      '&:hover': {
        borderColor: state.isFocused ? '#969393' : '#dde8db',
      },
    }),

    menuPortal: (base) => ({
      ...base,
      fontSize: '13px',
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '37px',
      padding: '0 6px',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: (state) => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '37px',
    }),
  };

  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : '';
  };

  return (
    <div>
      <Select
        options={options}
        styles={customStyles}
        value={defaultValue(options, value)}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        defaultValue={selectdefaultValue}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default SelectDropdown;
