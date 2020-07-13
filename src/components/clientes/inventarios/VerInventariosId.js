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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


function VerInventariosId(props) {
	// Props data
	const { id_cliente, nombre_cliente, nombre_proyecto } = props;
	const inventarios = props.data;

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
	return (
		<Fragment>
			<div
				style={{
					marginTop: 20,
					marginLeft: 10,
					marginRight: 10,
				}}
			>
				<h2>{`Cliente: ${nombre_cliente}`}</h2>
				<h1
					style={{ margin: "0" }}
				>{`Inventarios(${inventarios.length}): ${nombre_proyecto}`}</h1>
				<p>
					Administra los inventarios relacionados a este proyecto{" "}
					<b>({nombre_proyecto})</b>
				</p>
				{/*<h1>{`Proyecto: ${nombre_proyecto}`}</h1>*/}
				{/*<h2>Proyecto</h2>*/}

				<br />
				{inventarios.map((inventario, key) => (
					<Card
						key={key}
						className={classes.root}
						style={{ backgroundColor: "rgb(184, 253, 170)" }}
					>
						<CardContent>
							<h2>{inventario.descripcion}</h2>

							<Typography variant="body2" component="p">
								<b>Fecha</b> {inventario.fecha}
							</Typography>

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
								>
									Ver inventario
								</Button>
							</CardActions>

							{/*<Link to={"/ver-inventario/"}>Ver inventario</Link>*/}
						</CardContent>
					</Card>
				))}

				<Link to={`/ver-proyectos/${id_cliente}/${btoa(nombre_cliente)}`}><ArrowBackIcon />Proyectos</Link>
				{/*<Link to={`/ver-proyectos/${id_cliente}/${btoa(nombre_cliente)}`}>Proyectos</Link>*/}
			</div>
		</Fragment>
	);
}

export default VerInventariosId;
