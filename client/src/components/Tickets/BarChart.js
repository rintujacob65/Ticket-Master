import React from 'react'
import { Chart } from 'react-google-charts'
import { connect } from 'react-redux'

function BarChart(props){
    return(
        <div>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Departments', 'Tickets'],
                    ['IT', 1 ],
                    ['Finance', 2 ],
                    ['Maths', 3 ],
                ]}
                options={{
                    chart: {
                        title: 'Tickets By Department'
                    },
                }}
                rootProps={{ 'data-testid': '2' }}
            />
        </div>
    )
}

export default BarChart