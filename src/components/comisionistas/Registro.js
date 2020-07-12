import React, { Fragment, useState } from "react";

import { Link } from "react-router-dom";

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

function RegistroClientes() {
	const [datos, setDatos] = useState({
		nombre: "",
		celular: "",
		fecha: new Date().toLocaleString(),
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
		if (datos.nombre.length === 0 || datos.fecha.length === 0) {
			setErrorLogin("Completa todo los campos");
			handleClick();
			return;
		}

		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("nombre", datos.nombre);
		formData.append("celular", datos.celular);
		formData.append("fecha", datos.fecha);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/comisionistas/nuevoComisionista.php",
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

				setErrorLogin("Comisionista registrado con éxito");
				handleClick();
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
					Registrar comisionista
				</Typography>

				<form
					onSubmit={handleonSubmit}
					className={classes.root}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="nombre"
						label="Nombre"
						variant="outlined"
						name="nombre"
						type="text"
						onChange={handleChange}
					/>

					<br />

					<TextField
						id="celular"
						label="Celular"
						variant="outlined"
						name="celular"
						type="text"
						onChange={handleChange}
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
							{
								<Button
									component={Link}
									to="/comisionistas"
									color="secondary"
									size="small"
									onClick={handleClose}
								>
									VOLVER
								</Button>
							}
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

export default RegistroClientes;
