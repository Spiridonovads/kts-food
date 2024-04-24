import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Input from 'components/Input/Input';
import style from './style.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: Option[];
  disabled?: boolean;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ options, disabled }) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [inputValue, setInputValue] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeOptions, setActiveOptions] = useState<Option[]>([]);
  const [value, setValue] = useState<Option[]>([]);

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
    const filtered = options.filter((option) => option.value.toLowerCase().includes(inputValue.toLowerCase()));
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

  const handleOptionClick = (option: Option) => {
    const isSelected = value.some((v) => v.key === option.key);
    if (!isSelected) {
      const newValue = [...value, option];
      const newActiveOptions = [...activeOptions, option];
      setValue(newValue);
      setActiveOptions(newActiveOptions);
      setInputValue('');
    } else {
      const newValue = value.filter((v) => v.key !== option.key);
      const newActiveOptions = activeOptions.filter((v) => v.key !== option.key);
      setValue(newValue);
      setActiveOptions(newActiveOptions);
      setInputValue('');
    }
  };

  const getTitle = (value: Option[]) => {
    let string = '';
    value.forEach((el) => {
      string += el.value + ', ';
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
          {filteredOptions.map((option) => {
            const isActive = activeOptions.some((v) => v.key === option.key);
            return (
              <div
                key={option.key}
                onClick={() => handleOptionClick(option)}
                className={`${style.option} ${isActive ? style.optionActive : ''}`}
              >
                {option.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
