import React, { Fragment } from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";

import Titulo from "../../../titulo/Titulo";

// Formulario de añadir gastos
// import GastosForm from "./gastos/gastos/GastosForm";

// Formulario añadir comisionistas
import FormComisionistas from "./gastos/comisionistas/Admin";

// import AdminCotizaciones from "./pdf/cotizaciones/Admin";

import Preformas from "./pdf/preformas/Preformas";
import Facturas from "./pdf/facturas/Facturas";

function InventarioId(props) {
	// const [data, setData] = useState(props);
	const { nombre_proyecto, data } = props;

	// Inhability
	// id_cliente

	// console.log("Props:", data);

	const useStyles = makeStyles({
		titlePrincipal: {
			marginLeft: 15,
		},
		root: {
			minWidth: 275,
			marginBottom: 20,
		},
		bullet: {
			display: "inline-block",
			margin: "0 2px",
			transform: "scale(0.8)",
		},
		title: {
			fontSize: 22,
		},
		pos: {
			marginBottom: 12,
		},
		list: {
			margin: 0,
			padding: 10,
		},
	});

	const classes = useStyles();

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
			<div
				style={{
					marginTop: 20,
					marginLeft: 10,
					marginRight: 10,
				}}
			>
				<div>
					<Titulo text={nombre_proyecto} />
					<br />
					{data.map((item, key) => (
						<Card key={key} className={classes.root}>
							<CardContent>
								<Typography
									className={classes.title}
									color="textSecondary"
									gutterBottom
								>
									{item.descripcion}
								</Typography>

								<p>
									<b>Fecha:</b> {item.fecha}
								</p>

								{/*<Typography
									className={classes.title}
									color="textSecondary"
									gutterBottom
								>
									Inventario:
								</Typography>*/}

								{JSON.parse(item.inventario).map((data) => (
									<ul
										key={key + data.service}
										className={classes.list}
									>
										<li>
											<b>Servicio:</b> {data.service}
										</li>
										<li>
											<b>Precio:</b> {data.price}
										</li>
										<li>
											<b>Cantidad:</b> {data.count}
										</li>
									</ul>
								))}

								<h3>
									Total:{" "}
									{operacionTotal(item.inventario, key)}
								</h3>
								{/*<p>{item.inventario}</p>*/}
							</CardContent>
						</Card>
					))}
				</div>

				{/*<div>
					<GastosForm id_cliente={id_cliente} gastos={data} />
				</div>*/}

				<div>
					<FormComisionistas />
				</div>

				{/*<div>
					<AdminCotizaciones />
				</div>*/}
				<div>
					<Preformas />
				</div>
				<div>
					<Facturas />
				</div>
			</div>
		</Fragment>
	);
}
export default InventarioId;
