import React from 'react';


const Snake = (props) => {
	return(
		<div>
			{props.snakeDots.map((dots, i) => {
				const style= {left: `${dots[0]}%`, top: `${dots[1]}%`}
				return(
					<div className='sdot' key={i} style={style}></div>
				)
			})}
		</div>
	)

}

export default Snake; 
