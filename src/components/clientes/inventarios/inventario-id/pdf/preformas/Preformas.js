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
	containerProformas: {
		display: "flex",
		flexWrap: "wrap",
	},
});

function Preformas(props) {
	const { data, inventario, idInventario } = props;

	const [dataPreformas, setDataPreformas] = useState(data ? data : []);

	const [inputs, setInputs] = useState({
		id_unico: null,
		titulo: "",
		descripcion: "",
		url: "",
		code: "",
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

	const eliminarPreforma = (id) => {
		const conf = window.confirm("Esta seguro de eliminar esta preforma?");

		if (conf === false) {
			return;
		}
		// controller
		const abortController = new AbortController();

		var formData = new FormData();

		formData.append("id_unico", id);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/pdf/eliminarPreforma.php",
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
		if (titulo.length === 0) {
			setError("Agrega un titulo");
			handleClick();
			return;
		}

		if (descripcion.length === 0) {
			setError("Agrega una descripción");
			handleClick();
			return;
		}

		// controller
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id_unico", id_unico);
		formData.append("id_inventario", idInventario);
		formData.append("inventario", inventario);
		formData.append("fecha", fecha);
		formData.append("titulo", titulo);
		formData.append("descripcion", descripcion);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/pdf/crearPreforma.php",
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

				setError("Proforma creada con éxito");
				handleClick();

				// Agregar
				setDataPreformas((newList) => [
					...newList,
					{
						id_unico: id_unico,
						fecha: fecha,
						titulo: titulo,
						descripcion: descripcion,
						url: `https://botanicainternacionalamazonas.com/backend/archivos/preformas/${id_unico}.pdf`,
						consecutivo: res,
					},
				]);
			})
			.catch((err) => {
				console.error("Request failed", err);
				setError("A ocurrido un error");
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
						Proformas creadas
					</Typography>

					<div className={classes.containerProformas}>
						{dataPreformas === null ||
						dataPreformas.length === 0 ? (
							<Fragment>
								<p>No hay preformas(0).</p>
							</Fragment>
						) : (
							dataPreformas.map((preforma, index) => (
								<CardWidthCloseButton
									key={index}
									idUnico={preforma.id_unico}
									fecha={preforma.fecha}
									consecutivo={preforma.consecutivo}
									titulo={preforma.titulo}
									descripcion={preforma.descripcion}
									url={preforma.url}
									codigo="100000"
									funcion={eliminarPreforma}
									button="Eliminar"
									link="Info"
									icon={<DescriptionIcon />}
								/>
							))
						)}
					</div>
					<br />
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Generar proforma
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
								Generar proforma
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
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
						<IconButton							size="small"
							aria-label="close"
							color="inherit"
							onClick={handleClose}
						>
							<CloseIcon fontSize="small" />
						</IconButton>
					</Fragment>
				}
			/>
		</Fragment>
	);
}

export default Preformas;
