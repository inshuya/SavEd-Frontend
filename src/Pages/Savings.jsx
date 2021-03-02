import React from 'react';
import config from 'config';
import { Form } from 'react-bootstrap';
import { ChartDonutUtilization } from '@patternfly/react-charts';

export default class Savings extends React.Component{
  constructor(props){
    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    super(props);
   this.state = {
       balance: 0,
        month:yyyy+'-'+mm
  }
}

async componentDidMount() {
  let sql_month = this.state.month + '-01';

  const url_balance = `${config.apiUrl}/expense/${this.props.userid}/${sql_month}`;
  const response_balance= await fetch(url_balance);
  const balance_data = await response_balance.json();

  this.setState({balance:balance_data[0].balance});
}

async componentDidUpdate(prevProps, prevState) {
    if(this.state.month !== prevState.month)
    {
        let sql_month = this.state.month + '-01';

  const url_balance = `${config.apiUrl}/expense/${this.props.userid}/${sql_month}`;
  const response_balance= await fetch(url_balance);
  const balance_data = await response_balance.json();

  this.setState({balance:balance_data[0].balance});
}
}

setMonth(event) {
    this.setState({month:event.target.value});
}


render()
{
  return(
      <>
      <Form>
          <Form.Control style={{width:'20%', border: 'none'}}  size="lg" type="month" name="month" width="w-25" defaultValue={this.state.month} onChange={this.setMonth.bind(this)}/>
      </Form>
      <div>
          <h1>{Math.ceil(this.state.balance)}</h1>
      </div>
      <div>
          <p>{JSON.stringify(this.state.daily)}</p>
      </div>
      <div>
          <p>{JSON.stringify(this.state.category)}</p>
      </div>
      </>
      );
}
};