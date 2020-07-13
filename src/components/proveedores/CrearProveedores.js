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

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function CrearProveedores() {
	const [datos, setDatos] = useState({
		proveedor: "",
		email: null,
		celular: null,
		id_servicio: 0,
		producto: "Cemento",
		monto: 0,
		fecha_creacion: new Date().toLocaleString(),
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
			datos.monto.length === 0 ||
			datos.fecha_creacion.length === 0
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
		formData.append("fecha_creacion", datos.fecha_creacion);

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

				setErrorLogin("Proveedor creado con éxito");
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
	const useStyles = makeStyles((theme) => ({
		root: {
			"& > *": {
				margin: theme.spacing(1),
				width: "30ch",
			},
		},
	}));

	const classes = useStyles();

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
					Registrar proveedor
				</Typography>
				<p>Registrar nueva empresa proveedora</p>

				<form
					onSubmit={handleonSubmit}
					className={classes.root}
					noValidate
					autoComplete="off"
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

					{/*	<TextField
						id="producto_input"
						label="Producto"
						variant="outlined"
						name="product"
						type="tel"
						onChange={handleChange}
					/>*/}
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
						<Fragment>
							<Button
								color="secondary"
								size="small"
								component={Link}
								to="/proveedores"
							>
								Volver
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

				{/*	</Grid>*/}
				{/*<h3>{datos.email}</h3>*/}
				{/*<h3>{datos.contrasena}</h3>*/}

				<Link to="/proveedores">Todos los proveedores</Link>
			</Grid>
		</Fragment>
	);
}

export default CrearProveedores;
