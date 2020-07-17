import React, { Fragment } from "react";
import {
	Card,
	CardContent,
	Typography,
	Divider,
	makeStyles,
} from "@material-ui/core";

// import Titulo from "../../../titulo/Titulo";

// Formulario de añadir gastos
import GastosForm from "./gastos/gastos/GastosForm";

// Formulario añadir comisionistas
import FormComisionistas from "./gastos/comisionistas/Admin";

import AdminCotizaciones from "./pdf/cotizaciones/Admin";

import Preformas from "./pdf/preformas/Admin";
import Facturas from "./pdf/facturas/Admin";

// Styles
const useStyles = makeStyles({
	titlePrincipal: {
		marginLeft: 15,
	},
	root: {
		minWidth: 275,
		marginBottom: 20,
	},
	title: {
		fontSize: 22,
	},
	list: {
		margin: 0,
		padding: 10,
	},
});

function InventarioId(props) {
	const { id_cliente, data } = props;

	// Inhability
	// id_cliente

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

	// Styles
	const classes = useStyles();

	return (
		<Fragment>
			<div
				style={{
					marginTop: 20,
					marginLeft: 10,
					marginRight: 10,
				}}
			>
				<div>
					{data.map((item, key) => (
						<Card key={key} className={classes.root}>
							<CardContent>
								<Typography
									className={classes.title}
									color="textSecondary"
									gutterBottom
								>
									Inventario
								</Typography>
								{/*<Typography variant="h6" component="p">
									Descripción:
								</Typography>*/}
								<p style={{ marginTop: "0" }}>
									{item.descripcion}
								</p>
								<Typography variant="body2" component="p">
									<b>Fecha</b> {item.fecha}
								</Typography>
								<br />
								<Divider />
								<br />
								<b>Lista servicios</b>
								{JSON.parse(item.inventario).map((data, i) => (
									<div key={i} className={classes.list}>
										<div>
											<b>Servicio:</b> {data.service}
										</div>
										<div>
											<b>Precio:</b> {data.price}
										</div>
										<div>
											<b>Cantidad:</b> {data.count}
										</div>
									</div>
								))}
								<br />
								<Divider />
								<br />
								{/*<Typography variant="h5" component="h6">*/}
								Total: ${operacionTotal(item.inventario, key)}
								{/*</Typography>*/}
								{/*<p>{item.inventario}</p>*/}
							</CardContent>
						</Card>
					))}
				</div>
				<br />
				<br />
				<div>
					<GastosForm id_cliente={id_cliente} gastos={data} />
				</div>
				<div>
					<FormComisionistas />
				</div>
				<div>
					<AdminCotizaciones data={data} />
				</div>

				<div>
					<Preformas data={data} />
				</div>
				<div>
					<Facturas />
				</div>
			</div>
		</Fragment>
	);
}
export default InventarioId;
