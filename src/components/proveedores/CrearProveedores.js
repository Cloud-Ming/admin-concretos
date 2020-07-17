import React, { Fragment, useState } from "react";
// import { Usercontext } from "../../context/Context";
import { Link } from "react-router-dom";

import {
	makeStyles,
	Grid,
	Typography,
	TextField,
	InputLabel,
	FormControl,
	Select,
	Button,
	Snackbar,
} from "@material-ui/core";

// Icons
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import GroupIcon from "@material-ui/icons/Group";

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

function CrearProveedores() {
	const [datos, setDatos] = useState({
		proveedor: "",
		email: null,
		celular: null,
		id_servicio: 0,
		producto: "Cemento",
		monto: 0,
	});

	const [open, setOpen] = useState(false);
	const [errorLogin, setErrorLogin] = useState("A ocurrido un error");

	//Manejador state input
	const handleChange = (event) => {
		console.log(event.target.name, event.target.value);

		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		});
	};

	// Manejador de envío
	const handleonSubmit = async (event) => {
		event.preventDefault();
		// event.target.reset();
		if (
			datos.proveedor.length === 0 ||
			datos.email.length === 0 ||
			datos.celular.length === 0 ||
			datos.id_servicio.length === 0 ||
			datos.producto.length === 0 ||
			datos.monto.length === 0
		) {
			setErrorLogin("Completa todo los campos");
			handleClick();
			return;
		}

		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("proveedor", datos.proveedor);
		formData.append("email", datos.email);
		formData.append("celular", datos.celular);
		formData.append("id_servicio", datos.id_servicio);
		formData.append("producto", datos.producto);
		formData.append("monto", datos.monto);
		formData.append("fecha_creacion", new Date().toLocaleString());

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/proveedores/crearProveedores.php",
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
					setErrorLogin("Error al crear proveedor");
					handleClick();
					return;
				}

				// console.log("'Exito'", res);

				setDatos({
					proveedor: "",
					email: "",
					celular: "",
					monto: "",
				});

				setErrorLogin("Proveedor creado con éxito");
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

	// Manejador alerta
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
					Registrar proveedor
				</Typography>
				{/*<p>Registrar nueva empresa proveedora</p>*/}

				<form
					onSubmit={handleonSubmit}
					className={classes.root}
					noValidate
					autoComplete="on"
				>
					<TextField
						id="nombre_input"
						label="Nombre empresa proveedora"
						variant="outlined"
						name="proveedor"
						onChange={handleChange}
						value={datos.proveedor}
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

					<FormControl
						variant="filled"
						className={classes.formControl}
					>
						<InputLabel htmlFor="filled-age-native-simple">
							Comisionistas
						</InputLabel>
						<Select
							native
							inputProps={{
								name: "producto",
								id: "filled-age-native-simple",
							}}
							value={datos.producto}
							onChange={(event) => handleChange(event)}
						>
							<option value={"Cemento"}>Cemento</option>
							<option value={"más"}>Agregar más</option>
						</Select>
					</FormControl>
					<br />

					<TextField
						id="precio_input"
						label="Precio"
						variant="outlined"
						name="monto"
						type="number"
						onChange={handleChange}
						value={datos.monto}
					/>

					<br />

					<Button
						type="submit"
						variant="contained"
						color="primary"
						startIcon={<GroupIcon />}
						className={classes.sendButton}
					>
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
						<Fragment>
							<Button
								color="secondary"
								size="small"
								component={Link}
								to="/proveedores"
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
				{/*<Link to="/proveedores">Todos los proveedores</Link>*/}
			</Grid>
		</Fragment>
	);
}

export default CrearProveedores;
