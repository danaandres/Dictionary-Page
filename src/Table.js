import React, {Component} from 'react';


class Table extends Component {
    constructor({context}) {
       super(context) //since we are extending class Table so we have to use super in order to override Component class constructor
       
       this.state = {
          header: [],
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


       handleRemoveRow = (props) => {
         let rows = [...this.state.dataSet]
         rows.splice(1)
         this.setState({ 
            dataSet: rows
         })
       };

       deleteTable = (props) => {
          let header = [...this.state.customerName]
          header.splice(props)
          this.setState({
             customerName: header
          })
          
       }
       
 
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
            <button onClick={this.deleteTable.bind()} className='deleteDictionary' >Delete Dictionary</button>
            <button className='addRow' >Add Row</button>
            
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
            
            if(id!== pId && domain === pDomain && range === pRange){
               error='duplicates'
            }
            
            if(id!== pId && domain === pRange && range === pDomain){
               error='cycles'
            }

            if(id!== pId && domain === pDomain && range!==pRange){
               error='forks'
            }

           /* if(id!== pId && domain === pRange){
               error='chains'
            } */

            return error
         })
         
         return (
            <tr key={id}>
               <td>{id}</td>
               <td>{domain}</td>
               <td>{range}</td>
               <td>{valid}</td>
               <td onClick={this.handleAddRow}>(/)</td>
               <td onClick={this.handleRemoveRow.bind()}>(-)</td>
            </tr>
               )
      })
   }

   renderTableHeader() {
      let header = ['Id', 'Domain','Range', 'Validation', 'Modify', 'Remove']
      return header.map((key, index) => {
         return <th key={index}>{key}</th>
      })
   }
 }

 

 
 export default Table