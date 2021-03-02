import React from 'react';
import config from 'config';
import { Form } from 'react-bootstrap';
import { Chart, ChartAxis, ChartBar, ChartDonutUtilization, ChartGroup, ChartLegendTooltip, ChartLine, ChartThemeColor, ChartVoronoiContainer, createContainer } from '@patternfly/react-charts';
import { ReactReduxContext } from 'react-redux';

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
        daily:[],
        category:[]
  }
}

sort_daily_data(arr) {
    let sorted_daily = arr.sort((a, b) => (a.day > b.day) ? 1 : -1);
    let day =1;
    let result =[];
    for(let i=0;i<sorted_daily.length;i++)
    {
        if(sorted_daily[i].day===day)
        {
            result.push({x:day,y:sorted_daily[i].amount});
            day=day+1;
        }
        else
        {
            while(day<sorted_daily[i].day)
            {
                result.push({x:day,y:0});
                day=day+1;
            }
            result.push({x:day,y:sorted_daily[i].amount});
            day=day+1;
        }
    }
    return result;
}

format_category(arr){
let result = [];
    for(let i=0;i<arr.length;i++)
    {
        result.push({x:arr[i].category,y:arr[i].amount})
    }
    return result;
}

async componentDidMount() {
  let sql_month = this.state.month + '-01';

  const url_balance = `${config.apiUrl}/expense/${this.props.userid}/${sql_month}`;
  const response_balance= await fetch(url_balance);
  const balance_data = await response_balance.json();

  const url_daily = `${config.apiUrl}/expense/daily/${this.props.userid}/${sql_month}`;
  const response_daily= await fetch(url_daily);
  const daily_data = await response_daily.json();

  let daily_data_formatted = this.sort_daily_data(daily_data);

  const url_category = `${config.apiUrl}/expense/category/${this.props.userid}/${sql_month}`;
  const response_category= await fetch(url_category);
  const category_data = await response_category.json();

  let category_data_formatted = this.format_category(category_data);

  this.setState({limit:balance_data[0].limitt,used:balance_data[0].used,daily:daily_data_formatted, category:category_data_formatted});
}

async componentDidUpdate(prevProps, prevState) {
    if(this.state.month !== prevState.month)
    {
        let sql_month = this.state.month + '-01';

  const url_balance = `${config.apiUrl}/expense/${this.props.userid}/${sql_month}`;
  const response_balance= await fetch(url_balance);
  const balance_data = await response_balance.json();

  const url_daily = `${config.apiUrl}/expense/daily/${this.props.userid}/${sql_month}`;
  const response_daily= await fetch(url_daily);
  const daily_data = await response_daily.json();

  let daily_data_formatted = this.sort_daily_data(daily_data);

  const url_category = `${config.apiUrl}/expense/category/${this.props.userid}/${sql_month}`;
  const response_category= await fetch(url_category);
  const category_data = await response_category.json();

  let category_data_formatted = this.format_category(category_data);

  this.setState({limit:balance_data[0].limitt,used:balance_data[0].used,daily:daily_data_formatted, category:category_data_formatted});
}
}

setMonth(event) {
    this.setState({month:event.target.value});
}


render()
{
    const CursorVoronoiContainer = createContainer("voronoi", "cursor");
    const legendData = [{ childName: 'daily', name: '$', symbol: { type: 'dash' }}];

  return(
      <>
      <Form>
          <Form.Control style={{width:'30%', border: 'none'}} size="lg" type="month" name="month" width="w-25" defaultValue={this.state.month} onChange={this.setMonth.bind(this)}/>
      </Form>
      <div class="container">
      <div class="row">
        <div class="col">
      
      <div style={{ height: '230px', width: '230px' }}>
      <ChartDonutUtilization
      ariaDesc="Used"
      ariaTitle="Used"
      constrainToVisibleArea={true}
      data={{ x: '$', y: this.state.used/this.state.limit * 100, color:"red" }}
      labels={({ datum }) => datum.x ? `${datum.y}% used` : null}
      subTitle={'$' + Math.floor(this.state.limit - this.state.used) + ' left'}
      title={'$ '+Math.ceil(this.state.used).toString()}
      animate="true"
      themeColor={ChartThemeColor.red}
    />
      </div>
      </div>
      </div>
      <div class="row">
        <div class="col-6">
      <div style={{ height: '275px', width: '450px' }}>
        <Chart
          ariaDesc="Daily Spending"
          ariaTitle="Daily Spending"
          containerComponent={
            <CursorVoronoiContainer
              cursorDimension="x"
              labels={({ datum }) => `${datum.y}`}
              labelComponent={<ChartLegendTooltip legendData={legendData} title={(datum) => this.state.month+'-'+datum.x}/>}
              mouseFollowTooltips
              voronoiDimension="x"
              voronoiPadding={50}
            />
          }
          legendPosition="bottom"
          height={275}
          padding={{
            bottom: 75, // Adjusted to accommodate legend
            left: 50,
            right: 50,
            top: 50
          }}
          themeColor={ChartThemeColor.green}
          width={450}
        >
          <ChartGroup>
            <ChartLine
              data={this.state.daily}
              name="daily"
            />
          </ChartGroup>
        </Chart>
      </div>
      </div>
      <div class="col-6">
      <div style={{ height: '250px', width: '700px' }}>
    <Chart
      ariaDesc="Monthly Category-wise Spending"
      ariaTitle="Monthly Category-wise Spending"
      containerComponent={<ChartVoronoiContainer labels={({ datum }) => `$ ${datum.y}`} constrainToVisibleArea />}
      domainPadding={{ x: [30, 25] }}
      height={250}
      padding={{
        bottom: 50,
        left: 50,
        right: 200, // Adjusted to accommodate legend
        top: 50
      }}
      width={600}
    >
        <ChartGroup offset={11} horizontal>
      <ChartBar data={this.state.category} />
      </ChartGroup>
    </Chart>
  </div>
  </div>
  </div>
  </div>
      </>
      );
}
};