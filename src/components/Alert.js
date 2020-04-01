import React from 'react';

export const Alert = ({ alertMessage }) => {
	return (
		<div className={alertMessage !== '' ? 'alert alert-danger' : null}>
			{alertMessage}
		</div>
	);
};
