import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
// import Titulo from "../../titulo/Titulo";

import {
	Card,
	CardContent,
	CardActions,
	Divider,
	Snackbar,
	Typography,
	Button,
	makeStyles,
} from "@material-ui/core";

// import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";

// Icons
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import Assignment from "@material-ui/icons/Assignment";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Styles
const useStyles = makeStyles({
	titlePrincipal: {
		marginLeft: 15,
	},
	root: {
		minWidth: 275,
		marginBottom: 20,
		backgroundColor: "#f4f4f4",
	},
	title: {
		fontSize: 22,
	},
	list: {
		margin: 0,
		padding: 10,
	},
});

function VerInventariosId(props) {
	// Props data
	const { id_cliente, nombre_cliente, nombre_proyecto } = props;
	const [inventarios, setInventarios] = useState(props.data);

	const [open, setOpen] = useState(false);
	const [error, setError] = useState("A ocurrido un error");

	// Alertas
	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const eliminarInventario = (id) => {
		let conf = window.confirm("Esta seguro de eliminarlo?");
		
		if(conf === false){	
			console.log(id, "Ya no se elimina");
			return;
		}

		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id", id);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/clientes/inventarios/eliminarInventarioId.php",
			{
				method: "POST",
				mode: "cors",
				signal: abortController.signal,
				body: formData,
			}
		)
			.then((res) => res.json())
			.then((res) => {
				if (res === 401) {
					handleClick();
					setError("Error al crear comision");
					return;
				}
				
				const newList = inventarios.filter((item) => item.id !== id);
				setInventarios(newList);
				
				handleClick();
				setError("Inventario eliminado con éxito");
			})
			.catch((err) => {
				console.error("Request failed", err);
				handleClick();
				setError("A ocurrido un error");
			});

		// Cancel the request if it takes more than 5 seconds
		setTimeout(() => abortController.abort(), 5000);

		//Controler
	};

	// Operaciones
	/*const suma = (data, key) => {
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
	};*/

	// const recorrerArrays = (service) => {
	// 	let list = [];
	// 	list.push(service);
	// 	return list;
	// };

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
				<br />
				<br />
				<Typography variant="h3" component="h3">
					{`Inventarios (${inventarios.length})`}
				</Typography>

				<p>
					Inventario: <b>{nombre_proyecto}</b>
				</p>

				<p>
					Administra los inventarios relacionados a este proyecto{" "}
					<b>({nombre_proyecto})</b>
				</p>
				<br />
				{/*<h1>{`Proyecto: ${nombre_proyecto}`}</h1>*/}
				{/*<h2>Proyecto</h2>*/}

				<br />
				<br />

				{inventarios.map((inventario, key) => (
					<div key={key}>
						<Card className={classes.root}>
							<CardContent>
								<Typography variant="h6" component="p">
									Descripción:
								</Typography>
								<p style={{ marginTop: "0" }}>
									{inventario.descripcion}
								</p>
								<Typography variant="body2" component="p">
									<b>Fecha</b> {inventario.fecha}
								</Typography>
								<br />
								<Divider />
								<br />
								<b>Lista servicios: </b>
								{JSON.parse(inventario.inventario).map(
									(data, i) => (
										<div key={i} className={classes.list}>
											<div>
												<b>{i + 1}.</b> {data.service}
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

								{/*	<h3>
									Total: ${suma(inventario.inventario, key)}
								</h3>*/}
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
										size="small"
										startIcon={<DeleteIcon />}
										onClick={() =>
											eliminarInventario(inventario.id)
										}
									>
										Eliminar inventario
									</Button>
								</CardActions>
								{/*<Link to={"/ver-inventario/"}>Ver inventario</Link>*/}
							</CardContent>
						</Card>
					</div>
				))}

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
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
					message={error}
					action={
						<Fragment>
							{/*
							<Button
								color="secondary"
								size="small"
								onClick={handleClose}
							>
								UNDO
							</Button>
							*/}
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={handleClose}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</Fragment>
					}
				/>
				{/*<Link
					to={`/ver-proyectos/${id_cliente}/${btoa(nombre_cliente)}`}
				>
					<ArrowBackIcon />
					Proyectos
				</Link>*/}
				{/*<Link to={`/ver-proyectos/${id_cliente}/${btoa(nombre_cliente)}`}>Proyectos</Link>*/}
			</div>
		</Fragment>
	);
}

export default VerInventariosId;
