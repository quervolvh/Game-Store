import React, { useState } from 'react';
import { FormField } from 'components';
import { PaginationPages } from './PaginationPages';

export const Pagination: React.FC<Props> = ( props ) => {

    const { pages, page, perPageSelector, perPage = 20, empty, dataCount, isMobile } = props;

    const initialState = perPage || 20;

    const [_perPage, _setPerPage] = useState(initialState);

    const clickHer = (e: { page: number, perPage: number }) => props.onClick(e);

    return (
        <div className='pagination'>
            {

                !empty &&

                <div className="pagination-flex">

                    {
                        perPageSelector !== false &&

                        <div className="pagination-opt">

                            <b> SHOWING </b>

                            <FormField

                                type="option"
                            
                                options={["20", "40", "60", "80", "100"]}
                            
                                value={String(_perPage || perPage)}
                            
                                onChange={(e) => {

                                    _setPerPage(e);

                                    clickHer({ perPage: e, page: 1 })

                                }}
                                
                            />

                            <b> OUT OF {dataCount} </b>

                        </div>

                    }

                    <PaginationPages 

                        isMobile={isMobile}
                    
                        page={page || 1} 
                        
                        pages={pages || 1}

                        onClick={e => clickHer({ page: e , perPage : _perPage })}
                        
                    />

                </div>

            }

        </div>

    );
};

interface Props {
    dataCount: number,
    isMobile: boolean,
    pages: number,
    page: number,
    perPage?: number,
    onClick: (e: { perPage: number, page: number }) => void,
    perPageSelector?: boolean,
    empty?: boolean
}
