import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";
// import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";

function ComisionistaId(props) {
	const { comisionista, data } = props;

	return (
		<Fragment>
			<div style={{ padding: 10 }}>
				<h1>
					Comisiones: {atob(comisionista)}({data.length})
				</h1>

				{data.map((item, index) => (
					<div key={index}>
						<Card variant="outlined">
							<CardContent>
								{" "}
								<p>Fecha: {item.fecha}</p>
								<p>Proyecto: {item.inventario}</p>
								<p>Monto: ${item.monto}</p>
							</CardContent>
						</Card>
						<br />
					</div>
				))}
			</div>
		</Fragment>
	);
}
export default ComisionistaId;
