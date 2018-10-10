import React from 'react';
function AddMoreInvoice(props){
    return(
              <div className="row">
                <div className="form-group col-sm-3">
                    <label for="">Item Name</label>
                    <input className="form-control" type="text" value={props.item.itemName} onChange={(e)=>{
                        props.onChangeHandler(e, props.ind, "name")
                    }} />                    
                </div>   
                <div className="form-group col-sm-2">
                    <label for="">Quantity</label>
                    <input className="form-control" type="text" value={props.item.itemsQuantity}  onChange={(e)=>{
                        props.onChangeHandler(e, props.ind, "Quan")
                    }}/>                    
                </div>
                <div className="form-group col-sm-3">
                    <label for="">Rate</label>
                    <input className="form-control" type="text" value={props.item.itemRate} onChange={(e)=>{
                        props.onChangeHandler(e, props.ind, "Rate")
                    }} />                    
                </div>
                <div className="form-group col-sm-3">
                    <label for="" >Amount</label>
                    <input className="form-control" type="text" value={props.item.itemsQuantity * props.item.itemRate }  />                    
                </div>
                <div className="form-group col-sm-1">
                <label for="" >Delete</label>
                    <div className="btn btn-danger" onClick={(e)=>{props.del(props.ind)}}><i class="fas fa-trash-alt"></i></div>                   
                </div>
                </div>              
           
    )
}
export default AddMoreInvoice;