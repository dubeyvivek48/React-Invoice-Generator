import React, { Component } from 'react';
import InvoiceDetails from './invoice/invoiceDetails';
import InvoiceHeader from "./invoice/invoiceHeader";
import logo from './download.jpg';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      invoiceNumber:'',
      date:'10-10-2018',
      billInfo:'',
       invoiceItems:[{
         itemName:'',
         itemsQuantity:'',
         itemRate:''
       }]
    };
    this.handleOnChange=this.handleOnChange.bind(this);
  }
   addNewItem=()=>{
    this.setState({
      invoiceItems:[...this.state.invoiceItems,{itemName:'', itemsQuantity:0, itemRate:0 }]
    });
  }
  deleteItem=(ind)=>{
    let item=[...this.state.invoiceItems];
    this.state.invoiceItems.map((invoice, index)=>{
      if(index===ind){
        item.splice(ind, 1); 
      }
    })
    this.setState({
      invoiceItems:[...item ]
     }) 
  }
  convertPdf=()=>{
    var pdfConverter = require('jspdf');
    let totalAmount=0;
    var doc = new pdfConverter();
    doc.addImage(logo, 'JPEG', 130, 10, 70, 40);
    doc.setFontSize(26);    
    doc.setFontType('bold');
    doc.text(10, 20, 'INVOICE');
    doc.setFontSize(16);
    doc.setFont('loto');
    doc.setFontType('normal');
    doc.setTextColor(0)   
    doc.text(10,30,"# "+this.state.invoiceNumber);
    doc.text(10,37,"Bill to :")
    doc.setTextColor(80);  
    doc.text(10,44,this.state.billInfo);
    doc.text(10,60,"Date  :"+this.state.date);
    
    doc.setLineWidth(12);
    doc.setDrawColor(44, 68, 71);
    doc.line(210, 70, 0, 70);
    doc.setTextColor(256)  
    doc.text(10,72, "Item");
    doc.text(95,72, "Quantity");
    doc.text(135,72, "Rate");
    doc.text(175,72, "Amount");
    doc.setTextColor(0) 
    this.state.invoiceItems.map((item,index)=>{
    totalAmount+=item.itemRate*item.itemsQuantity;
    doc.text(10,82 +index *8, item.itemName);
    doc.text(95,82 +index *8, ""+item.itemsQuantity);
    doc.text(135,82 +index *8, "Rs."+item.itemRate);
    doc.text(175,82 +index *8, "Rs."+item.itemRate*item.itemsQuantity);
    })
    
    doc.text(100,150, "Subtotal:  "+' Rs.'+totalAmount);
    doc.text(100,160, "CGST+IGST (12%):  "+' Rs.'+totalAmount*12/100);
    doc.text(100,170, "Total:  "+' Rs.' +((totalAmount*12/100)+ totalAmount) );



    
    doc.save("test.pdf");

            
  }
  handleChange=(e,name)=>{
    if(name==='invoice'){
      this.setState({invoiceNumber:e.target.value})
    }
    if(name==='date'){
      this.setState({date:e.target.value})
    }
    if(name==='bill'){
      this.setState({billInfo:e.target.value})
    }
  }


  handleOnChange=(event , ind, Name)=>{    
    let item=[...this.state.invoiceItems];       
    this.state.invoiceItems.map((invoicc , index)=>{
            if(index==ind ){   
              if(Name=="name")           
               item[index].itemName=event.target.value;
               if(Name=="Quan")           
               item[index].itemsQuantity=event.target.value;
               if(Name=="Rate")           
               item[index].itemRate=event.target.value;              
            }
          });     
         this.setState({
          invoiceItems:[...item ]
         })         
  }

  render() {
    return (
      <div className="container">
        <InvoiceHeader handleChange={this.handleChange} date={this.state.date} billInfo={this.state.billInfo} invoiceNo={this.state.invoiceNumber}/>
        <InvoiceDetails pdf={this.convertPdf} items={this.state.invoiceItems} event={this.addNewItem} ItemName={this.handleItemName} del={this.deleteItem} onChangeHandler={this.handleOnChange} />
       
      </div>
    );
  }
}

export default App;
