import React, { Fragment } from "react";
// import Titulo from "../../titulo/Titulo";
import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
	makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

function VerInventariosId(props) {
	const { nombre_cliente, nombre_proyecto } = props;
	console.log(props);
	const inventarios = props.data;
	// console.log(inventarios);

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
							{/*<Typography
								className={classes.title}
								color="textSecondary"
								gutterBottom
							>
								{inventario.descripcion}
							</Typography>*/}
							<h2>{inventario.descripcion}</h2>

							<Typography variant="body2" component="p">
								<b>Fecha</b> {inventario.fecha}
							</Typography>

							<b>Inventario: </b>

							{JSON.parse(inventario.inventario).map((data) => (
								<ul
									key={key + data.service}
									className={classes.list}
								>
									<li>
										<b>Servicio:</b> {data.service}
									</li>
									{/*<li>
										<b>Precio:</b> {data.price}
									</li>
									<li>
										<b>Cantidad:</b> {data.count}
									</li>}*/}
								</ul>
							))}

							<h3>Total: ${suma(inventario.inventario, key)}</h3>

							{/*{JSON.parse(inventario.inventario).map((data) => {
								return (
									<div key={key + data.service}>
										{data.count}
									</div>
								);
							})}*/}

							<CardActions>
								<Button
									component={Link}
									to={`/ver-inventario/${
										inventario.id
									}/${btoa(nombre_proyecto)}/${btoa(nombre_cliente)}`}
									size="small"
								>
									Ver inventario
								</Button>
							</CardActions>

							{/*<Link to={"/ver-inventario/"}>Ver inventario</Link>*/}
						</CardContent>
					</Card>
				))}
			</div>
		</Fragment>
	);
}

export default VerInventariosId;
