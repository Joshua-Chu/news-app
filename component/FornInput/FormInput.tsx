import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React from "react";

type FormInputProps = {
    children: React.ReactNode;
    value: string;
    onChange: (val: string) => void;
    type: string;
};

export const FormInput = ({
    children,
    value,
    onChange,
    type,
}: FormInputProps) => {
    return (
        <>
            <FormControl>
                <FormLabel htmlFor="password">
                    <Text color="gray.600">{children}</Text>
                </FormLabel>
                <Input
                    id="password"
                    type={type}
                    size="md"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
            </FormControl>
        </>
    );
};
