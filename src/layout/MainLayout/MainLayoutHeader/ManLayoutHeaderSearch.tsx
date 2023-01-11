import React from 'react';
import { FormField } from 'components/FormField';

export const MainLayoutHeaderSearch: React.FC<Props> = ({ }) => {

    return (

        <div className='main-layout-topBar-search'>

            <FormField

                type={'plain'}

                placeHolder={"Search"}

            />

        </div>

    );

};


interface Props { }
