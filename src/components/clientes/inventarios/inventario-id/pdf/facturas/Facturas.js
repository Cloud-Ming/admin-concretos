import React, { Fragment, useState } from "react";
import uniqid from "uniqid";
import {
	Card,
	CardContent,
	Snackbar,
	TextField,
	Typography,
	Button,
	makeStyles,
} from "@material-ui/core";

// Icons
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
// import DescriptionIcon from "@material-ui/icons/Description";

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

function Facturas(props) {
	const { idCliente, data } = props;

	const [files, setFiles] = useState(data ? data : []);

	const [file, setFile] = useState(
		{
			archivo: "",
			nombreArchivo: "",
		},
	);

	const [datosForm, setDatosForm] = useState({
		titulo: "",
		descripcion: "",
		url: "",
	});

	// Alertas
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("A ocurrido un error");

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

	// useEffect(() => {
	// 	console.log(datosForm)
	// }, [datosForm])

	// Handler form
	const onChangeFile = (event) => {
		setFile({
			archivo: event.target.files[0],
			nombreArchivo: event.target.files[0].name,
		});

		console.log({
			archivo: event.target.files[0],
			nombreArchivo: event.target.files[0].name,
		});
	};

	const onChange = (event) => {
		console.log(event.target.name, event.target.value);
		setDatosForm({
			...datosForm,
			[event.target.name]: event.target.value,
		});
	};

	// Generador de ID unico
	const uniqueId = uniqid();

	// Agregar
	// Eliminar

	// const eliminarFactura =()=>{

	// }

	// HandleSubmit
	const handleSubmit = (event) => {
		event.preventDefault();

		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id_unico", uniqueId);
		formData.append("id_inventario", idCliente);
		formData.append("fecha_creacion", new Date().toLocaleString());
		formData.append("titulo", datosForm.titulo);
		formData.append("descripcion", datosForm.descripcion);
		formData.append("archivo", file.archivo);

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/pdf/crearFactura.php",
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
					setError("Error al subir factura");
					handleClick();
					return;
				}

				setDatosForm({
					titulo: "",
					descripcion: "",
					archivo: null,
					url: null,
				});

				setFiles((newList) => [
					...newList,
					{
						id_unico: uniqueId,
						fecha: new Date().toLocaleString(),
						titulo: datosForm.titulo,
						descripcion: datosForm.descripcion,
						url: datosForm.nombreArchivo,
					},
				]);

				handleClick();
				setError("Factura subida con éxito");
			})
			.catch((err) => {
				console.error("Request failed", err);
				setError("A ocurrido un error");
				handleClick();
			});

		// Cancel the request if it takes more than 1 second
		setTimeout(() => abortController.abort(), 1500);
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
						Facturas
					</Typography>

					{files === null || files.length === 0
						? "No hay facturas."
						: files.map((item, index) => (
								<div key={index}>
									<p>{index + 1}</p>

									<p>
										<b>Fecha:</b> {item.fecha}
									</p>

									<p>
										<b>Titulo:</b> {item.titulo}
									</p>

									<p>
										<b>Descripcion:</b> {item.descripcion}
									</p>

									<button
										disabled
										onClick={() =>
											console.log(item.id_unico)
										}
									>
										Eliminar
									</button>
									<br />
									<br />
								</div>
						  ))}

						<br /><br />
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Subir factura
					</Typography>

					<form
						onSubmit={(event) => handleSubmit(event)}
						encType="multipart/form-data"
					>
						<TextField
							id="outlined-basic"
							label="Titulo"
							variant="outlined"
							name="titulo"
							value={datosForm.titulo}
							onChange={(event) => onChange(event)}
						/>
						<br />
						<br />
						<TextField
							id="outlined-basic2"
							label="Descripción"
							variant="outlined"
							name="descripcion"
							value={datosForm.descripcion}
							onChange={(event) => onChange(event)}
						/>
						<br />
						<br />

						<TextField
							type="file"
							name="archivo"
							id="outlined-basic3"
							variant="outlined"
							onChange={(event) => onChangeFile(event)}
							
						/>
						<br />
						<br />
						<Button
							type="submit"
							variant="contained"
							color="primary"
							startIcon={<CloudUploadIcon />}
						>
							Subir factura
						</Button>
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
		</Fragment>
	);
}

export default Facturas;
