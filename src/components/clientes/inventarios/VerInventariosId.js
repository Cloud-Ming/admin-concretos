import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import Titulo from "../../titulo/Titulo";

import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
	makeStyles,
} from "@material-ui/core";

// import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";

import DeleteIcon from "@material-ui/icons/Delete";
import Assignment from "@material-ui/icons/Assignment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function VerInventariosId(props) {
	// Props data
	const { id_cliente, nombre_cliente, nombre_proyecto } = props;
	const inventarios = props.data;

	// Operaciones
	const suma = (data, key) => {
		let json = JSON.parse(data);

		let result = [];

		// console.log(json);

		for (var i = 0; i < json.length; i++) {
			result.push(parseInt(json[i].price * json[i].count));
			// console.log(key, json[i]);
		}

		const reducer = (accumulator, currentValue) =>
			accumulator + currentValue;
		// console.log(result.reduce(reducer));
		// console.log(result);

		return result.reduce(reducer);
	};

	// const recorrerArrays = (service) => {
	// 	let list = [];
	// 	list.push(service);
	// 	return list;
	// };

	// Styles
	const useStyles = makeStyles({
		titlePrincipal: {
			marginLeft: 15,
		},
		root: {
			minWidth: 275,
			marginBottom: 20,
			backgroundColor: "#f7f4f4",
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
				<br />
				<br />
				<Typography variant="h3" component="h3">
					{`Cliente(${nombre_cliente})`}
				</Typography>

				<Typography variant="h4" component="h5">
					{`Inventarios(${inventarios.length}): ${nombre_proyecto}`}
				</Typography>
				
				<p>
					Administra los inventarios relacionados a este proyecto{" "}
					<b>({nombre_proyecto})</b>
				</p>
				<br />
				<Button
					component={Link}
					to={`/crear-inventario/${id_cliente}/${btoa(
						nombre_proyecto
					)}/${btoa(nombre_cliente)}`}
					variant="contained"
					color="primary"
					startIcon={<Assignment />}
				>
					Crear nuevo inventario
				</Button>
				{/*<h1>{`Proyecto: ${nombre_proyecto}`}</h1>*/}
				{/*<h2>Proyecto</h2>*/}

				<br />
				<br />

				{inventarios.map((inventario, key) => (
					<Card
						key={key}
						className={classes.root}
						style={{ backgroundColor: "rgba(253, 213, 170, 0.7)" }}
					>
						<CardContent>
							<Typography variant="h6" component="p">
								{inventario.descripcion}
							</Typography>

							<Typography variant="body2" component="p">
								<b>Fecha</b> {inventario.fecha}
							</Typography>

							<br />
							<br />
							<b>Servicios: </b>

							{JSON.parse(inventario.inventario).map(
								(data, i) => (
									<div key={i} className={classes.list}>
										<div>
											<b>{i + 1}.</b> &nbsp;
											<b>Servicio:</b> {data.service}
										</div>
										{/*<li>
										<b>Precio:</b> {data.price}
									</li>
									<li>
										<b>Cantidad:</b> {data.count}
									</li>}*/}
									</div>
								)
							)}

							<h3>Total: ${suma(inventario.inventario, key)}</h3>

							<CardActions>
								<Button
									component={Link}
									to={`/ver-inventario/${
										inventario.id
									}/${btoa(nombre_proyecto)}/${btoa(
										nombre_cliente
									)}`}
									size="small"
									startIcon={<Assignment />}
								>
									Ver inventario
								</Button>
								&nbsp;
								<Button
									disabled
									size="small"
									startIcon={<DeleteIcon />}
								>
									Eliminar inventario
								</Button>
							</CardActions>

							{/*<Link to={"/ver-inventario/"}>Ver inventario</Link>*/}
						</CardContent>
					</Card>
				))}

				<Link
					to={`/ver-proyectos/${id_cliente}/${btoa(nombre_cliente)}`}
				>
					<ArrowBackIcon />
					Proyectos
				</Link>
				{/*<Link to={`/ver-proyectos/${id_cliente}/${btoa(nombre_cliente)}`}>Proyectos</Link>*/}
			</div>
		</Fragment>
	);
}

export default VerInventariosId;
