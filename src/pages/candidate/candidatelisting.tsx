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
   const gridStyle = useMemo(() => ({ height: '800px', width: '100%' }), []);
   const [rowData, setRowData] = useState<ICandidateProfile[]>();
   const [columnDefs] = useState<ColDef[]>([
      { field: 'email', filter: 'agTextColumnFilter' },
      { field: 'mobileNo' },
      { field: 'workExperiences', resizable: true, cellRenderer: cellRendererWorkExperiences },
      { field: 'educationDetails', resizable: true, cellRenderer: cellRendererEducationDetails },
      { field: 'jobPreferences', resizable: true, cellRenderer: cellRendererJobPreferences },
      {
         field: 'jobs',
         headerName: 'Applied Jobs',
         resizable: true,
         cellRenderer: cellRendererJobs,
      },
   ]);
   const defaultColDef = useMemo<ColDef>(() => {
      return {
         editable: true,
         cellDataType: false,
      };
   }, []);

   function cellRendererWorkExperiences(params: ValueFormatterParams) {
      const arr = params.data.workExperiences;
      let values = '';
      for (const workexperience of arr) {
         values +=
            'Key Skills: ' +
            workexperience.keySkills +
            ', ' +
            'Total Years In Experience: ' +
            workexperience.totalExpInYears +
            ', ' +
            'Job Title: ' +
            workexperience.jobTitle +
            '; ';
      }

      return values;
   }

   function cellRendererEducationDetails(params: ValueFormatterParams) {
      const arr = params.data.educationDetails;
      let values = '';
      for (const edu of arr) {
         values +=
            'Highest Qualification: ' +
            edu.highestQualification +
            ', ' +
            'Specialization: ' +
            edu.specialization +
            '; ';
      }

      return values;
   }
   function cellRendererJobPreferences(params: ValueFormatterParams) {
      const arr = params.data.jobPreferences;
      let values = '';
      for (const edu of arr) {
         values +=
            'Industry: ' + edu.industry + ', ' + 'Preferred Role: ' + edu.preferredRole + '; ';
      }

      return values;
   }
   function cellRendererJobs(params: ValueFormatterParams) {
      const arr = params.data.jobs ? params.data.jobs : [];
      let values = '';
      for (const edu of arr) {
         values += 'Title: ' + edu.title + ', ' + 'Requirements: ' + edu.requirements + '; ';
      }

      return values;
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
