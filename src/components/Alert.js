import React from 'react';

export const Alert = ({ alertMessage, alertClass }) => {
	return (
		<div className={alertMessage !== '' ? alertClass : null}>
			{alertMessage}
		</div>
	);
};
