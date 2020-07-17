import React, { Fragment } from "react";
import Pagos from "./pagos/Admin";

// import { makeStyles } from "@material-ui/core/styles";
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
	const { idCliente, cliente, data } = props;
	console.log(idCliente);
	// Inhability
	// idCliente

	// Styles
	// const classes  useStyles();

	return (
		<Fragment>
			<div style={{ padding: 10 }}>
				{/*<VerProyectosId data={data} />*/}
				<br />
				<br />
				<Typography variant="h4" component="h4">
					Estados de cuenta - {atob(cliente)}({data.length})
				</Typography>
				<p>Visualiza las cuentas de cada cliente</p>
				<br />
				{data.map((inventario, index) => (
					<div key={index}>
						<Card>
							<CardContent>
								<h3>
									<b> Item </b> {index + 1}
								</h3>
								<p>
									<b>Descripción:</b> {inventario.descripcion}
								</p>
								<p>
									<b>Fecha: </b>
									{inventario.fecha}
								</p>
								<p>
									<b>Descripcion: </b>
									{inventario.descripcion}
								</p>
								<b>Inventario: </b>

								{JSON.parse(inventario.inventario).map(
									(item) => (
										<div key={index}>
											<p>
												<b>Servicio: </b> {item.service}
											</p>
											<p>
												<b>Precio: </b> {item.price}
											</p>
											<p>
												<b>Cantidad: </b> {item.count}
											</p>
											<p>
												<b>iva: </b>{" "}
												{parseFloat(item.iva)}%
											</p>
											<p>
												<b>Valor iva: </b>{" "}
												{parseInt(item.price) *
													parseFloat(item.iva)}
											</p>

											<p>
												<b>Id servicio: </b>{" "}
												{item.id_service}
											</p>

											<p>
												<b>Retención: </b>{" "}
												{item.retencion}%
											</p>

											<p>
												<b>Retención: </b>{" "}
												{parseInt(item.price) *
													parseFloat(item.retencion)}
											</p>
										</div>
									)
								)}
							</CardContent>
						</Card>
						<br />
					</div>
				))}
				<br />
				<Pagos />

				<br />
				<p>
					<b>Saldo a favor de: </b> $0
				</p>
				<p>
					<b>Retención de la fuente: </b> $0
				</p>
				<p>
					<b>Total a pagar:</b> $0
				</p>
				

				
			</div>
		</Fragment>
	);
}
