'use strict';

import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { get } from 'lodash';
import { ColDef, GridReadyEvent, ValueFormatterParams } from 'ag-grid-community';
import { CANDIDATE_SERVICE, ICandidateProfile } from './interfaces';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const CandidateListing = () => {
   const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
   const gridStyle = useMemo(() => ({ height: '500px', width: '100%' }), []);
   const [rowData, setRowData] = useState<ICandidateProfile[]>();
   const [columnDefs] = useState<ColDef[]>([
      { field: 'email' },
      { field: 'mobileNo' },
      { field: 'workExperiences', valueFormatter: bracketsFormatter, resizable: true },
      { field: 'educationDetails', valueFormatter: bracketsFormatter2, resizable: true },
      { field: 'jobPreferences', valueFormatter: bracketsFormatter3, resizable: true },
   ]);
   const defaultColDef = useMemo<ColDef>(() => {
      return {
         editable: true,
         cellDataType: false,
      };
   }, []);

   function bracketsFormatter(params: ValueFormatterParams) {
      return JSON.stringify(params.data.workExperiences);
   }
   function bracketsFormatter2(params: ValueFormatterParams) {
      return JSON.stringify(params.data.educationDetails);
   }

   function bracketsFormatter3(params: ValueFormatterParams) {
      return JSON.stringify(params.data.jobPreferences);
   }

   const queryName = 'candidate';

   const client = new ApolloClient({
      uri: CANDIDATE_SERVICE + '/api/candidate/graphql',
      cache: new InMemoryCache(),
   });
   const onGridReady = useCallback((params: GridReadyEvent) => {
      console.log(params);
      client
         .query({
            query: gql`
            {
                graphqlClient{
                    fetch(
                        requestForm: {
                            apiName: "${queryName}"
                            payload:"{'pageSize':5,'pageIndex':0}"
                        }
                    ){
                        status {
                            code
                            message
                        }
                        data
                    }
            
                }
            }
`,
         })
         .then((result) => {
            console.log(result);
            const status = {
               code: get(result, 'data.graphqlClient.fetch.status.code', null),
               message: get(result, 'data.graphqlClient.fetch.status.message', null),
            };
            console.log(status);
            console.log(result.data.graphqlClient.fetch.data);
            const list: ICandidateProfile[] = JSON.parse(
               result.data.graphqlClient.fetch.data,
            ) as ICandidateProfile[];

            setRowData(list ? list : []);
         });
   }, []);

   return (
      <div style={containerStyle}>
         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
            Candidates
         </h1>
         <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact<ICandidateProfile>
               rowData={rowData}
               columnDefs={columnDefs}
               defaultColDef={defaultColDef}
               onGridReady={onGridReady}
            />
         </div>
      </div>
   );
};

export default CandidateListing;
