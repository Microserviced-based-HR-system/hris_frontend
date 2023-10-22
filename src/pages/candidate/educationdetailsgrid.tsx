'use strict';

import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { get } from 'lodash';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { CANDIDATE_SERVICE, ICandidateProfile, IEducationDetail } from './interfaces';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const EducationDetailsGrid = () => {
   const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
   const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
   const [rowData, setRowData] = useState<IEducationDetail[]>();
   const [columnDefs] = useState<ColDef[]>([
      { field: 'highestQualification' },
      { field: 'specialization' },
      { field: 'university' },
      { field: 'yearOfGraduation' },
      { field: 'educationType' },
   ]);
   const defaultColDef = useMemo<ColDef>(() => {
      return {
         editable: true,
         cellDataType: false,
      };
   }, []);

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
            const educationDetails = list.at(0)?.educationDetails;
            setRowData(educationDetails ? educationDetails : []);
         });
   }, []);

   return (
      <div style={containerStyle}>
         <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact<IEducationDetail>
               rowData={rowData}
               columnDefs={columnDefs}
               defaultColDef={defaultColDef}
               onGridReady={onGridReady}
            />
         </div>
      </div>
   );
};

export default EducationDetailsGrid;
