import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";

export default function Titulo(props) {
	const { text } = props;

	return (
		<Fragment>
			<Typography variant="h4" component="h3">
				{text}
			</Typography>
		</Fragment>
	);
}
