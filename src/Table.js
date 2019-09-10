import React, {Component} from 'react';

class Table extends Component {
    constructor({context}) {
       super(context) //since we are extending class Table so we have to use super in order to override Component class constructor
       
       this.state = {
          customerName:context.customerName, 
          dataSet: context.dictionary
         }; 
       }
       
       handleAddRow = (props) => {
         this.setState((prevState, props) => {
           const row = {content: "hello this is a new row!" };
           return { rows: [...prevState.rows, row] };
         });
       };

       handleRemoveRow = () => {
         this.setState((prevState, row) => {
           return { row: prevState.row.slice(1) };
         });
       }; 
       
 
    render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
       return (
          <div >
             <h1>{this.state.customerName}</h1>
             <table id='dataSet'>
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
               {this.renderTableData()}
               </tbody>
            </table>
            <button className='deleteDictionary' >Delete Dictionary</button>
            
          </div>
       )
    }

    renderTableData() {

      return this.state.dataSet.map((row, index) => {
         const { id, domain, range } = row //destructuring

         var pId = id
         var pDomain = domain
         var pRange = range
         var valid = this.state.dataSet.map((row1, pIndex) => {
            const { id, domain, range } = row1
            var error = ''
            
            if(id!== pId && domain === pDomain){
               error='duplicated domain'
            }

            if(id!== pId && range === pRange){
               error='duplicated range'
            }

            return error
         })

         return (
            <tr key={id}>
               <td>{id}</td>
               <td>{domain}</td>
               <td>{range}</td>
               <td>{valid}</td>
               <td onClick={this.handleRemoveRow}>(-)</td>
               <td onClick={this.handleAddRow}>(/)</td>
            </tr>
               )
      })
   }

   renderTableHeader() {
      let header = Object.keys(this.state.dataSet[0])
      return header.map((key, index) => {
         return <th key={index}>{key}</th>
      })
   }
 }

 

 
 export default Table