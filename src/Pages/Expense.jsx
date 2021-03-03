import React from 'react';
import config from 'config';
import { Form, ProgressBar, Table } from 'react-bootstrap';
import {  ChartDonutUtilization, ChartThemeColor, createContainer } from '@patternfly/react-charts';


export default class Expense extends React.Component{
  constructor(props){
    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    super(props);
   this.state = {
       limit: 0,
       used:0,
        month:yyyy+'-'+mm,
        category:[]
  }
}


format_category(arr){
let result = [];
    for(let i=0;i<arr.length;i++)
    {
      let now = (arr[i].amount? arr[i].amount:0)/arr[i].spend_limit * 100;
      let rem = Math.round((arr[i].spend_limit - (arr[i].amount? arr[i].amount:0)));
      let spent = Math.round((arr[i].amount? arr[i].amount:0));
      let limit = arr[i].spend_limit;
      let v = "";
      if(now<25){
        v = "success";
      }
      else if (now<50){
        v = "info";
      }
      else if (now<75){
        v="warning";
      }
      else{
        v="danger";
      }
      let label_left = `$${rem} left`;
      if(rem < 0)
      {
        label_left = `$${Math.abs(rem)} over budget !!`
      }
      result.push(<p><span>{arr[i].category_name}</span><span style={{float:'right'}}> {label_left}</span>
                <ProgressBar style={{color:'black'}} now={now} variant={v} label={`$${spent} of $${limit}`} />
                </p>
      );
    }
    let html = []
    for(let i=0;i<result.length;i=i+2)
          {
            html.push(<div class="row"><div class="col-6">{result[i]}</div><div class="col-6">{result[i+1]}</div></div>);
          }
    return (html);
}

async componentDidMount() {
  let sql_month = this.state.month + '-01';

  const url_balance = `${config.apiUrl}/expense/${this.props.userid}/${sql_month}`;
  const response_balance= await fetch(url_balance);
  const balance_data = await response_balance.json();

  const url_category = `${config.apiUrl}/expense/category/${this.props.userid}/${sql_month}`;
  const response_category= await fetch(url_category);
  const category_data = await response_category.json();

  let category_data_formatted = this.format_category(category_data);

  this.setState({limit:balance_data[0].limitt,used:balance_data[0].used,category:category_data_formatted});
}

async componentDidUpdate(prevProps, prevState) {
    if(this.state.month !== prevState.month)
    {
        let sql_month = this.state.month + '-01';

  const url_balance = `${config.apiUrl}/expense/${this.props.userid}/${sql_month}`;
  const response_balance= await fetch(url_balance);
  const balance_data = await response_balance.json();

  const url_category = `${config.apiUrl}/expense/category/${this.props.userid}/${sql_month}`;
  const response_category= await fetch(url_category);
  const category_data = await response_category.json();

  let category_data_formatted = this.format_category(category_data);
  this.setState({limit:balance_data[0].limitt,used:balance_data[0].used, category:category_data_formatted});
}
}

setMonth(event) {
    this.setState({month:event.target.value});
}

render()
{

    const Small = () => <Progress value={33} title="Title" size={ProgressSize.sm} />

  return(
      <>
      <Form>
          <Form.Control style={{width:'30%', border: 'none'}} size="lg" type="month" name="month" width="w-25" defaultValue={this.state.month} onChange={this.setMonth.bind(this)}/>
      </Form>
      <div class="container">
      <div class="row">
        <div class="col">
      
      <div style={{ height: '230px', width: '230px' , alignItems: 'center'}}>
      <ChartDonutUtilization
      ariaDesc="Used"
      ariaTitle="Used"
      constrainToVisibleArea={true}
      data={{ x: '$', y: Math.round(this.state.used/this.state.limit * 100,0), color:"red" }}
      labels={({ datum }) => datum.x ? `${datum.y}% used` : null}
      subTitle={'$' + Math.floor(this.state.limit - this.state.used) + ' left'}
      title={'$ '+Math.ceil(this.state.used).toString()}
      themeColor={ChartThemeColor.red}
    />
      </div>
      </div>
      </div>
      {this.state.category}
  </div>
      </>
      );
}
};