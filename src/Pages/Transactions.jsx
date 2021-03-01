import React from 'react';
import config from 'config';
import { Form, Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export default class Transactions extends React.Component{
  constructor(props){
    super(props);
   this.state = {
       tran_rows: [],
        month:'2021-01'
  }

}

async componentDidMount() {
    let sql_month = Number(this.state.month.split("-")[1]);
    console.log(sql_month);
  const url_tran = `${config.apiUrl}/transaction/${this.props.userid}/${sql_month}`;
  const response_tran = await fetch(url_tran);
  const tran_data = await response_tran.json();

  let tran_html = []
  for (var id in tran_data) {
    tran_html.push(<tr>
                    <td>{tran_data[id].account_number}</td>
                    <td> {tran_data[id].transaction_name}</td>
                    <td> {tran_data[id].category} </td>
                    <td> {tran_data[id].transaction_ts}</td>
                    </tr>);
  }
  
  this.setState({tran_rows:tran_html});
}

async componentDidUpdate(prevProps, prevState) {
    if(this.state.month !== prevState.month)
    {
    let sql_month = Number(this.state.month.split("-")[1]);
    console.log(sql_month);
    const url_tran = `${config.apiUrl}/transaction/${this.props.userid}/${sql_month}`;
    
    const response_tran = await fetch(url_tran);
    const tran_data = await response_tran.json();
  
    let tran_html = []
    for (var id in tran_data) {
      tran_html.push(<tr>
                      <td>{tran_data[id].account_number}</td>
                      <td> {tran_data[id].transaction_name}</td>
                      <td> {tran_data[id].category} </td>
                      <td> {tran_data[id].transaction_ts}</td>
                      </tr>);
    }
    
    this.setState({tran_rows:tran_html});
}
}

setMonth(event) {
    console.log(event.target.value);
    this.setState({month:event.target.value});
}

all_trans() {
    return ( <div> <table> <tbody>{this.state.tran_rows} </tbody> </table></div> )
}

render()
{
  return(
      <>
      <Form>
          <Form.Control type="month" name="month" width="w-25" defaultValue={this.state.month} onChange={this.setMonth.bind(this)}/>
      </Form>
    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
    <Tab eventKey="all" title="All">
      {this.all_trans()}
    </Tab>
    <Tab eventKey="bills" title="Bills">
      
    </Tab>
    <Tab eventKey="income" title="Income">
      
    </Tab>
  </Tabs>
      </>
      );
}
};