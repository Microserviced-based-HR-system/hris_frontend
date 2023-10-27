'use strict';

import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { get } from 'lodash';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { CANDIDATE_SERVICE, ICandidateProfile, IWorkExperience } from './interfaces';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import * as AuthService from '../../services/auth.service';

const WorkExperienceGrid = () => {
   const currentUser = AuthService.getCurrentUser();

   const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
   const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
   const [rowData, setRowData] = useState<IWorkExperience[]>();
   const [columnDefs] = useState<ColDef[]>([
      { field: 'companyName' },
      { field: 'jobTitle' },
      { field: 'country' },
      { field: 'noticePeriod' },
      { field: 'totalExpInYears' },
      { field: 'keySkills' },
   ]);
   const defaultColDef = useMemo<ColDef>(() => {
      return {
         editable: true,
         cellDataType: false,
      };
   }, []);

   const queryName = 'candidate';
   const filters = [{ filterField: 'email', filterText: currentUser.email }];

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
            const workExperiences = list.at(0)?.workExperiences;
            setRowData(workExperiences ? workExperiences : []);
         });
   }, []);

   return (
      <div style={containerStyle}>
         <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact<IWorkExperience>
               rowData={rowData}
               columnDefs={columnDefs}
               defaultColDef={defaultColDef}
               onGridReady={onGridReady}
            />
         </div>
      </div>
   );
};

export default WorkExperienceGrid;
