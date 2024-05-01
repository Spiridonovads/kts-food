import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Input from 'components/Input/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './style.module.scss';

export type MultiDropdownProps = {
  options: string[];
  disabled?: boolean;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ options, disabled }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [inputValue, setInputValue] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeOptions, setActiveOptions] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    filterOptions();
  }, [inputValue, options]);

  const filterOptions = () => {
    const filtered = options.filter((option: string) => option.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredOptions(filtered);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  const handleOptionClick = (option: string) => {
    const isSelected = value.some((v) => v === option);
    const searchParams = new URLSearchParams(location.search);

    const newValue = isSelected ? value.filter((v) => v !== option) : [...value, option];
    const newActiveOptions = isSelected ? activeOptions.filter((v) => v !== option) : [...activeOptions, option];

    setValue(newValue);
    setActiveOptions(newActiveOptions);
    searchParams.set('type', newValue.join('+'));
    navigate({ search: searchParams.toString() });

    setInputValue('');
  };

  const getTitle = (value: string[]) => {
    let string = '';
    value.forEach((el) => {
      string += el + ', ';
    });
    return string;
  };

  return (
    <div ref={dropdownRef}>
      <Input
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        disabled={disabled}
        afterSlot={true}
        value={showDropdown && value.length > 0 ? getTitle(value) : inputValue}
        placeholder={value.length > 0 ? getTitle(value) : 'Categories'}
        border={showDropdown}
      />
      {showDropdown && !disabled && (
        <div className={style.dropdown}>
          {filteredOptions.map((option, i) => {
            const isActive = activeOptions.some((v) => v === option);
            return (
              <div
                key={i}
                onClick={() => handleOptionClick(option)}
                className={`${style.option} ${isActive ? style.optionActive : ''}`}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
