/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import { useBreakpointValue as useChakraBreakpointValue } from "@chakra-ui/react";

type Values<T> = (Record<string, T> | T[]) & {
    base: any;
};

function useBreakpointValue<T = any>(values: Values<T>): T | undefined {
    const firstRender = useRef(true);
    const [, setTick] = useState(0);

    const result = useChakraBreakpointValue(values);

    useEffect(() => {
        if (firstRender.current) {
            setTick(prev => prev + 1);

            firstRender.current = false;
        }
    }, []);

    if (firstRender.current) {
        return values.base;
    }

    return result;
}

export default useBreakpointValue;
