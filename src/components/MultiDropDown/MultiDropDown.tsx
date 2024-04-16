import React, { useState, useEffect, useRef } from 'react';
import Input from 'components/Input/Input';
import style from './style.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ options, value, onChange, getTitle, disabled }) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [inputValue, setInputValue] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeOptions, setActiveOptions] = useState<Option[]>([]);

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

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleOptionClick = (option: Option) => {
    const isSelected = value.some((v) => v.key === option.key);

    if (!isSelected) {
      const newValue = [...value, option];
      const newActiveOptions = [...activeOptions, option];
      onChange(newValue);
      setActiveOptions(newActiveOptions);
    } else {
      const newValue = value.filter((v) => v.key !== option.key);
      const newActiveOptions = activeOptions.filter((v) => v.key !== option.key);
      onChange(newValue);
      setActiveOptions(newActiveOptions);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  return (
    <div ref={dropdownRef}>
      {value.length > 0 && !showDropdown ? (
        <Input
          value={getTitle(value)}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          disabled={disabled}
          afterSlot={true}
        />
      ) : (
        <Input
          value={inputValue}
          placeholder={getTitle(value)}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          disabled={disabled}
          afterSlot={true}
        />
      )}

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
