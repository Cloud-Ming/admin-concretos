import React, { Fragment, useState, useEffect } from "react";
import uniqid from "uniqid";
import {
	Card,
	CardContent,
	Typography,
	InputLabel,
	TextField,
	FormControl,
	Select,
	Button,
	makeStyles,
} from "@material-ui/core";

// import AdminComisionesId from "./AdminComisionesId";

function FormComisionistas(props) {
	const { id_cliente, nombre_proyecto, data, comisionesData } = props;

	// Manejador de comisiones
	const [comisiones, setComisiones] = useState(
		comisionesData ? comisionesData : []
	);

	// Manejador de formulario
	const [datosForm, setDatosForm] = useState({
		id_unico: null,
		id_inventario: id_cliente,
		inventario: atob(nombre_proyecto),
		comisionista: `${data[0].nombre},${data[0].id}`,
		monto: 0,
		fecha: null,
		pago: false,
	});

	useEffect(() => {
		console.log("COMISIONES", comisiones);
	}, [id_cliente, data, comisiones]);

	const handleChange = (event) => {
		console.log(event.target.name, ":", event.target.value);

		setDatosForm({
			...datosForm,
			[event.target.name]: event.target.value,
		});
	};

	// Generador de ID unico
	const uniqueId = uniqid();

	// Agregar un nuevo comisionista a la lista
	const agregarComisionista = () => {
		setComisiones((newList) => [
			...newList,
			{
				id_unico: uniqueId,
				id_inventario: datosForm.id_inventario,
				inventario: datosForm.inventario,
				comisionista: datosForm.comisionista.split(","),
				monto: datosForm.monto,
				fecha: new Date().toLocaleString(),
				pago: datosForm.pago,
			},
		]);

		// console.log(datosForm.comisionista.split(","));

		nuevaComision(
			uniqueId,
			datosForm.id_inventario,
			datosForm.inventario,
			datosForm.comisionista.split(",")[1],
			datosForm.comisionista.split(",")[0],
			datosForm.monto,
			new Date().toLocaleString(),
			datosForm.pago
		);
	};

	const eliminarComisionista = (id) => {
		const newList = comisiones.filter((item) => item.id_unico !== id);
		setComisiones(newList);

		eliminarComision(id);
	};

	const nuevaComision = (
		id_unico,
		id_inventario,
		inventario,
		id_comisionista,
		comisionista,
		monto,
		fecha,
		pago
	) => {
		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id_unico", id_unico);
		formData.append("id_inventario", id_inventario);
		formData.append("inventario", inventario);
		formData.append("id_comisionista", id_comisionista);
		formData.append("comisionista", comisionista);
		formData.append("monto", monto);
		formData.append("fecha", fecha);
		formData.append("pago", pago);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/comisionistas/nuevaComision.php",
			{
				method: "POST",
				mode: "cors",
				signal: abortController.signal,
				body: formData,
			}
		)
			.then((res) => res.json())
			.then((res) => {
				// if (res === 401) {

				// 	return;
				// }

				console.log(res);
			})
			.catch((err) => {
				console.error("Request failed", err);
			});

		// Cancel the request if it takes more than 5 seconds
		setTimeout(() => abortController.abort(), 5000);

		//Controler
	};

	const eliminarComision = (id) => {
		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id_unico", id);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/comisionistas/eliminarComisionId.php",
			{
				method: "POST",
				mode: "cors",
				signal: abortController.signal,
				body: formData,
			}
		)
			.then((res) => res.json())
			.then((res) => {
				// if (res === 401) {

				// 	return;
				// }

				console.log(res);
			})
			.catch((err) => {
				console.error("Request failed", err);
			});

		// Cancel the request if it takes more than 5 seconds
		setTimeout(() => abortController.abort(), 5000);

		//Controler
	};

	const useStyles = makeStyles({
		titlePrincipal: {
			marginLeft: 15,
		},
		root: {
			minWidth: 275,
			marginBottom: 20,
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
		formControl: {
			width: 250,
		},
	});

	const classes = useStyles();

	return (
		<Fragment>
			<Card className={classes.root}>
				<CardContent>
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Comisiones
					</Typography>
					{comisiones === null
						? "No hay."
						: comisiones.length === 0
						? "No hay.."
						: comisiones.map((item, i) => (
								<Card key={i} className={classes.root}>
									<CardContent>
										<br />
										{/**/}
										<small>
											Comisionista: {item.comisionista}
										</small>
										<br />
										<small>Monto: {item.monto}</small>
										<br />
										<small>Fecha: {item.fecha}</small>
										<br /><br />
										<button
											onClick={() =>
												eliminarComisionista(
													item.id_unico
												)
											}
										>
											Eliminar
										</button>
									</CardContent>
								</Card>
						  ))}

					{/*INHABILITY*/}

					<br />
					<br />
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Agregar comisionistas
					</Typography>
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
								name: "comisionista",
								id: "filled-age-native-simple",
							}}
							value={datosForm.comisionista}
							onChange={(event) => handleChange(event)}
						>
							{data.map((item) => (
								<option
									key={item.id}
									value={[item.nombre, item.id]}
								>
									{item.nombre}
								</option>
							))}
						</Select>
					</FormControl>
					<br />
					<br />
					<TextField
						id="descripcion_input"
						label="Monto"
						variant="outlined"
						type="number"
						name="monto"
						value={datosForm.monto}
						onChange={(event) => handleChange(event)}
						required
					/>
					<br />
					<br />
					<Button
						onClick={() => agregarComisionista()}
						variant="contained"
						color="primary"
					>
						Agregar
					</Button>
				</CardContent>
			</Card>
		</Fragment>
	);
}

export default FormComisionistas;
