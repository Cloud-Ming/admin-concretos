import React, { Fragment } from "react";
import { Card, CardContent, makeStyles } from "@material-ui/core";

// import Titulo from "../../../titulo/Titulo";

// Formulario de añadir gastos
// import GastosForm from "./gastos/gastos/GastosForm";

// Formulario añadir comisionistas
// import FormComisionistas from "./gastos/comisionistas/Admin";

import AdminCotizaciones from "./pdf/cotizaciones/Admin";

import Preformas from "./pdf/preformas/Preformas";
import Facturas from "./pdf/facturas/Facturas";

function InventarioId(props) {
	// const [data, setData] = useState(props);
	const { nombre_proyecto, nombre_cliente, data } = props;
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
					<br />
					{/*<h3>Inventarios</h3>*/}
					<h2>Cliente({atob(nombre_cliente)})</h2>
					{/*<Titulo text={nombre_proyecto} />*/}

					<h1>Proyecto({nombre_proyecto})</h1>
					<p>Inventarios</p>
					<br />
					{data.map((item, key) => (
						<Card key={key} className={classes.root}>
							<CardContent>
								<h4>{item.descripcion}</h4>
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
								<h4>Servicios:</h4>
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
										<div>
											<b>Gastos:</b> {data.gastos}
										</div>
									</div>
								))}

								<h3>
									Total:{" "} $
									{operacionTotal(item.inventario, key)}
								</h3>
								{/*<p>{item.inventario}</p>*/}
							</CardContent>
						</Card>
					))}
				</div>

				{/*<div>
					<GastosForm id_cliente={id_cliente} gastos={data} />
				</div>

				<div>
					<FormComisionistas />
				</div>
*/}
				<div>
					<AdminCotizaciones />
				</div>
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
