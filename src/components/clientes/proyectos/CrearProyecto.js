import React, { Fragment, useState } from "react";
// import { Usercontext } from "../../context/Context";
import { useParams } from "react-router-dom";
import {
	makeStyles,
	Grid,
	Typography,
	TextField,
	Button,
	Snackbar,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function CrearProyecto() {
	
	const { id } = useParams();
	console.log(id);

	const [datos, setDatos] = useState({
		id_cliente: id,
		nombre: "",
		descripcion: "",
		fecha: "",
	});

	const [open, setOpen] = useState(false);
	const [errorLogin, setErrorLogin] = useState("A ocurrido un error");

	const useStyles = makeStyles((theme) => ({
		root: {
			"& > *": {
				margin: theme.spacing(1),
				width: "30ch",
			},
		},
	}));

	const classes = useStyles();

	const handleChange = (event) => {
		console.log(event.target.name, event.target.value);

		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		});
	};

	const handleonSubmit = async (event) => {
		event.preventDefault();
		// event.target.reset();
		console.log(datos);

		if (
			datos.id_cliente.length === 0 ||
			datos.nombre.length === 0 ||
			datos.descripcion.length === 0 ||
			datos.fecha.length === 0
		) {
			setErrorLogin("Completa todo los campos");
			handleClick();
			return;
		}

		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id_cliente", datos.id_cliente);
		formData.append("nombre", datos.nombre);
		formData.append("descripcion", datos.descripcion);
		formData.append("fecha", datos.fecha);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/clientes/crearProyecto.php",
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
					setErrorLogin("Error al crear usuario");
					handleClick();
					return;
				}

				console.log(res);
			})
			.catch((err) => {
				console.error("Request failed", err);
				setErrorLogin("A ocurrido un error");
				handleClick();
			});

		// Cancel the request if it takes more than 5 seconds
		setTimeout(() => abortController.abort(), 5000);
	};

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<Fragment>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: "100vh" }}
			>
				{/*<Grid>*/}
				<Typography variant="h4" component="h4">
					Crear proyecto
				</Typography>

				<form
					onSubmit={handleonSubmit}
					className={classes.root}
					noValidate
					autoComplete="off"
				>
					{/*<input type="hidden" name="id_cliente" value={id} />*/}

					<TextField
						id="nombre_input"
						label="Nombre proyecto"
						variant="outlined"
						name="nombre"
						type="text"
						onChange={handleChange}
						required
					/>

					<br />

					<TextField
						id="descripcion_input"
						label="Descripción"
						variant="outlined"
						name="descripcion"
						type="text"
						onChange={handleChange}
						required
					/>

					<br />
					
					{/*label="Fecha"*/}
					<TextField
						id="fecha_input"
						variant="outlined"
						name="fecha"
						type="date"
						onChange={handleChange}
						required
					/>

					<br />

					<Button type="submit" variant="contained" color="primary">
						Registrar
					</Button>
				</form>

				{/*<Button onClick={handleClick}>A ocurrido un error</Button>*/}

				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
					message={errorLogin}
					action={
						<React.Fragment>
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
						</React.Fragment>
					}
				/>

				{/*	</Grid>*/}
				{/*<h3>{datos.email}</h3>*/}
				{/*<h3>{datos.contrasena}</h3>*/}
			</Grid>
		</Fragment>
	);
}

export default CrearProyecto;
