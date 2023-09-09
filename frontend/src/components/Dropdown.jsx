import React, {useState} from 'react';
import {
  Button,
  Grid,
  GridItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';

const DropdownGrid = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className = {`dropdown-grid ${isOpen ? 'open' : 'closed'}`}>
            <Popover placement="bottom-start">
            <PopoverTrigger>
                <Button colorScheme="white">Businesses</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Dropdown Grid</PopoverHeader>
                <PopoverBody>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    <GridItem>Item 1</GridItem>
                    <GridItem>Item 2</GridItem>
                    <GridItem>Item 3</GridItem>
                    <GridItem>Item 4</GridItem>
                    <GridItem>Item 5</GridItem>
                    <GridItem>Item 6</GridItem>
                </Grid>
                </PopoverBody>
            </PopoverContent>
            </Popover>
        </div>
    );
};

export default DropdownGrid;
