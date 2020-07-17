import React, { Fragment, useState } from "react";

import { Link } from "react-router-dom";

import {
	makeStyles,
	Grid,
	// Typography,
	TextField,
	Button,
	Snackbar,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "30ch",
		},
	},
	grid: {
		marginTop:"25px",
		margintBottom:"25px",
	},
}));

function RegistroClientes() {
	const [datos, setDatos] = useState({
		nombre: "",
		celular: "",
		fecha: new Date().toLocaleString(),
	});

	const [open, setOpen] = useState(false);
	const [errorLogin, setErrorLogin] = useState("A ocurrido un error");

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

				// Reset form
				setDatos({
					nombre: "",
					celular: "",
				});
				
				setErrorLogin("Comisionista registrado con éxito");
				handleClick();
			})
			.catch((err) => {
				console.error("Request failed", err);
				setErrorLogin("A ocurrido un error");
				handleClick();
			});

		// Cancel the request if it takes more than 5 seconds
		setTimeout(() => abortController.abort(), 1000);
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

	// Styles
	const classes = useStyles();

	return (
		<Fragment>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				className={classes.grid}
			>
				{/*<Grid>*/}
				{/*<Typography variant="h4" component="h4">
					Registrar comisionista
				</Typography>*/}

				<form
					onSubmit={handleonSubmit}
					className={classes.root}
					noValidate
					autoComplete="on"
				>
					<TextField
						id="nombre"
						label="Nombre"
						variant="outlined"
						name="nombre"
						type="text"
						onChange={handleChange}
						value={datos.nombre}
					/>

					<br />

					<TextField
						id="celular"
						label="Celular"
						variant="outlined"
						name="celular"
						type="text"
						onChange={handleChange}
						value={datos.celular}
					/>

					<br />

					<Button
						type="submit"
						variant="contained"
						color="primary"
						startIcon={<GroupAddIcon />}
						className={classes.sendButton}
					>
						Registrar
					</Button>
				</form>

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
						<Fragment>
							<Button
								component={Link}
								to="/comisionistas"
								color="secondary"
								size="small"
								onClick={handleClose}
							>
								VER
							</Button>

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
			</Grid>
		</Fragment>
	);
}

export default RegistroClientes;
