import { Box, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Badges from '../Badge/Badge';

const Dropdown = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const options = ['Very High', 'High', 'Normal', 'Low', 'Very Low'];

  const labelPriority = (priority) => {
    return priority.split(' ').join('-').toLowerCase();
  };
  const handleDropdown = (option) => {
    setSelected(option);
    setIsActive(false);
  };
  return (
    <Box className='dropdown'>
      <Box
        className='dropdown-btn'
        data-cy='modal-add-priority-dropdown'
        onClick={(e) => setIsActive((prev) => !prev)}
      >
        <Box className='item-label'>
          <Badges priority={labelPriority(selected)} />
          <span className='priority-item-title'>
            {selected.split('-').join(' ')}
          </span>
          <Icon as={RiArrowDropDownLine} w={8} h={8} />
        </Box>
      </Box>

      <Box className={`dropdown-content ${!isActive && 'hide'}`}>
        {options.map((option) => (
          <Box
            key={option}
            className='dropdown-item'
            onClick={() => handleDropdown(option)}
            data-cy='modal-add-priority-item'
          >
            <Badges priority={labelPriority(option)} />
            <span className='priority-item-title'>{option}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dropdown;
