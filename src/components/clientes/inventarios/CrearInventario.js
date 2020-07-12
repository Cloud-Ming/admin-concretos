import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom";
// import { Usercontext } from "../../context/Context";
import { useParams } from "react-router-dom";
import {
	makeStyles,
	Grid,
	TextField,
	Button,
	Snackbar,
	Divider,
	FormControlLabel,
	Checkbox,
	InputLabel,
	FormControl,
	Select,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function CrearInventario() {
	const { id, proyecto, cliente } = useParams();

	const [datos, setDatos] = useState({
		id_proyecto: id,
		fecha: new Date().toLocaleString(),
		descripcion: "",
	});

	//Aqui se maneja el estado de los servicios en Array listo para enviar a el backend
	const [servicesState, setServicesState] = useState([]);

	// Aqui se maneja el estado antes de entrar a `servicesState`
	const [datosForm, setDatosForm] = useState({
		id: 1,
		client: "",
		typeService: "0",
		service: "Concreto psi",
		price: 0,
		count: 0,
		iva: 0,
		retencion: 0,
		id_service: 0,
		natural: false,
	});

	const [state, setState] = React.useState({
		natural: false,
	});

	// CREACION SERVICIOS

	const checkIva = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const handleChangeServices = (event) => {
		// console.log(event.target);
		// console.log(event.target.name, datosForm);

		setDatosForm({
			...datosForm,
			[event.target.name]: event.target.value,
		});
	};

	const addService = () => {
		let iva = "0%",
			retencion = "0%",
			service = "Concreto",
			id_service = "0";

		const typeService = datosForm.typeService;
		const iFnatural = state.natural;

		if (typeService === "0") {
			if (iFnatural) {
				console.log("retención 0% e iva 19%");
				iva = "19%";
				retencion = "0%";
			} else {
				console.log("retención 2.5% e iva 19%");
				iva = "19%";
				retencion = "2.5%";
			}

			id_service = "2";
		} else if (typeService === "1") {
			if (iFnatural) {
				console.log("retencion 0% iva 19%");
				iva = "19%";
				retencion = "0%";
			} else {
				console.log("retencion 4% iva 19%");
				iva = "19%";
				retencion = "4%";
			}
		} else if (typeService === "2") {
			if (iFnatural) {
				console.log("retencion 0% iva 19%");
				iva = "19%";
				retencion = "0%";
			} else {
				console.log("retencion 1% iva 0%");
				iva = "0%";
				retencion = "1%";
			}
		}

		if (datosForm.service === "0") {
			console.log("Concreto PSI 351");

			service = "Concreto PSI 351";
			id_service = "0";
		} else if (datosForm.service === "1") {
			console.log("Bomba estacionaria");
			service = "Bomba estacionaria";
			id_service = "";
		} else if (datosForm.service === "2") {
			console.log("Autobomba");
			service = "Autobomba";
			id_service = "";
		}

		setServicesState((newList) => [
			...newList,
			{
				id: datosForm.id++,
				typeService: datosForm.typeService,
				service: service,
				price: datosForm.price,
				count: datosForm.count,
				iva: iva,
				retencion: retencion,
				id_service: id_service,
			},
		]);
	};

	const removeService = (id) => {
		console.log(id);
		const newList = servicesState.filter((item) => item.id !== id);
		setServicesState(newList);
	};
	// CREACION SERVICIOS

	const [open, setOpen] = useState(false);
	const [errorLogin, setErrorLogin] = useState("A ocurrido un error");

	const handleChange = (event) => {
		console.log(event);
		// console.log(event.target.name, event.target.value);
		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		});
	};

	const handleonSubmit = async (event) => {
		event.preventDefault();
		//event.target.reset();
		console.log(datos);

		if (
			datos.id_proyecto.length === 0 ||
			datos.fecha.length === 0 ||
			servicesState.length === 0 ||
			datos.descripcion.length === 0
		) {
			setErrorLogin("Completa todo los campos");
			handleClick();
			return;
		}

		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id_proyecto", datos.id_proyecto);
		formData.append("fecha", datos.fecha);
		formData.append("inventario", JSON.stringify(servicesState));
		formData.append("descripcion", datos.descripcion);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/clientes/inventarios/nuevoInventario.php",
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

				setErrorLogin("Inventario creado con éxito");
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

	const useStyles = makeStyles((theme) => ({
		root: {
			"& > *": {
				margin: theme.spacing(1),
				width: "33ch",
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
				<h1>Crear inventario: ({atob(proyecto)})</h1>
				<h2 style={{ marginTop: "0" }}>({atob(cliente)})</h2>
				<form
					onSubmit={handleonSubmit}
					className={classes.root}
					noValidate
					autoComplete="off"
				>
					<Divider />

					{servicesState.map((el) => (
						<div
							key={el.id}
							className="itemSevice"
							style={{
								border: "1px solid #ddd",
								padding: 10,
								marginBottom: 5,
							}}
						>
							<p>
								<b>Servicio: </b> {el.service}{" "}
							</p>
							<p>
								<b>Precio: </b>${el.price}{" "}
							</p>
							<p>
								<b>Cantidad: </b>
								{el.count}{" "}
							</p>

							<p>
								<b>Iva: </b>
								{el.iva}{" "}
							</p>

							<p>
								<b>Retencion: </b>
								{el.retencion}{" "}
							</p>
							<button onClick={() => removeService(el.id)}>
								Eliminar
							</button>
						</div>
					))}

					<FormControl
						variant="filled"
						className={classes.formControl}
					>
						<InputLabel htmlFor="filled-age-native-simple">
							Tipo servicio
						</InputLabel>
						<Select
							native
							value={datosForm.typeService}
							onChange={handleChangeServices}
							inputProps={{
								name: "typeService",
								id: "filled-age-native-simple",
							}}
						>
							<option value="0">Suministro de concreto</option>

							<option value="1">
								Alquiler equipos (Alquiler)
							</option>

							<option value="2">
								Alquiler equipos (Transporte)
							</option>
						</Select>
					</FormControl>

					<br />

					<FormControl
						variant="filled"
						className={classes.formControl}
					>
						<InputLabel htmlFor="filled-age-native-simple-two">
							Servicio
						</InputLabel>
						<Select
							native
							value={datosForm.service}
							onChange={handleChangeServices}
							inputProps={{
								name: "service",
								id: "filled-age-native-simple-two",
							}}
						>
							<option value="0">Concreto psi 351</option>

							<option value="1">Bomba estacionaria</option>

							<option value="2">Autobomba</option>
						</Select>
					</FormControl>

					{/*<TextField
						id="descripcion_input"
						label="Servicio"
						variant="outlined"
						type="text"
						name="service"
						onChange={handleChangeServices}
						required
					/>*/}
					<br />
					<TextField
						id="descripcion_input"
						label="Precio"
						variant="outlined"
						type="number"
						name="price"
						onChange={handleChangeServices}
						required
					/>
					<br />
					<TextField
						id="descripcion_input"
						label="Cantidad"
						variant="outlined"
						type="number"
						name="count"
						onChange={handleChangeServices}
						required
					/>
					<br />
					<div>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.natural}
									onChange={checkIva}
									name="natural"
								/>
							}
							label="Persona natural"
						/>
						{/*<label>Si no se marca será persona jurídica</label>*/}
					</div>

					<Button
						type="button"
						onClick={() => addService()}
						variant="contained"
						color="primary"
					>
						Añadir
					</Button>
					<br />
					{/*		<button
						type="button"
						onClick={() => console.log(servicesState)}
					>
						Contar estado servicios
					</button>
*/}
					{/*<button
						type="button"
						onClick={() => console.log(state)}
					>
						Contar estado checkbox
					</button>*/}

					<Divider />

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

					<Button type="submit" variant="contained" color="primary">
						Crear inventario
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
									to={"/"}
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

export default CrearInventario;
