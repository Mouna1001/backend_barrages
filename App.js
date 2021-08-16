 import 'devextreme/dist/css/dx.common.css';
 import 'devextreme/dist/css/dx.light.css';

 import DataGrid, {
     RemoteOperations
 } from 'devextreme-react/data-grid';

 import CustomStore from 'devextreme/data/custom_store';
 import 'whatwg-fetch';

 const isNotEmpty = (value) => value !== undefined && value !== null && value !== '';

 function handleErrors(response) {
     if (!response.ok) {
         throw Error(response.statusText);
     }
     return response;
 }

 const customDataSource = new CustomStore({
     load: (loadOptions) => {
         let params = '?';
         [
             'filter',
             'group',
             'groupSummary',
             'parentIds',
             'requireGroupCount',
             'requireTotalCount',
             'searchExpr',
             'searchOperation',
             'searchValue',
             'select',
             'sort',
             'skip',
             'take',
             'totalSummary',
             'userData'
         ].forEach(function(i) {
             if (i in loadOptions && isNotEmpty(loadOptions[i])) {
                 params += `${i}=${JSON.stringify(loadOptions[i])}&`;
             }
         });
         params = params.slice(0, -1);

         return fetch(`https://localhost:5000/${params}`)
             .then(handleErrors)
             .then(response => response.json())
             .then(response => {
                 return {
                     data: response.data,
                 };
             })
             .catch(() => { throw 'Network error' });
     },
     // Needed to process selected value(s) in the SelectBox, Lookup, Autocomplete, and DropDownBox
     // byKey: (key) => {
     //     return fetch(`https://mydomain.com/MyDataService?id=${key}`)
     //         .then(handleErrors);
     // }
 });
 export default App;