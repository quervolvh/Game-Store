import React, { useState } from 'react';
import { Filters } from './index';
import { quickRandomNumber } from 'utils';

export const ComponentFilter: React.FC<Props> = ({
    filterOptions,
}) => {

    const [filterKey, setFilterKey] = useState(quickRandomNumber());

    return (


        <div className='component-filter'>

            <Filters
                
                key={filterKey}
                
                filterOptions={filterOptions}
                
                onReset={() => setFilterKey(quickRandomNumber())}

            />

        </div>

    )
}

interface Props {

    onSearchEnter?: (e: string) => void,

    filterOptions?: {

        safeParams?: string[],

        label?: string,

        options?: {

            label: string,

            value: string,

            multiSelect?: boolean,

            type?: "option" | "plain" | "date",

            options?: {

                label: string,

                value?: string | boolean | null,

            }[]

        }[],

        preSelectedOption?: string,

        withDateSelector?: boolean,

        onSubmit?: (e: { [key: string]: string | boolean | undefined | null | { [key: string]: boolean | string | undefined | null } }) => void
    }

}
