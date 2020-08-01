import React, { Fragment } from "react";
import Pagos from "./pagos/Admin";

// import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

// import { Divider } from "@material-ui/core/";

// const useStyles = makeStyles({
// 	root: {
// 		minWidth: 275,
// 	},
// 	bullet: {
// 		display: "inline-block",
// 		margin: "0 2px",
// 		transform: "scale(0.8)",
// 	},
// 	title: {
// 		fontSize: 14,
// 	},
// 	pos: {
// 		marginBottom: 12,
// 	},
// });

export default function Tabla(props) {
	const { data } = props;

	// Inhability
	// idCliente

	// Styles
	// const classes  useStyles();

	const operacionTotal = (data, key) => {
		let json = JSON.parse(data);
		let result = [];
		// console.log(json);
		for (var i = 0; i < json.length; i++) {
			result.push(parseInt(json[i].price * json[i].count));
			// console.log(key, json[i]);
		}

		const reducer = (accumulator, currentValue) =>
			accumulator + currentValue;
		return result.reduce(reducer);
	};

	return (
		<Fragment>
			<div style={{ padding: 10 }}>
				{/*<VerProyectosId data={data} />*/}

				{/*<Typography variant="h4" component="h4">
					Estados de cuenta - {atob(cliente)}({data.length})
				</Typography>*/}

				<Card>
					<CardHeader title="Ventas" />

					{data.map((inventario, index) => (
						<CardContent key={index}>
							<small>
								<b> No. control: </b> {index + 1}
							</small>
							<p>
								<b>Descripción:</b> {inventario.descripcion}
							</p>
							<small>
								<b>Fecha: </b>
								{inventario.fecha}
							</small>
							<p>
								<b>Inventario: </b>
							</p>
							{JSON.parse(inventario.inventario).map(
								(item, i) => (
									<div
										key={i}
										style={{
											backgroundColor: "#f7f5f5",
											marginTop: 10,
											padding: 10,
										}}
									>
										<p>
											<b>Servicio: </b> {item.service}
										</p>

										<p>
											<b>Precio: </b> {item.price}
										</p>

										<p>
											<b>Cantidad: </b> {item.count}
										</p>
									</div>
								)
							)}
						</CardContent>
					))}
				</Card>
				<br />
				<Pagos />

				<br />
				<Card>
					<CardHeader title={`Total a pagar:`} />
				</Card>
			</div>
		</Fragment>
	);
}
