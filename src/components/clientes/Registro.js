import React, { Fragment, useState } from "react";
// import { Usercontext } from "../../context/Context";
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
import BusinessIcon from "@material-ui/icons/Business";

// Styles
const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "30ch",
		},
	},
	grid: {
		minHeight: "100vh",
		backgroundColor: "rgba(202, 202, 202, 0.18)",
	},
}));

// Component
function RegistroClientes() {
	const [datos, setDatos] = useState({
		nombre: "",
		email: "",
		celular: "",
		cedula: "",
		ciudad: "",
	});

	const [open, setOpen] = useState(false);
	const [errorLogin, setErrorLogin] = useState("A ocurrido un error");

	// Handler form
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
		if (
			datos.nombre.length === 0 ||
			datos.email.length === 0 ||
			datos.celular.length === 0 ||
			datos.cedula.length === 0 ||
			datos.ciudad.length === 0
		) {
			setErrorLogin("Completa todo los campos");
			handleClick();
			return;
		}

		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("nombre", datos.nombre);
		formData.append("email", datos.email);
		formData.append("celular", datos.celular);
		formData.append("cedula", datos.cedula);
		formData.append("ciudad", datos.ciudad);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/clientes/nuevoCliente.php",
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
					email: "",
					celular: "",
					cedula: "",
					ciudad: "",
				});

				setErrorLogin("Cliente registrado existosamente");
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
				<Typography variant="h4" component="h4">
					Registrar cliente
				</Typography>

				<form
					onSubmit={handleonSubmit}
					className={classes.root}
					noValidate
					autoComplete="on"
				>
					<TextField
						id="nombre_input"
						label="Nombre"
						variant="outlined"
						name="nombre"
						onChange={handleChange}
						value={datos.nombre}
					/>

					<br />

					<TextField
						id="email_input"
						label="Email"
						variant="outlined"
						name="email"
						type="email"
						onChange={handleChange}
						value={datos.email}
					/>

					<br />
					<TextField
						id="celular_input"
						label="Celular"
						variant="outlined"
						name="celular"
						type="tel"
						onChange={handleChange}
						value={datos.celular}
					/>

					<br />

					<TextField
						id="cedula_input"
						label="Cedula ó NIT"
						variant="outlined"
						name="cedula"
						type="text"
						onChange={handleChange}
						value={datos.cedula}
					/>

					<br />

					<TextField
						id="ciudad_input"
						label="Ciudad"
						variant="outlined"
						name="ciudad"
						type="text"
						onChange={handleChange}
						value={datos.ciudad}
					/>

					<br />

					<Button
						type="submit"
						variant="contained"
						color="primary"
						startIcon={<BusinessIcon />}
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
								color="secondary"
								size="small"
								component={Link}
								to="/clientes"
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
