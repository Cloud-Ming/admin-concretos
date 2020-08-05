import React, { Fragment, useState } from "react";
import uniqid from "uniqid";
import {
	Card,
	CardContent,
	Typography,
	TextField,
	Snackbar,
	Button,
	makeStyles,
} from "@material-ui/core";

import CardWidthCloseButton from "../../../../../cardsApp/CardWidthCloseButton";

// Icons

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DescriptionIcon from "@material-ui/icons/Description";

// Styles
const useStyles = makeStyles({
	titlePrincipal: {
		marginLeft: 15,
	},
	root: {
		minWidth: 275,
		marginBottom: 20,
	},
	title: {
		fontSize: 22,
	},
	list: {
		margin: 0,
		padding: 10,
	},
});

function Cotizaciones(props) {
	const { data, inventario, id_inventario, id_i } = props;
	
	const [dataPreformas, setDataPreformas] = useState(data ? data : []);
	const [inputs, setInputs] = useState({
		id_unico: null,
		titulo: "",
		descripcion: "",
		url: "",
	});

	// Alertas
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("A ocurrido un error");

	// Forms handler
	const onChange = (event) => {
		setInputs({
			...inputs,
			[event.target.name]: event.target.value,
		});
	};

	// Generador IDs únicos
	const uniqueId = uniqid();

	const crearPreforma = (event) => {
		event.preventDefault();

		//send to backend
		sendData(
			uniqueId,
			new Date().toLocaleString(),
			inputs.titulo,
			inputs.descripcion
		);
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

	const eliminarCotizacion = (id) => {
		let conf = window.confirm("Desea eliminar esta cotización");

		if (conf === false) {
			return;
		}

		// controller
		const abortController = new AbortController();

		var formData = new FormData();

		formData.append("id_unico", id);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/pdf/eliminarCotizacion.php",
			{
				method: "POST",
				mode: "cors",
				signal: abortController.signal,
				body: formData,
			}
		)
			.then((res) => res.text())
			.then((res) => {
				setError("Se elimino con éxito");
				handleClick();

				// Eliminar
				const newList = dataPreformas.filter(
					(item) => item.id_unico !== id
				);
				setDataPreformas(newList);
			})
			.catch((err) => {
				console.error("Request failed", err);
				setError("No se pudo eliminar");
				handleClick();
			});

		// Cancel the request if it takes more than 1 seconds
		setTimeout(() => abortController.abort(), 1000);
		//Controler
	};

	// Controler send
	const sendData = (id_unico, fecha, titulo, descripcion) => {
		if (
			fecha.length === 0 ||
			titulo.length === 0 ||
			descripcion.length === 0 ||
			id_i === undefined
		) {
			setError("Completa todos los campos en tu cotización");
			handleClick();
			return;
		}
		// controller
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id_unico", id_unico);
		formData.append("id_inventario", id_inventario);
		formData.append("id_cliente", id_i);
		formData.append("inventario", inventario);
		formData.append("fecha_creacion", fecha);
		formData.append("titulo", titulo);
		formData.append("descripcion", descripcion);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/pdf/crearCotizacion.php",
			{
				method: "POST",
				mode: "cors",
				signal: abortController.signal,
				body: formData,
			}
		)
			.then((res) => res.text())
			.then((res) => {
				if (res === 401) {
					setError("A ocurrido un error");
					handleClick();
					return;
				}

				// Reset form
				setInputs({
					id_unico: null,
					titulo: "",
					descripcion: "",
					url: "",
				});

				setError("Cotización creada con éxito");
				handleClick();

				// Agregar
				setDataPreformas((newList) => [
					...newList,
					{
						id_unico: id_unico,
						fecha: fecha,
						titulo: titulo,
						descripcion: descripcion,
						url: `https://botanicainternacionalamazonas.com/backend/archivos/cotizaciones/${id_unico}.pdf`,
					},
				]);
			})
			.catch((err) => {
				console.error("Request failed", err);
				setError("No se pudo agregar");
				handleClick();
			});

		// Cancel the request if it takes more than 1 second
		setTimeout(() => abortController.abort(), 1000);
		//Controler
	};

	// Styles
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
						Cotizaciones
					</Typography>

					<div style={{ display: "flex", flexWrap: "wrap" }}>
						{dataPreformas === null || dataPreformas.length === 0
							? "No hay cotizaciones."
							: dataPreformas.map((preforma, index) => (
									<CardWidthCloseButton
										key={index}
										idUnico={preforma.id_unico}
										fecha={preforma.fecha}
										consecutivo={preforma.consecutivo}
										titulo={preforma.titulo}
										descripcion={preforma.descripcion}
										url={preforma.url}
										codigo="100000"
										funcion={eliminarCotizacion}
										button="Eliminar"
										link="Info"
										icon={<DescriptionIcon />}
									/>
							  ))}
					</div>
					<br />
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Generar cotización
					</Typography>

					<form onSubmit={(event) => crearPreforma(event)}>
						<TextField
							id="outlined-basic"
							label="Titulo"
							variant="outlined"
							value={inputs.titulo}
							name="titulo"
							onChange={(event) => onChange(event)}
						/>
						<br />
						<br />
						<TextField
							id="outlined-basic"
							label="Descripción"
							variant="outlined"
							value={inputs.descripcion}
							name="descripcion"
							onChange={(event) => onChange(event)}
						/>
						<br />
						<br />
						<div>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								startIcon={<DescriptionIcon />}
							>
								Generar cotización
							</Button>
						</div>
					</form>

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
				</CardContent>
			</Card>
		</Fragment>
	);
}

export default Cotizaciones;
