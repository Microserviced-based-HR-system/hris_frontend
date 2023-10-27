'use strict';

import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { get } from 'lodash';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { CANDIDATE_SERVICE, ICandidateProfile, IJobPreference } from './interfaces';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import * as AuthService from '../../services/auth.service';
const JobPreferenceGrid = () => {
   const currentUser = AuthService.getCurrentUser();
   const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
   const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
   const [rowData, setRowData] = useState<IJobPreference[]>();
   const [columnDefs] = useState<ColDef[]>([
      { field: 'industry' },
      { field: 'preferredRole' },
      { field: 'preferredLocation' },
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
   const filters = [{ filterField: 'email', filterText: currentUser.email }];
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
                            payload:"{'filters':${JSON.stringify(filters).replace(
                               /"/g,
                               "'",
                            )},'pageSize':5,'pageIndex':0}"
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
            const jobPreferences = list.at(0)?.jobPreferences;
            setRowData(jobPreferences ? jobPreferences : []);
         });
   }, []);

   return (
      <div style={containerStyle}>
         <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact<IJobPreference>
               rowData={rowData}
               columnDefs={columnDefs}
               defaultColDef={defaultColDef}
               onGridReady={onGridReady}
            />
         </div>
      </div>
   );
};

export default JobPreferenceGrid;
