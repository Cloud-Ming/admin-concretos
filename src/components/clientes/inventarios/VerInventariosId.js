import React, { Fragment } from "react";
import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
	makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

function VerProyecto(props) {
	const nombre_proyecto = props.nombre_proyecto;
	// console.log(nombre_proyecto);

	const inventarios = props.data;
	// console.log(inventarios);

	const useStyles = makeStyles({
		titlePrincipal: {
			marginLeft: 15,
		},
		root: {
			minWidth: 275,
			marginBottom: 20,
			backgroundColor: "#bee3e380",
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

	const reducerPrew = (data, key) => {
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
			<h1 className={classes.titlePrincipal}>
				Inventarios: {nombre_proyecto}
			</h1>
			<div style={{ margin: "10px" }}>
				{inventarios.map((inventario, key) => (
					<Card key={key} className={classes.root}>
						<CardContent>
							<Typography
								className={classes.title}
								color="textSecondary"
								gutterBottom
							>
								{inventario.descripcion}
							</Typography>

							<Typography variant="body2" component="p">
								{inventario.fecha}
							</Typography>

							<h2>Inventario: </h2>

							{JSON.parse(inventario.inventario).map((data) => (
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
								Total: $
								{reducerPrew(inventario.inventario, key)}
							</h3>

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
									to={`/ver-inventario/${inventario.id}`}
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

export default VerProyecto;
