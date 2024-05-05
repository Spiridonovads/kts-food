import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from 'components/Input/Input';
import style from './style.module.scss';

export type MultiDropdownProps = {
  options: string[];
  disabled?: boolean;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ options, disabled }) => {
  const navigate = useNavigate();

  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [inputValue, setInputValue] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeOptions, setActiveOptions] = useState<string[]>(
    options.filter((el) => location.search.toLowerCase().includes(el.toLowerCase())),
  );
  const [value, setValue] = useState<string[]>(
    options.filter((el) => location.search.toLowerCase().includes(el.toLowerCase())),
  );

  const params = new URLSearchParams();
  const searchParams = new URLSearchParams();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filterOptions = React.useCallback(() => {
    const filtered = options.filter((option: string) => option.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  useEffect(() => {
    filterOptions();
  }, [inputValue, options, filterOptions]);

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

    const newValue = isSelected ? value.filter((v) => v !== option) : [...value, option];
    const newActiveOptions = isSelected ? activeOptions.filter((v) => v !== option) : [...activeOptions, option];

    setValue(newValue);
    setActiveOptions(newActiveOptions);

    params.set('type', `${newActiveOptions}`);
    searchParams.forEach((value, key) => {
      if (key !== 'type') {
        params.append(key, value);
      }
    });
    navigate(`?${params.toString()}`);

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
